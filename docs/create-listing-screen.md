# Create a Simple Listing Screen , with oe-studio

## What you'll Build
A simple screen, to list the products, that are stored in Product Model of the [sample application](http://evgit/oecloud.io/oe-demo-app) using oe-studio

## What you'll Need
* Familiarity with oeClod.io
* Basic understanding of UIComponents,Routes and Navigation Links
* Basic understanding of HTML,CSS,JavaScript
* Clone the [Example Application](http://evgit/oecloud.io/oe-demo-app) to start with

## How to complete this guide

By the end of this guide, using ***Product*** model of the application, we will create a simple listing screen and a route to navigate to the listing page. 

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

As we plan to create a listing screen for Product model of the applications, select **Product**. The screen is purely a listing screen , hence we can uncheck the properties that are being shown. 

If not unchecked, these properties will be embedded in the screen as input elements.  

![Choose Model][choose-model]


## Selecting a template

Templates are  bear backbone structures on which the listing screen has to sit. It has CSS and other necessary details. The default-list template looks as below


```
<link rel="import" href="/bower_components/oe-ui-forms/meta-polymer.html">
<link rel="import" href="/bower_components/oe-info/oe-info.html">
<link rel="import" href="/bower_components/iron-flex-layout/iron-flex-layout.html">
<link rel="import" href="/bower_components/iron-image/iron-image.html">
<link rel="import" href="/bower_components/oe-data-table/oe-data-table.html">
<link rel="import" href="/bower_components/oe-date/oe-date.html">
<link rel="import" href="/bower_components/oe-checkbox/oe-checkbox.html">
<link rel="import" href="/bower_components/paper-tabs/paper-tabs.html">
<link rel="import" href="/bower_components/iron-pages/iron-pages.html">
<link rel="import" href="/bower_components/oe-validators/behaviors/oe-model-handler.html">
<link rel="import" href="/bower_components/oe-validators/behaviors/oe-form-validation-behavior.html">


<dom-module id=":componentName">
    <template>
        <style>
            oe-data-table {
                background-color: #fff;
            }
            
        </style>

        
              
                <div>
                  <oe-data-table config-code=":modelName" data-controller='{"restUrl" : "/api/:plural"}'></oe-data-table>
                </div>
            
    </template>
    <script>
        MetaPolymer({
            is: ":componentName",
          
            behaviors: [OEUtils.FormValidationBehavior, OEUtils.ModelHandler, OEUtils.FormMessagesBehavior]
        });
    </script>
</dom-module>
```

1. Notice `:componentName` in the template file. This is replaced at runtime with appropriate component name (_product-list_ in our case).
2. With `:componentName` re _product-list_ the template is similar to a Polymer element definition, except that `Polymer` call is replaced with `MetaPolymer`. This is the function that merges metadata information into the imported component.
1. The `div` with _oe-data-table_ (`<oe-data-table config-code=":modelName" data-controller='{"restUrl" : "/api/:plural"}'></oe-data-table>`) is where the records are injected.
1._:modelName_ , assigns the model that we bind as the config-code,_:plural_, assigns the plural modelName to the data-table. Understand more about [oe-data-table](https://www.oecloud.io/docs).
1. We've added 3 behaviors in the template that perform form-validation, model-handling (server interaction) and message display activities respectively.
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

Navigate to localhost:3000/Products and you will see the screen below.

![Actual Page][actual-page]

## Summary
oe-studio is a  powerful tool to Create a page with less or no coding. From this guide, we have created a simple listing screen.


[desstart-page]:  images/oe-studio-charts/desstart-page.PNG "Start Page"
[UIDesigner-page]:images/oe-studio-charts/uidesstart-page.PNG "UIDesigner Page"
[actual-page]:images/oe-studio-list/actual-page.PNG "Actual Page"
[final-page]:images/oe-studio-list/final_render.PNG "Final Page"
[add-component]: images/oe-studio-list/add-component.PNG "Add Component"
[next-page]: images/oe-studio-list/next.PNG "Navigating"
[add-details]: images/oe-studio-list/adding-details.PNG "Add Details"
[choose-model]:images/oe-studio-list/choosing-model.PNG "Choose Model"
[choose-template]:images/oe-studio-list/choosing-template.PNG "Choose Template"
[select-polymer]:images/oe-studio-list/select-polymer.PNG "Select PolymerComponent"
[configuring route]:images/oe-studio-list/route-configuration.PNG "Configure Route"