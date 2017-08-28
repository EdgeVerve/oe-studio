# Create a dashboard using oe-studio

## What you'll Build

Working on a [Example Application](http://evgit/oecloud.io/oe-demo-app) which has oe-studio as bower dependency you will 
* create a dashboard using studio
* create a navigation link for the dashboard page using studio
* create a route for the dashboard page using studio

## What you'll Need
* Familiarity with oeClod.io
* Basic understanding of UIComponents,Routes and Navigation Links
* Basic understanding of HTML,CSS,JavaScript
* Clone the [Example Application](http://evgit/oecloud.io/oe-demo-app) to start with

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

Add the details like name of the page

![Add Details][add-details]

Let us choose a blank form for our dashboard as a template:

![Choose Template][add-template]

Dashboard page looks as below

![New Dashboard][first-dashboard]

Now let us drag and drop components, to achieve the dashboard as below

![End Page][end-page]

## Adding Data table component to the dashboard

Data Table is an ui component from oeCloud.io. The bare minimunm data to populate the table are **data-controller** and **config-code**. To understand more about the data table follow the [guides]("www.oeCloud.io/docs")

Based on the RestURL specified in the _data-controller_ and the model name mentioned in the _config-code_, the data table is populated.

For the guide, the values for _data-controller_ and _config-code_ are {"restUrl":"/api/Products"} and Product respectively.

Search Data table in the designer and drag and drop the table into the container

![Adding datatable1][datatable-step1]

After drag and drop, the screen looks as below.

![Adding datatable2][datatable-step2]

Click on the settings icon as shown in the image, to configure the properties of the table

![Adding datatable3][datatable-step3]

Add values to the properties to achieve a table as shown below

![Adding datatable4][datatable-step4]

## Adding Widget container

Widget Containers are the draggable and expandable sections of the page. Let us use these to add charts to the dash boards.

The final layout, with the widget containers should look as below

![Final Layout][final-layout]

Choose the widget container icon in the designer as shown in the image. Drag and drop the same into the page 
![widget container][widget-container]

You can delete and expand the widgets. Do the necessary to achieve the layout as show in the above image.

![Configure Layout][configure-layout]


## Adding Labels to the graphs in dashboard

Before adding graphs into the widget containers, let us label the graph. Steps for one label creation is shown. Try out rest on your own: 

Search for oe-info in the designer and drag and drop the component into the first widget container 

![Adding label1][label-step1]

oe-info has a label property and value property, apart from other properties. Let us add our graph description to the value proerty of the oe-info. 

For the first one the description is added as _Region wise analysis of applications_.

![Adding label2][label-step2]

Similarly add the labels for other containers as shown in the below image.

![Adding label3][label-step3]

** Do not forget to save the changes. **

## Adding Graphs to the dashboard

oe-charts is an ui component that is developed in polymer and offered by oeCloud.io. oe-charts supports varied types of charts that suits majority of the business needs. In this guide, we will be using 

*Column graph for a scenario , to analyse the region wise applications for the bank across years
*line graph for a scenario to analyse the yearly growth in terms of the number of applications
*GroupedColumn graph for a scenario understand quarterly report on the number of applications for each type

In this guide, the sample data for all the three graphs is provided, while only one has detailed explanation.Try out the other two graphs on own

Search for oe-charts in ui designer 

![Adding graphs1][graphs-step1]

 drag and drop the same into the widget container

![Adding graphs2][graphs-step2]

Let us configure the properties to achieve the graph as shown in the below image:

```
category :appUser.profile.region
chart-type:column
data-url:/api/LoanApplications?filter=%7B%22include%22%3A%7B%22appUser%22%3A%22profile%22%7D%7D
inherit-parent-dimension : true
series :[{"property":"id","name":"Loan Applications","aggregation":"count","color":"green"}]
```
![Adding graphs3][graphs-step3]

In the previous scenario the series data contains an aggregation function, but if data provided is already formatted no need of providing any aggregation function.
Example :
Suppose we have formatted data as below :
```
data : [{
            country: 'China',
            appls: 1066702
        }, {
            country: 'India',
            appls: 1005600
        }, {
            country: 'United States',
            appls: 1503498
        }]
```
Then setting the following properties will achieve a graph as shown in the below image.
```
category : country
chart-type : column
inherit-parent-dimension : true
series : [{"property":"appls","name":"Loan Applications","color":"green"}]
data : [{
            country: 'China',
            appls: 1066702
        }, {
            country: 'India',
            appls: 1005600
        }, {
            country: 'United States',
            appls: 1503498
        }]
```
![Formatted Chart][formatted-chart]

Data for other two graphs are : 

```
category :_createdOn
category-aggregator:year
chart-type:line
data-url:/api/LoanApplications
inherit-parent-dimension : true
series :[{"property":"id","name":"Loan Applications","aggregation":"count","color":"green"}]
```

```
category :_createdOn
category-aggregator:quarter
category-format :Q- 
chart-type:groupedColumn
data-url:api/LoanApplications?filter[where][_createdOn][gte]=%222017-01-01%22
inherit-parent-dimension : true
series :[{"property":"type","filter":"PERSONAL_LOAN","name":"PERSONAL_LOAN","aggregation":"count","color":"orange"},{"property":"type","filter":"HOME_LOAN","name":"HOME_LOAN","color":"blue","aggregation":"count"},{"property":"type","aggregation":"count","filter":"CAR_LOAN","name":"CAR_LOAN","color":"yellow"}]
```

* _Category_ represents the x-axis of the graph. It can be any property of the Model. 

* _category-aggregator_ is more useful in the scenarios like date as category. Date has an year,month and day. So the x-axis can be either one of them or a different one altogether. This can be specified in category-aggregator
* _category-format_ specifies the prefix to the x-axis label
* _chart-type_ specifies the type of chart the data has to be represented in
* _data-url_ specifies the datasource for the graph
* _inherit-parent-dimension_ when set to true, the graph takes the size of the parent container,else will be of fixed dimensions.
* _series_ represents the y-axis of the chart. It is an array and can take may series. _property_ of the series represents the property of the model , on which the data analysis is being done. _aggregation_ defines, if the data in the property has to be counted/added._filter_ specifies a filter with in the same data with which we can generate multiple series._color_ gives the desired color to the chart.Value specified in the _name_ appears as a label in the graph. 

After adding the graphs, our page looks as below:

![Before Style][before-style]

In the previous scenario the data from the url is filtered on client side using the _filter_ property of the _series_ object. However in certain cases we may need to get the data for each series from a seperate URL. The previous chart can be generated by providing different _dataUrl_ inside the _series_ object to perform server side filtering.

```
category :_createdOn
category-aggregator:quarter
category-format :Q- 
chart-type:groupedColumn
inherit-parent-dimension : true
series :[{"property":"type","dataUrl":"api/LoanApplications?filter[where][_createdOn][gte]=%222017-01-01%22&&filter[where][type]=%22PERSONAL_LOAN%22","name":"PERSONAL_LOAN","aggregation":"count","color":"orange"},{"property":"type","dataUrl":"api/LoanApplications?filter[where][_createdOn][gte]=%222017-01-01%22&&filter[where][type]=%22HOME_LOAN%22","name":"HOME_LOAN","color":"blue","aggregation":"count"},{"property":"type","aggregation":"count",""dataUrl":"api/LoanApplications?filter[where][_createdOn][gte]=%222017-01-01%22&&filter[where][type]=%22CAR_LOAN%22","name":"CAR_LOAN","color":"yellow"}]
```

## Adding Additional Styles to the dashboard

We can add additional properties to an ui-component of the designer, apart from the common properties. 

For example, let us try to add a style property to the charts that makes our dashboard more beautiful. 
One example is shown, follow the same to achieve the final design as below

![After Style][after-style]

Choose oe-charts, as shown in the below image, you can add attributes, let us add property

```
style
````
and value 

```
border: solid 2px;
```

![Adding Style1][style-step1]

After adding style, the page looks as below.Add the same to other charts to achieve the above design

![Adding Style2][style-step2]


## Code View of oe-studio

oe-studio offers you to view the design in both , design view and code view. To modify in code view , you can always click on the icon as shown in the below image to achieve the code-view.

![Code View][code-view]

## Configuring route for the page developed

Let us now configure the route and navigation for the page that is designed in oe-studio.

![Configure Route][configuring route]


## In our application

Navigate to localhost:3000

![Application Start][application-start]

Click on the menu i.e, to left top corner.Click on dashborad and you will navigate to dashboard page. 

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
[formatted-chart]:images/oe-studio-charts/chart-formatted-data.PNG "Formatted Chart"