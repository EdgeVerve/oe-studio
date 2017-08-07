# Create a dashboard using oe-studio

## What you'll Build

Working on a [Example Application](https://cassibank.oecloud.io/login) which has oe-studio as bower dependency you will 
* create a dashboard using studio
* create a navigation link for the dashboard page using studio
* create a route for the dashboard page using studio

## What you'll Need
* Familiarity with oeClod.io
* Basic understanding of UIComponents,Routes and Navigation Links
* Basic understanding of HTML,CSS,JavaScript
* [Example Application](https://cassibank.oecloud.io/login) to start with

## How to complete this guide

By the end of this guide, using data from  loan-application model and other related models of cassi bank, we will create an admin dashboard, a route and a navigation link. 

Run the application using `node .` and open [http://localhost:3000/](http://localhost:3000/) in your browser. Login in as an admin, credentials are

```
username : john
password : Edge@2017$

```
Navigate to http://localhost:3000/designer. You should see the screen as below:

![Start Page][start-page]

## Navigating to designer mode and building a page

Click on the uidesigner icon i.e., the bottom left second icon, you will be navigated to uidesigner mode. You should see the screen as below:

![UIDesigner Page][UIDesigner-page]

Using uidesigner of oe-studio, it is possible to create either a static page or a polymer element. You can add a route and a navigation link to thus create page/element with few simple clicks in the designer.

In this guide we will build a static page, which will serve as a dashboard. 

Select Create/Manage Components, as shown image, 

![Create Page][static-page]

Select Static Page

![Static Page][static-select]

Add a new component

![Add Component][add-component]

![Add Details][add-details]

Let us choose a blank form for our dashboard as a template:

![Choose Template][add-template]

Dashboard page looks as below

![New Dashboard][first-dashboard]

Now let us drag and drop components, to achieve the dashboard as below

![End Page][end-page]

## Adding Data table component to the dashboard

Data Table is a component from oeCloud.io. The bare minimunm data to populate the table are **data-controller** and **config-code**

Based on the RestURL specified in the data controller and 

![Adding datatable1][datatable-step1]

![Adding datatable2][datatable-step2]


![Adding datatable3][datatable-step3]

![Adding datatable4][datatable-step4]

## Adding Widget container

![widget container][widget-container]
![Configure Layout][configure-layout]

![Final Layout][final-layout]

## Adding Labels to the graphs in dashboard

![Adding label1][label-step1]
![Adding label2][label-step2]
![Adding label3][label-step3]

## Adding Graphs to the dashboard

![Adding graphs1][graphs-step1]
![Adding graphs2][graphs-step2]
![Adding graphs3][graphs-step3]


![Before Style][before-style]

## Adding Additional Styles to the dashboard

![Adding Style1][style-step1]
![Adding Style2][style-step2]

![After Style][after-style]

## Code View of oe-studio

![Code View][code-view]

## Configuring route for the page developed

Let us now configure the route and navigation for the page that is designed in oe-studio.

![Configure Route][configuring route]


## In our application

Navigate to localhost:3000

![Application Start][application-start]

Click on the menu i.e, to left top corner and you will see the screen below.

![Navigation Menu][navigation-menu]

Click on dashborad and you will navigate to dashboard page. 

![End Page][end-page]


## Summary
Oe-studio is a  powerful tool to Create a page,its routewith less or no coding


[start-page]: images/oe-studio-charts/desstart-page.PNG "Start Page"
[UIDesigner-page]: images/oe-studio-charts/uidesstart-page.PNG "UIDesigner Page"
[static-page]: images/oe-studio-charts/static-page.PNG "Static Page"
[static-select]: images/oe-studio-charts/static-select.PNG "Static Page"
[add-component]: images/oe-studio-charts/add-component.PNG "Add Component"
[add-details]: http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/adding-details.PNG "Add Details"
[add-template]: images/oe-studio-charts/choose-template.PNG "Choose Template"
[first-dashboard]: images/oe-studio-charts/new-dashborad.PNG "New Dashboard"
[end-page]: images/oe-studio-charts/actual_dashboard.png "End Page"
[configuring route]: images/oe-studio-charts/route-configuration.PNG "Configure Route"
[application-start]:images/oe-studio-charts/application-start.PNG "Application Start"
[datatable-step1]: images/oe-studio-charts/drag-datatable.PNG "Adding datatable1"
[datatable-step2]: images/oe-studio-charts/drag-datatable-1.PNG "Adding datatable2"
[datatable-step3]: images/oe-studio-charts/drag-datatable-2.PNG "Adding datatable3"
[datatable-step4]:images/oe-studio-charts/drag-datatable-3.PNG "Adding datatable4"
[widget-container]:images/oe-studio-charts/widget-container.PNG "widget container"
[label-step1]:images/oe-studio-charts/adding_labels_1.PNG "Adding label1"
[label-step2]:images/oe-studio-charts/adding_labels_2.PNG "Adding label2"
[label-step3]:images/oe-studio-charts/adding_labels_3.PNG "Adding label3"
[graphs-step1]:images/oe-studio-charts/oe-charts-1.PNG "Adding graphs1"
[graphs-step2]:images/oe-studio-charts/oe-charts-2.PNG "Adding graphs2"
[graphs-step3]:images/oe-studio-charts/oe-charts-3.PNG "Adding graphs3"
[before-style]:images/oe-studio-charts/dashboard-withoutstyle.PNG "Before Style"
[style-step1]:images/oe-studio-charts/adding-style.PNG "Adding Style1"
[style-step2]:images/oe-studio-charts/adding-style-2.PNG "Adding Style2"
[after-style]:images/oe-studio-charts/dashboard-afterstyle.PNG "After Style"
[configure-layout]:images/oe-studio-charts/delete-resize.PNG "Configure Layout"
[final-layout]:images/oe-studio-charts/final_layout.PNG "Final Layout"
[code-view]:images/oe-studio-charts/code-view.PNG "Code View"