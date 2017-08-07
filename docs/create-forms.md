# Create a Simple Form, with oe-studio

## What you'll Build
A simple screen, to capture the product details, that will be stored in Product Model of the [sample application](http://evgit/oecloud.io/oe-demo-app) using oe-studio

## What you'll Need
* Familiarity with oeClod.io
* Basic understanding of UIComponents,Routes and Navigation Links
* Basic understanding of HTML,CSS,JavaScript
* [Example Application](http://evgit/oecloud.io/oe-demo-app) to start with

## How to complete this guide

By the end of this guide, using ***Product*** model of the application, we will create a simple form and a route to navigate to form. 

Run the application using `node .` and open [http://localhost:3000/](http://localhost:3000/) in your browser. Login in as an admin, credentials are

```
username : john
password : Edge@2017$

```
Navigate to http://localhost:3000/designer. You should see the screen as below:

![Start Page][desstart-page]

## Navigating to designer mode and building a page

Click on the uidesigner icon i.e., the bottom left second icon, you will be navigated to uidesigner mode. You should see the screen as below:

![UIDesigner Page][UIDesigner-page]

Using uidesigner of oe-studio, it is possible to create either a static page or a polymer element. You can add a route and a navigation link to thus create page/element with few simple clicks in the designer.

In this guide we will build a polymer element, which essentially serves as a listing screen. 

Select Create/Manage Components, as shown image
![UIDesigner Page][UIDesigner-page]

Let us add a component, in our case, we will be adding a polymer component and navigate to add further details

![Select PolymerComponent][select-polymer]

![Add Component][add-component]

![Navigating][next-page]

Before  adding details, see that in the below screen , we have selected bind model.oe-studio helps you to directly bind a model to fetch details related to the model and thus creates an element. 


![Add Details][add-details]


## Choosing a model to bind

As we plan to create a form for Product model of the applications, select **Product**. As the screen is a form, we can decide on the properties that we want to capture.Check /uncheck the properties to display or hide on the screen respectively 

If auto-generate fields is set true, all the properties of the model ,appear as fields on the screen

![Choose Model][choose-model]


## Selecting a template

Templates are  bear backbone structures on which the form is rendered. It has CSS and other necessary details. The default-form template looks as below


```
<link rel="import" href="/bower_components/oe-ui-forms/meta-polymer.html">
<link rel="import" href="/bower_components/oe-info/oe-info.html">
<link rel="import" href="/bower_components/iron-flex-layout/iron-flex-layout.html">
<link rel="import" href="/bower_components/iron-image/iron-image.html">
<link rel="import" href="/bower_components/oe-data-table/oe-data-table.html">
<link rel="import" href="/bower_components/oe-date/oe-date.html">
<link rel="import" href="/bower_components/oe-combo/oe-combo.html">
<link rel="import" href="/bower_components/oe-paper-chip/oe-paper-chip.html">
<link rel="import" href="/bower_components/oe-checkbox/oe-checkbox.html">
<link rel="import" href="/bower_components/paper-tabs/paper-tabs.html">
<link rel="import" href="/bower_components/iron-pages/iron-pages.html">
<link rel="import" href="/bower_components/oe-validators/behaviors/oe-model-handler.html">
<link rel="import" href="/bower_components/oe-validators/behaviors/oe-form-validation-behavior.html">
<link rel="import" href="/bower_components/oe-validators/behaviors/oe-model-handler.html">
<link rel="import" href="/bower_components/oe-validators/oe-validators.html">


<dom-module id=":componentName">
    <template>
        <style>
            
            .content {
                padding: 20px;
                background-color: #fff;
            }
            
            .layout-2-1 > * {
                width: calc(50.00% - 16px);
                padding-left: 8px;
                padding-right: 8px;
            }
             .layout-2-1  {
                display: flex;
                flex-wrap: wrap;
            }

            paper-button {
                background-color: #1724BA;
                color: #fff;
            }
            
            @media(max-width:600px) {
                .layout-2-1 > * {
                    width: calc(100.00% - 16px);
                }
            }
        </style>

        <div class="content layout vertical">
            <div class="layout horizontal">
                <h2 class="flex">:modelName</h2>
                <div>
                    <paper-button raised primary on-tap="doSave">Save</paper-button>
                </div>
            </div>

            <div id="fields" class="layout-2-1 layout horizontal wrap">
            </div>
            <div id="details" class="layout vertical">
            </div>
        </div>
    </template>
    <script>
        MetaPolymer({
            is: ":componentName",
            behaviors: [OEUtils.FormValidationBehavior, OEUtils.ModelHandler, OEUtils.FormMessagesBehavior],
            listeners :{ "oe-formdata-updated":"_success","oe-formdata-inserted":"_success" },
            _success:function(){
                this.fire("oe-show-success","Record inserted/updated successfully");
                this.doClear();
            }

            
        });
    </script>
</dom-module>
```

1. Notice `:componentName` in the template file. This is replaced at runtime with appropriate component name (_product-form_ in our case).
1. With `:componentName` re _product-form_ the template will is similar to a Polymer element definition, except that `Polymer` call is replaced with `MetaPolymer`. This is the function that merges metadata information into the imported component.
1. The `div` with _id="fields"_ (`<div id="fields" class="layout-2-1`) is where the input fields are injected by default.
1. We've added 3 behaviors in the template that perform form-validation, model-handling (server interaction) and message display activities respectively.
1. The `paper-button` with _on-tap="doSave"_ submits the data to server after validation. `doSave` method is defined in `EV.ModelHandler` behavior.
1. Finally some styles defined on the top make sure the fields are arranged appropriately.
So let us choose, default-list template
![Choose Template][choose-template]

**In case you have a custom template, you can add the same in client/templates folder.Refresh the designer and your template will be available for further use 


## Finally in Designer


![Final Page][final-page]

## Configuring route for the page developed

Let us now configure the route for the page that is designed in oe-studio. We will not configure the navigation links for this demo

![Configure Route][configuring route]


## In our application

Navigate to localhost:3000/create-product and you will see the screen below.

![Actual Page][actual-page]

## Summary
oe-studio is a  powerful tool to Create a page with less or no coding. From this guide, we have created a simple listing screen.


[desstart-page]:  images/oe-studio-charts/desstart-page.PNG "Start Page"
[UIDesigner-page]:images/oe-studio-charts/uidesstart-page.PNG "UIDesigner Page"
[actual-page]:images/oe-studio-form/actual-page.PNG "Actual Page"
[final-page]:images/oe-studio-form/final_render.PNG "Final Page"
[add-component]: images/oe-studio-list/add-component.PNG "Add Component"
[next-page]: images/oe-studio-list/next.PNG "Navigating"
[add-details]: images/oe-studio-form/adding-details.PNG "Add Details"
[choose-model]:images/oe-studio-form/choosing-model.PNG "Choose Model"
[choose-template]:images/oe-studio-form/choosing-template.PNG "Choose Template"
[select-polymer]:images/oe-studio-list/select-polymer.PNG "Select PolymerComponent"
[configuring route]:images/oe-studio-form/route-configuration.PNG "Configure Route"