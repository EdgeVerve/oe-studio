# Designing Flows or Navigations

## What you'll Build

Working on an [Example Application](http://evgit/oecloud.io/oe-demo-app) which is added with [dashboard page](create-dashboard.md) and [Product form](create-forms) we will build a route design, to navigate from dashboard to Product form.


## What you'll Need
* Familiarity with oeClod.io
* Basic understanding of UIComponents,Routes and Navigation Links
* Basic understanding of HTML,CSS,JavaScript
* Clone the [Example Application](http://evgit/oecloud.io/oe-demo-app) to start with
* [dashboard page](create-dashboard.md) and [Product form](create-forms)

## How to complete this guide

By the end of this guide, using dashboard screen and create-product screen we will design a route flow from dashboard to product form.

Run the application using `node .` and open [http://localhost:3000/](http://localhost:3000/) in your browser. Login in as an admin, credentials are: 
 ```
 username :john
 password :Edge@2017$
 ```

Navigate to http://localhost:3000/designer. You should see the screen as below:

![Start Page][desstart-page]

## Navigating to designer mode and choosing the existing dashboard page

Click on the uidesigner icon i.e., the bottom left second icon, you will be navigated to uidesigner mode. You should see the screen as below:

![UIDesigner Page][UIDesigner-page]

Using uidesigner of oe-studio, it is possible to create/manage either a static page or a polymer element.

In this guide we will modify the previously created dashboard page,to understand how route designer works. 

Select Create/Manage Components, as shown image:

![Static Page][static-page]

Choose the existing dashboard page.

![Existing Dashboard][existing-dashboard]

## Modification to data table to add row actions and customise columns

Existing data table of the dashboard shows all the columns of the model . We will cutomize the same, using oe-studio and columns property of the data table.Below properties are set as columns for this guide.

```
[{"key":"type"},{"key":"label"},{"key":"rateOfInterest"},{"key":"currency"}]
```

Our idea is to navigate user to product form  screen , when he clicks on the edit icon on a row in the data table which oe-cloud.io internally populates the details of the row on to the product screen.

Let us add row actions to the existing data table to achieve the same.The value for the rowActions property of the data table for  this example is shown below.

```
[{"icon":"editor:mode-edit"," title":"edit","action":"edit"}]
```
After adding the above values, the data table looks as below: 

![Datatable AfterModification][datatable-after]

On hover over a row in the data table, you will see an edit icon to the extreme right corner:

![Edit icon][edit-icon]

On click of this icon in the data table, the data table fires an event, **_oe-data-table-row-action-edit_**, we will use this event to navigate to the product form

** _To know more about data table properties you can go through [guides](http://www.oeCloud.io/docs)_ ** 
 
## Adding a new Route using Model Designer

Let us add a new route, to achieve the route design we have planned for. Navigate to the model designer view

![Model Designer][model-designer]

Choose, UIRoutes and navigate to the detailed view of UIRoute. Let us post a new route as below

![Posting Data][post-data1]

```
{
  "type": "elem",
  "name": "create-product",
  "path": "/create-product/:id",
  "import": "/api/UIComponents/component/create-product",
  "group": "",
  "retainInstance": false
}
```
![Posting Success][post-data2]


If you notice _import:  "/api/UIComponents/component/create-product"_, we are using the same create product form that has been created earlier in one of the guides, but when looked in more detail the  _path : "create-product/:id"_, :id is a placeholder and hence expects an Id value. Internally, the UIForm handler will handle these cases and populates, the fields of the form with details for that id.

## Designing the flows

Now we have a route _/dashboard_ and a newly created route _/create-product/:id_ let us configure a design to navigate to  _/create-product/:id_ when the user clicks on edit icon in data table.

Navigate to route designer view

![Route Designer][route-designer]

Choose _/dashboard_ and a newly created route _/create-product/:id_

![Choose Routes][choose-routes]

Create the route from dashboard to product form. Add the details of the event on which the navigation has to happen, which in our case is **_oe-data-table-row-action-edit_**

![Adding Event][add-event]

Finally the design view looks as below

![Final Design][final-design]

## Finally

Navigate to localhost:3000/dashboard

![Dashboard Page][end-page1]

Hover over a row and select the edit icon

![Product Page][end-page2]


## Summary
Oe-studio is a  powerful tool in designing the route flow  with less or no coding


[desstart-page]:  images/oe-studio-charts/desstart-page.PNG "Start Page"
[UIDesigner-page]:images/oe-studio-charts/uidesstart-page.PNG "UIDesigner Page"
[static-page]:images/oe-studio-charts/static-page.PNG "Static Page"
[end-page1]: images/oe-studio-routedesigner/datatable_edit.PNG "Dashboard Page"
[end-page2]: images/oe-studio-routedesigner/final_page.PNG "Product Page"
[existing-dashboard]: images/oe-studio-routedesigner/choosing_ExistingPage.PNG "Exisiting Dashboard"
[datatable-after]: images/oe-studio-routedesigner/datatable_aftermodification.PNG "Datatable AfterModification"
[edit-icon]: images/oe-studio-routedesigner/datatable_aftermod1.PNG "Edit icon"
[model-designer]: images/oe-studio-routedesigner/model_view.PNG "Model Designer"
[post-data1]: images/oe-studio-routedesigner/post_data.PNG "Posting Data"
[post-data2]: images/oe-studio-routedesigner/post_data2.PNG "Posting Success"
[route-designer]: images/oe-studio-routedesigner/route-designer.PNG "Route Designer"
[choose-routes]: images/oe-studio-routedesigner/creating_routeflow1.PNG "Choose Routes"
[add-event]: images/oe-studio-routedesigner/creating_routeflow2.PNG "Adding Event"
[final-design]: images/oe-studio-routedesigner/creating_routeflow3.PNG "Final Design"