/* VARIABLES*/
var Polymer = Polymer || window.parent.Polymer || {};

var designerController = (function () {
	var cont = document.getElementById('content');

	var parentComponent = null;
	var GLOBAL_CONTEXT;
	var GLOBAL_STATIC_ELEMENTS = {
		dragOverData: {},
		hoverElement: null,
		selectedElement: null,
		importedData: {},
		droppedElements: {}
	};
	var GLOBAL_ISOLATED_DOM;
	var GLOBAL_THEME_MANAGEMENT;
	var isElementsLoaded = false;


	/* FUNCTIONS*/
	function attachContextContainers() {
		var fHead = document.getElementById('focusContext');
		if (fHead) {
			fHead.addEventListener('open-setting', openSettingPanel);
			fHead.addEventListener('delete-element', deleteSelected);
			fHead.addEventListener('create-snippet', convertToSnippet);
			fHead.addEventListener('remove-link', removeLink);
			fHead.addEventListener('create-link', convertToLink);
		}
	}

	function removeLink() {
		fireParent('remove-link', GLOBAL_STATIC_ELEMENTS.selectedElement);
	}

	function convertToLink() {
		fireParent('convert-to-link', {
			ele: GLOBAL_STATIC_ELEMENTS.selectedElement,
			selection: GLOBAL_STATIC_ELEMENTS.selectedElement.__selection
		});
	}

	function convertToSnippet() {
		fireParent('convert-to-snippet', GLOBAL_STATIC_ELEMENTS.selectedElement);
	}

	function setUniqueClass(element, className) {
		if (!element) {
			return;
		}
		var prevEle = cont.querySelectorAll('.' + className);
		[].forEach.call(prevEle, function removeClassFromElement(n) {
			n.classList.remove(className);
		});
		element.classList.add(className);
	}

	function removePlaceHolder() {
		var curDropPos = document.querySelector('.oe-drop-placeholder');
		if (curDropPos) {
			curDropPos.setAttribute('hidden', true);
		}
	}

	function createAsContainer(element) {
		function dragEnter(event) {
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
			// console.log('dragEnter');
			GLOBAL_STATIC_ELEMENTS.dragOverData.element = element;
			setUniqueClass(element, 'current-drop-target');
			setUniqueClass(element.parentElement, 'current-drop-parent');
			setContext(element, 'drop');
		}


		function dragOver(event) {
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
			var element = event.currentTarget;
			var x = event.clientX;
			var y = event.clientY;
			var mousePos = {
				x: x,
				y: y
			};
			GLOBAL_STATIC_ELEMENTS.dragOverData.mousePos = mousePos;
			removePlaceHolder();
			if (element.children.length === 0) {
				addPlaceHolder(element, 'inside-append');
			} else {
				var data = findNearestChild(element, mousePos.x, mousePos.y);
				if (data && data.el) {
					addPlaceHolder(data.el, data.position);
				}
			}
		}

		function dropHandle(event) {
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
			var act = event.dataTransfer.getData('action');
			var dropInfo = getDropPosition();
			var detail = {
				parent: dropInfo.parent,
				index: dropInfo.index
			};
			if (act === 'add') {
				var str = event.dataTransfer.getData('configstr');
				var config = JSON.parse(str);
				if (config.config.importUrl) {
					var tempEle = document.createElement(config.tag);
					if (!tempEle.set) {
						Polymer.Base.importHref(config.config.importUrl, function handleDynamicImport() {

						}, function handleImportError() {
							fireParent('oe-show-error', 'Error in importing element from ' + config.config.importUrl);
						});
					}
				}
				detail.config = config;
			} else if (act === 'move') {
				var ele;
				var eleId = event.dataTransfer.getData('eleId');
				ele = document.querySelector('[oe-id="' + eleId + '"]');
				ele.classList.remove('currently-dragging');
				detail.ele = ele;
				if (ele.contains(dropInfo.parent)) {
					return;
				}
			}
			fireParent((act + '-element'), detail);
			// dropInfo.parent.replaceChild(ele, dropInfo.pointer);
			removePlaceHolder();
			removeContext('drop');
			removeContext('hover');
			setContext(GLOBAL_STATIC_ELEMENTS.selectedElement, 'focus');
		}

		function getDropPosition() {
			var curDropPos = document.querySelector('.oe-drop-placeholder');
			if (curDropPos) {
				var parent = curDropPos.parentElement;
				var index = [].indexOf.call(parent.children, curDropPos);
				return {
					pointer: curDropPos,
					parent: parent,
					index: index
				};
			}
		}

		function isHorizontal(element) {
			var isHorz = false;
			var eleStyle = getComputedStyle(element);
			var parentStyle = getComputedStyle(element.parentElement);
			if (eleStyle.display === 'inline' || eleStyle.display === 'inline-block') {
				isHorz = true;
			}
			if (parentStyle.display === 'flex' || parentStyle.display === 'inline-flex') {
				if (parentStyle.flexDirection === 'row' || parentStyle.flexDirection === 'row-reverse') {
					isHorz = true;
				}
			}
			return isHorz;
		}

		function findNearestChild(container, clientX, clientY) {
			var previousElData = null;
			var children = container.children || container.content.children;
			var positionData = [].map.call(children, function getRelativePostionData(node) {
				var offset = node.getBoundingClientRect();
				var mouseAfter;
				if (isHorizontal(node)) {
					if (clientY < offset.top) {
						mouseAfter = false;
					} else if (clientY > (offset.top + offset.height)) {
						mouseAfter = true;
					} else {
						mouseAfter = (offset.left + offset.width / 2) < clientX;
					}
				} else {
					mouseAfter = (offset.top + offset.height / 2) < clientY;
				}
				return {
					el: node,
					position: (mouseAfter ? 'after' : 'before')
				};
			});
			previousElData = positionData.find(function findInitialSibling(k) {
				return k.position === 'before';
			});
			if (!previousElData) {
				previousElData = positionData[positionData.length - 1];
			}
			return previousElData;
		}


		function addPlaceHolder(element, position) {
			// removePlaceHolder();
			var placeHolder = document.querySelector('.oe-drop-placeholder');
			if (!placeHolder) {
				placeHolder = document.createElement('div');
				placeHolder.classList.add('oe-drop-placeholder');
			}

			placeHolder.removeAttribute('hidden');

			if (isHorizontal(element)) {
				placeHolder.style.width = '50px';
				placeHolder.style.height = element.getBoundingClientRect().height - 10 + 'px';
				placeHolder.style.borderBottom = '5px solid #00ff27';
				placeHolder.style.borderLeft = 'none';
			} else {
				placeHolder.style.width = element.getBoundingClientRect().width - 10 + 'px';
				placeHolder.style.height = '50px';
				placeHolder.style.borderLeft = '5px solid #00ff27';
				placeHolder.style.borderBottom = 'none';
			}
			switch (position) {
				case 'before':
					addBefore(element, placeHolder);
					break;
				case 'after':
					addAfter(element, placeHolder);
					break;
				case 'inside-prepend':
					addBefore(element.childNodes[0], placeHolder);
					break;
				case 'inside-append':
					placeHolder.style.width = '50px';
					placeHolder.style.height = '50px';
					addInside(element, placeHolder);
					break;
				default:
			}
		}

		function addInside(target, element) {
			target.appendChild(element);
		}

		function addAfter(target, element) {
			target.parentElement.insertBefore(element, target.nextSibling);
		}

		function addBefore(target, element) {
			target.parentElement.insertBefore(element, target);
		}

		function dragLeave(event) {
			if (event.target === element) {
				removeContext('drop');
				removePlaceHolder();
			}
		}

		element.removeEventListener('dragenter', dragEnter);
		element.removeEventListener('dragover', dragOver);
		element.removeEventListener('drop', dropHandle);
		element.removeEventListener('dragleave', dragLeave);

		element.addEventListener('dragenter', dragEnter);
		element.addEventListener('dragover', dragOver);
		element.addEventListener('drop', dropHandle);
		element.setAttribute('droppable', true);


		if (element.id === 'content') {
			element.addEventListener('dragleave', dragLeave);
		} else {
			var isEmpty = (element.children.length === 0);
			if (element.childNodes.length !== element.children.length) {
				var validNodes = [].filter.call(element.childNodes, function filterEmptyTextNode(n) {
					if (n.nodeName === '#text') {
						return (n.textContent.trim().length > 0);
					}
					return true;
				});
				isEmpty = (validNodes.length === 0);
			}
			if (isEmpty) {
				element.classList.add('oe-empty-container');
			}
		}
	}

	function createAsDraggable(element) {
		function dragStart(event) {
			event.stopPropagation();
			event.stopImmediatePropagation();
			removeContext('hover');
			removeContext('focus');
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.setData('action', 'move');
			event.dataTransfer.setData('eleId', element.getAttribute('oe-id'));
			element.classList.add('currently-dragging');
		}

		function dragEnd() {
			element.classList.remove('currently-dragging');
			removeContext('drag');
			removePlaceHolder();
		}


		element.addEventListener('dragstart', dragStart);
		element.addEventListener('dragend', dragEnd);
		element.setAttribute('draggable', true);
	}

	function createContextHandlers(element) {
		var isTextEditable = (element.getAttribute('oe-ele-type') === 'text');
		var isTemplate = element.hasAttribute('template-item');
		var uniqId = element.getAttribute('oe-id');
		var clipBoard = null;

		function mouseOver(event) {
			event.stopPropagation();
			event.stopImmediatePropagation();
			if (GLOBAL_STATIC_ELEMENTS.hoverElement === element) {
				return;
			}
			GLOBAL_STATIC_ELEMENTS.hoverElement = element;
			setContext(element, 'hover');
		}

		function selectElement(event) {
			event.stopPropagation();
			event.stopImmediatePropagation();
			event.preventDefault();
			if (element === cont || isTemplate) {
				GLOBAL_STATIC_ELEMENTS.selectedElement = null;
				removeContext('focus');
			} else {
				GLOBAL_STATIC_ELEMENTS.selectedElement = element;
				setContext(element, 'focus');
			}
			fireParent('element-selected', GLOBAL_STATIC_ELEMENTS.selectedElement);
		}
		element.addEventListener('click', selectElement);
		element.addEventListener('mouseover', mouseOver);

		function editTextHandler() {
			var originalElement = GLOBAL_ISOLATED_DOM.querySelector('[oe-id="' + uniqId + '"]');
			clipBoard = element.innerHTML;
			element.innerHTML = originalElement.innerHTML;
			element.setAttribute('contentEditable', true);
			element.addEventListener('blur', blurHandler);
			element.removeEventListener('dblclick', editTextHandler);
			element.focus();
		}

		function blurHandler() {
			var originalElement = GLOBAL_ISOLATED_DOM.querySelector('[oe-id="' + uniqId + '"]');
			element.__selection = getTextSelection();
			element.removeAttribute('contentEditable');
			element.removeEventListener('blur', blurHandler);
			if (element.innerHTML !== originalElement.innerHTML) {
				fireParent('update-text-node', element);
			} else {
				element.innerHTML = clipBoard;
			}
			element.addEventListener('dblclick', editTextHandler);
			attachHandlers(element);
		}

		function getTextSelection() {
			var sel = window.getSelection();
			if (sel.type !== 'Range') {
				return;
			}

			var isTextSel = sel.focusNode &&
				sel.focusNode.parentNode &&
				(sel.focusNode.parentNode.getAttribute('oe-ele-type') === 'text');
			var textSelection = null;
			if (isTextSel) {
				var startIndex = [].findIndex.call(sel.focusNode.parentNode.childNodes, function getStartIndex(n) {
					return n === sel.anchorNode;
				});
				var endIndex = [].findIndex.call(sel.focusNode.parentNode.childNodes, function getEndIndex(n) {
					return n === sel.focusNode;
				});
				textSelection = {
					start: sel.anchorOffset,
					end: sel.focusOffset,
					startIdx: startIndex,
					endIdx: endIndex
				};
			}
			return textSelection;
		}

		function mouseLeaveHandler(event) {
			if (event.target === element) {
				removeContext('hover');
				GLOBAL_STATIC_ELEMENTS.hoverElement = null;
			}
		}

		function dblClickHandler(event) {
			if (event.target === element) {
				event.stopPropagation();
				event.stopImmediatePropagation();
				fireParent('open-setting');
			}
		}

		if (isTextEditable) {
			element.addEventListener('dblclick', editTextHandler);
		}

		if (element === cont) {
			element.addEventListener('mouseleave', mouseLeaveHandler);
			element.addEventListener('dblclick', dblClickHandler);
		}
	}

	function FocusElement(element) {
		// Called from outside of iframe
		if (!element) {
			return;
		}
		var target = cont.querySelector('[oe-id="' + element.getAttribute('oe-id') + '"]');
		if(target){
			target.click();
		}
	}

	function fireParent(eventName, detail) {
		parentComponent.fire(eventName, detail);
	}

	function init() {
		parentComponent = window.parent.document.querySelector('ui-dom-manager');
		cont.innerHTML = '';
		GLOBAL_CONTEXT = {
			'drop': document.getElementById('dropContext'),
			'focus': document.getElementById('focusContext'),
			'hover':document.getElementById('hoverContext')
		};
		// console.clear();
		window.addEventListener('resize', function resizeHandler() {
			setContext(GLOBAL_STATIC_ELEMENTS.selectedElement, 'focus');
			setContext(GLOBAL_STATIC_ELEMENTS.hoverElement, 'hover');
		});
	}

	function openSettingPanel() {
		fireParent('open-setting', GLOBAL_STATIC_ELEMENTS.selectedElement);
	}

	function deleteSelected() {
		fireParent('delete-element', GLOBAL_STATIC_ELEMENTS.selectedElement);
	}

	function removeContext(type) {
		var context = GLOBAL_CONTEXT[type];
		if (context && context.set) {
			context.update(null);
		}
	}


	function checkElementsImport(cb) {
		if (isElementsLoaded) {
			cb();
			return;
		} else {
			var link = document.createElement('link');
			link.setAttribute('rel', 'import');
			link.setAttribute('href', '/bower_components/oe-studio/iframe-imports.html');
			link.onload = function () {
				isElementsLoaded = true;
				fireParent('oe-show-success', 'Initial Elements Loaded successfully');
				cb();
			}
			document.head.appendChild(link);
		}
	}

	function renderNewPage(dom) {
		checkElementsImport(function () {
			var reRendered = handleDomMutation(dom);
			GLOBAL_ISOLATED_DOM = dom.cloneNode(true);
			if (reRendered) {
				cont.innerHTML = '<template is="dom-bind">' + dom.innerHTML + '</template>';
				Polymer.dom.flush();
				Polymer.Base.async(function(){
					attachHandlers(cont);
				},300)
			}

			removeContext('drop');
			setTimeout(function delayedFocusElement() {
				if (GLOBAL_STATIC_ELEMENTS.selectedElement) {
					var selId = GLOBAL_STATIC_ELEMENTS.selectedElement.getAttribute('oe-id');
					var newSel = cont.querySelector('[oe-id="' + selId + '"]');
					removeContext('focus');
					if (newSel) {
						newSel.click();
					}
				}
			}, 100);
		})
	}

	function attachHandlers(dom) {
		var elements = dom.querySelectorAll('[oe-id]');
		[].forEach.call(elements, function addSelectiveHandler(node) {
			var type = node.getAttribute('oe-ele-type');

			if (type === 'droppable') {
				createAsContainer(node);
			}
			if (!node.hasAttribute('template-item')) {
				createAsDraggable(node);
			}
			createContextHandlers(node);
		});
	}


	function setContext(element, type) {
		if (!element) {
			return;
		}
		var context = GLOBAL_CONTEXT[type];
		if (context && context.set) {
			context.update(element);
		}
	}

	function delayedExec(condFn, cb, timeInt) {
		var recurser = setInterval(function () {
			if (condFn()) {
					clearInterval(recurser);
					cb();
			}
		}, timeInt);
	}

	function getAttachedThemeObj() {
		delayedExec(function () {
			return Polymer && Polymer.StyleDefaults && Polymer.StyleDefaults._properties;
		}, function () {
			var props = Polymer.StyleDefaults._properties;
			GLOBAL_THEME_MANAGEMENT = {
				attachedTheme: {
					'--dark-primary-color': '',
					'--default-primary-color': '',
					'--light-primary-color': '',
					'--text-primary-color': '',
					'--accent-color': '',
					'--primary-background-color': '',
					'--primary-text-color': '',
					'--secondary-text-color': ''
				}
			};
			Object.keys(GLOBAL_THEME_MANAGEMENT.attachedTheme).forEach(function setThemeVariable(k) {
				GLOBAL_THEME_MANAGEMENT.attachedTheme[k] = props[k];
			});
		}, 1000);
	}

	function applyTheme(theme, isApplied) {
		if (!theme) {
			theme = GLOBAL_THEME_MANAGEMENT.attachedTheme;
		}
		Polymer.updateStyles(theme);
		if (isApplied) {
			GLOBAL_THEME_MANAGEMENT.attachedTheme = theme;
		}
	}

	function handleDomMutation(dom) {
		function domMods(nodeA, nodeB) {
			// nodeA is original and nodeB is modified
			var nodeAAttr = Object.keys(nodeA.attributes).map(function getAttribs(k) {
				var attr = nodeA.attributes[k];
				return {
					name: attr.nodeName,
					value: attr.nodeValue
				};
			});
			var nodeBAttr = Object.keys(nodeB.attributes).map(function getAttribs(k) {
				var attr = nodeB.attributes[k];
				return {
					name: attr.nodeName,
					value: attr.nodeValue
				};
			});

			function findDifference(arr1, arr2) {
				return arr1.find(function findArr1Elements(obj) {
					return (arr2.findIndex(function findIndexOfArr2(obj2) {
						return (obj.name === obj2.name && obj.value === obj2.value);
					}) === -1);
				});
			}
			var mod = null;
			if (nodeAAttr.length === nodeBAttr.length) {
				// Modified Attribute
				mod = nodeBAttr.find(function findAttr(at) {
					return at.value !== nodeA.getAttribute(at.name);
				});
				if (mod) {
					return {
						name: mod.name,
						value: mod.value,
						type: 'modify',
						evId: nodeA.getAttribute('oe-id')
					};
				}
			} else if (nodeAAttr.length > nodeBAttr.length) {
				// Removed Attribute
				mod = findDifference(nodeAAttr, nodeBAttr);
				if (mod) {
					return {
						name: mod.name,
						value: mod.value,
						type: 'delete',
						evId: nodeA.getAttribute('oe-id')
					};
				}
			} else {
				// Added Attrbiute
				mod = findDifference(nodeBAttr, nodeAAttr);
				if (mod) {
					return {
						name: mod.name,
						value: mod.value,
						type: 'add',
						evId: nodeA.getAttribute('oe-id')
					};
				}
			}

			if (nodeA.textContent !== nodeB.textContent) {
				return {
					value: nodeB.textContent,
					type: 'text',
					evId: nodeA.getAttribute('oe-id')
				};
			}
		}

		function isPosChanged(nodeA, nodeB) {
			var a = [].map.call(nodeA.querySelectorAll('[oe-id]'), function getEvId(n) {
				return n.getAttribute('oe-id');
			});
			var b = [].map.call(nodeB.querySelectorAll('[oe-id]'), function getEvId(n) {
				return n.getAttribute('oe-id');
			});
			return !(a.length === b.length && a.every(function matchElements(v, i) {
				return v === b[i];
			}));
		}

		var needRender = !GLOBAL_ISOLATED_DOM || isPosChanged(GLOBAL_ISOLATED_DOM, dom);

		if (!needRender) {
			var nodeList = [].map.call(GLOBAL_ISOLATED_DOM.querySelectorAll('[oe-id]'), function getMappedElements(n) {
				var evId = n.getAttribute('oe-id');
				return {
					a: n,
					b: dom.querySelector('[oe-id="' + evId + '"]')
				};
			});
			var diff = null;
			nodeList.forEach(function findDomModification(compared) {
				var mod = domMods(compared.a, compared.b);
				if (mod) {
					diff = mod;
				}
			});
			if (diff) {
				var attachedNode = cont.querySelector('[oe-id="' + diff.evId + '"]');
				switch (diff.type) {
					case 'add':
					case 'modify':
						attachedNode.setAttribute(diff.name, diff.value);
						break;
					case 'delete':
						attachedNode.removeAttribute(diff.name);
						break;
					case 'text':
						if (!diff.value.match(new RegExp(/(\{\{.*\}\})|(\[\[.*\]\])/))) {
							attachedNode.textContent = diff.value;
						} else {
							return true;
						}
						break;
					default:
				}
			}
			return false;
		}
		return true;
	}


// Testing Design Patterns


	// function findDesignerElement(element){
	// 	if(cont.contains(element)){
	// 		var target = element;
	// 		while(!(target.getAttribute && target.getAttribute('oe-id'))){
	// 			target = target.parentElement;
	// 		}
	// 		return target;
	// 	}else{
	// 		return cont;
	// 	}
	// }

	// function mouseOverHandler(event){
	// 	var element = event.target;
	// 	var designerElement = findDesignerElement(element);
	// 	if(hoveredElement.get() != designerElement){
	// 		hoveredElement.set(designerElement);
	// 	}
	// 	console.log();
	// }

	// function mouseLeaveHandler(event){
	// 	hoveredElement.set(designerElement);
	// }
	// function clickHandler(event){
	// }
	// function dragEnterHandler(event){};
	// function dragOverHandler(event){};
	// function dragLeaveHandler(event){};
	// function dropHandler(event){};
	// function createGlobalHandling(){
	// 	var cont = document.getElementById('content');

	// 	//Hover Context Handling
	// 	cont.addEventListener('mouseover',mouseOverHandler);
	// 	cont.addEventListener('mouseleave',mouseLeaveHandler);




	// 	//Click Handling
	// 	cont.addEventListener('click',clickHandler)

	// 	//Drag Handling
	// 	cont.addEventListener('dragenter',dragEnterHandler);
	// 	cont.addEventListener('dragover',dragOverHandler);
	// 	cont.addEventListener('dragleave',dragLeaveHandler);
	// 	cont.addEventListener('drop',dropHandler);
	// 	cont.setAttribute('droppable', true);
	// }
	//createGlobalHandling();
//
	attachContextContainers();

	createAsContainer(cont);
	createContextHandlers(cont);
	getAttachedThemeObj();

	return {
		initiliaze: init,
		render: renderNewPage,
		focusElement: FocusElement,
		applyTheme: applyTheme
	}

})()


window.onload = designerController.initiliaze;
