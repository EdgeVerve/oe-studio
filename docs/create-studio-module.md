# Creating a custom oe-studio module

## Introduction
In addition to the 6 modules provided by default by the oe-studio, you can create your own oe-studio module to be plugged-in to oe-studio.

## Guidelines
*   The module component should import all its sub component as only the main module will be dynamically imported.
*   oe-studio allows the module to customize a section of the studio footer for interaction of the module.
*   The module-footer section needs to be a single component and needs to be present in the main module component with `studio-footer` and `hidden` attributes.
```
        <oe-ui-footer studio-footer hidden></oe-ui-footer>
```
*   The module-footer will be extracted from the module and attached seperatly as a part of studio footer. Hence no data should be directly shared between the module and its footer. However `Redux` stores can be used to keep the module and footer in sync like [oe-component-manager](http://evgit/oecloud.io/oe-component-manager/blob/master/oe-component-manager.html).
*   All interactions between the module-footer and main-module should be through events and event details.
*   Events fired from footer for main module should be fired as shown below.

```
            this.fire('oe-studio-module-action', {
					'event': eventName,
					'payload': detail
			});
```

*   Events fired from main module for footer should be fired as shown below.

```
            this.fire('oe-studio-footer-action', {
					'event': eventName,
					'payload': detail
			});
```

*   The module and the module-footer can listen to the events using default Polymer Listeners.  [oe-model-footer](http://evgit/oecloud.io/oe-model-manager/blob/master/elements/oe-model-footer.html) and [oe-ui-designer](http://evgit/oecloud.io/oe-ui-designer/blob/master/oe-ui-designer.html) can bew viewed as reference for the implementation. 

##Usage
Once the component is created the component can be plugged into the studio by adding it as a module in server's `config.json` like 
* * *
```
    {
      'name': 'module-element',
      'path': 'custom-path',
      'import': '/elements/module-element.html'
    }
```
* * *

Once the server restarts the new component can be viewed by navigating to localhost:3000/designer#custom-path.
