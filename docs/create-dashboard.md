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

![Start Page][desstart-page]

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

![Choose Page][choose-page]

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


[start-page]: images/oe-studio-charts/desstart-page.png "Start Page"
[UIDesigner-page]: http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/uidesstart-page.PNG "UIDesigner Page"
[static-page]: http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/static-page.png "Static Page"
[static-select]: http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/static-select.png "Static Page"
[add-component]: http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/add-component.png "Add Component"
[choose-page]: http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/choose-page.png "Choose Page"
[adding-details]: http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/adding-details.png "Add Details"
[add-template]: http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/choose-template.png "Choose Template"
[first-dashboard]: http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/new-dashboard.png "New Dashboard"
[end-page]: http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/actual_dashboard.png "End Page"
[configuring route]: http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/route-configuration.png "Configure Route"
[application-start]: http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/application-start.png "Application Start"
[datatable-step1]: http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/drag-datatable.png "Adding datatable1"
[datatable-step2]: http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/drag-datatable-1.png "Adding datatable2"
[datatable-step3]: http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/drag-datatable-2.png "Adding datatable3"
[datatable-step4]:http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/drag-datatable-3.png "Adding datatable4"
[widget-container]:http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/widget-container.png "widget container"
[label-step1]:http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/adding_labels_1.png "Adding label1"
[label-step2]:http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/adding_labels_2.png "Adding label2"
[label-step3]:http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/adding_labels_3.png "Adding label3"
[graphs-step1]:http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/oe-charts-1.png "Adding graphs1"
[graphs-step2]:http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/oe-charts-2.png "Adding graphs2"
[graphs-step3]:http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/oe-charts-3.png "Adding graphs3"
[before-style]:http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/dashboard-withoutstyle.png "Before Style"
[style-step1]:http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/adding-style.png "Adding Style1"
[style-step2]:http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/adding-style-2.png "Adding Style2"
[after-style]:http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/dashboard-afterstyle.png "After Style"
[configure-layout]:http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/delete-resize.png "Configure Layout"
[final-layout]:http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/final_layout.png "Final Layout"
[code-view]:http://evgit/oecloud.io/oe-studio/raw/master/docs/images/oe-studio-charts/code-view.png "Code View"