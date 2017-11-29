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

* add oe-studio as a bower dependency.
* bower install 
* node .
* Use username and password as "admin" to login.
* Browse oe-studio at localhost:3000/designer

---

# oe-studio modules

* Model Management
  * Manage oe-cloud based models and their data.
  ![Model Management](docs/images/oe-studio-landing.png)
* UI designer
  * Create simple Polymer based form components and dashboards.
  ![UI designer](docs/images/oe-studio-ui-designer.png)
* Workflow Modeler
  * Manage workflows related to the running application.
  ![Workflow Modeler](docs/images/oe-studio-workflow-modeler.png)
* Route Manager
  * Handle event based navigation through ui-routes.
  ![Route Manager](docs/images/oe-studio-route-manager.png)
* Rule Manager
  * Handle Business rule management and execution.
   ![Rule Manager](docs/images/oe-studio-rule-manager.png)
* Resource Manager
  * Handle UI Resources.
   ![Resource Manager](docs/images/oe-studio-resource-manager.png)
* Component Manager
  * Manage MetaPolymer based forms. 
   ![Component Manager](docs/images/oe-studio-component-manager.png)


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

## More information
Futher detailed documentation on individual modules will be added in future releases.

## License
The project is licensed under MIT License, See [LICENSE](./LICENSE) for more details.

## Contributing
We welcome contributions. Some of the best ways to contribute are to try things out, file bugs, and join in design conversations. 

### [How to contribute](./CONTRIBUTION.md)