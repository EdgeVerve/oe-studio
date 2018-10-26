# OE Studio

## Introduction

OE Studio, is a web based tool that is developed to make working with oe-cloud based application easier. 


This tools provides end user a web interface using which he/she (particularly developer) will be able to perform several tasks like creating models, posting and retrieving data from models and other operations with ease.

---
---
__Note : This is an experimental component which may go through major modifications in future releases.__

---
---

## Installing OE Studio

### Prerequisite  : 
oe-cloud based UI app . You can learn about creating a ui-app from https://github.com/EdgeVerve/oe-ui-app .


### Once you have the ui app

* add oe-studio as a bower dependency e.g. "oe-studio": "^0.5.0".
* bower install 
* node .
* Use username and password as "admin" to login.
* Browse oe-studio at localhost:3000/designer

---

# oe-studio modules
oe-studio comes with a set of predefined plugins/modules to be used inside oe-studio.
To know more about the modules click on the respective links provided.

* Model Manager [git](http://evgit/oecloud.io/oe-model-manager)
  * Manage oe-cloud based models and their data .
  ![Model Management](docs/images/oe-studio-landing.png)
* Workflow Modeler [git](http://evgit/oecloud.io/oe-workflow-modeler)
  * Manage workflows related to the running application.
  ![Workflow Modeler](docs/images/oe-studio-workflow-modeler.png)
* Rule Manager [git](http://evgit/oecloud.io/oe-feel-designer)
  * Handle Decision table and Decision graph management and execution.
   ![Rule Manager](docs/images/oe-studio-rule-manager.png)
* Component Manager (experimental) [git](http://evgit/oecloud.io/oe-component-manager)
  * Manage MetaPolymer based forms. 
   ![Component Manager](docs/images/oe-studio-component-manager.png)
* Route Manager (experimental) [git](http://evgit/oecloud.io/oe-route-manager)
  * Handle event based navigation through ui-routes.
  ![Route Manager](docs/images/oe-studio-route-manager.png)
* UI designer (experimental) [git](http://evgit/oecloud.io/oe-ui-designer)
  * Create simple Polymer based form components and dashboards.
  ![UI designer](docs/images/oe-studio-ui-designer.png)
* Resource Manager (experimental) [git](http://evgit/oecloud.io/oe-resource-manager)
  * Handle UI Resources.
   ![Resource Manager](docs/images/oe-studio-resource-manager.png)



## Demo flows
Below are some  Guides that demonstrate oe-studio features :

* [Creating dashboard](./docs/create-dashboard.md)
* [Creating a simple listing screen](./docs/create-listing-screen.md)
* [Creating simple forms](./docs/create-forms.md)
* [Managing Resources](./docs/resource-manager.md)
* [Designing Flows](./docs/route-designer.md)

## Configuration for designer in oe-cloud
User can provide designer configuration on server side in `config.json` using the property `designer`.

Currently supported designer config are as follows :

| Config Attribute | Description | Default Value |
|---|---|---|
| installationPath | Folder path for oe-studio | client/bower-components
| mountPath |  Route to navigate to studio | /designer |
| stylePath |  Array of folder paths to fetch styles |  |
| assetPath |  Array of folder paths to fetch assets (images, videos, audio etc.) |  |
| templatePath | Array of folder paths to fetch templates | |
| imports | Application's client side files that needs to be imported |  |
| modules | Information on the plugins to be available in oe-studio | |



> Sample Config in `config.json`
```
...
...
"designer": {
   "installationPath": "client/bower_components",
   "mountPath": "/designer",
   "templatePath": ["client/templates"],
   "imports": ["all-imports.html"]
}
...
...
```

##Modules 

The modules array provided in the `config.json` determines the plugins available to oe-studio. This array should contain objects similar to UIRoutes model data. 
```
    [{
      'name': 'oe-model-manager',
      'path': '',
      'import': '/bower_components/oe-model-manager/oe-model-manager.html'
    },{
      'name': 'workflow-designer',
      'path': 'workflow-designer',
      'import': '/bower_components/oe-workflow-modeler/workflow-designer.html'
    }, {
      'name': 'oe-feel-designer',
      'path': 'rule-manager',
      'import': '/bower_components/oe-feel-designer/oe-feel-designer.html'
    }, {
      'name': 'oe-component-manager',
      'path': 'component-manager',
      'import': '/bower_components/oe-component-manager/oe-component-manager.html'
    }]

```
---

__Note : When no modules are specified by the application config , the above plugins will be available as defaults for the oe-studio.__

---

## License
The project is licensed under MIT License, See [LICENSE](./LICENSE) for more details.

## Contributing
We welcome contributions. Some of the best ways to contribute are to try things out, file bugs, and join in design conversations. 

### [How to contribute](./CONTRIBUTION.md)