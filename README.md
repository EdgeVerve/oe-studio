# EVF Designer

## Introduction

EVF Designer, which itself is a web application,is a tool that is developed to make working with ev-foundation(EVF) easier. This tools provides end user a web interface using which he/she (particularly developer) will be able to perform several tasks like creating models, posting and retrieving data from models and other operations with ease

---

## Installing EVF Designer

# If you have only ev-foundation

* git clone https://github.com/EdgeVerve/ev-foundation.git
* cd ev-foundation
* npm install --no-optional
* bower install
* node .
* Browse evf-designer at localhost:3000/designer

Use username and password as "admin" to login

---

# Model Administration 

### List of Existing Models :-
In the side pan of EVF-Designer tool, all the existing models are listed as shown in the image below. A model can be selected by clicking on the model name.

<img src="images/documentationImages/existingModels.png" width="500" height="400">

---

### Search for a model : -

There is a search option to find a model from the list. Refer the image below.

<img src="images/documentationImages/searchModel.png" width="500" height="400">

---

### Creating a new model : -

In the grid region of the tool, there is an icon to create new models. Refer first image below to identify the icon. In order to create a model, click on the icon. After clicking the create model icon, a dialog will pop up with a form to be filled with the required details. First tab of the dialog is all about the model informations. Like - Model name, base model, description of the model, autoscoping values etc. Refere second image

Identify the create model icon.

<img src="images/documentationImages/createNewModel.png" width="500" height="400">

Required model information to create new models. Name of the model is a required field.

<img src="images/documentationImages/modelInformation.png" width="700" height="500">

---

### Adding model properties

Second tab is to add model properties to the model. Property name and its type is required in order to add a property(Refer image below). The type of property can be a primitive type or it can be a type of another model itself. In the dropdown of property type one will have option to select any desired type(Refer image 2). 

##### Property name

<img src="images/documentationImages/properties.png" height="700" width="1000">

##### Property type

<img src="images/documentationImages/modelProperty.png" height="700" width="1000">

Property validations can be added. Example - If a property should have some minimum or maximum value then it can be added here. Refere the below image.

<img src="images/documentationImages/propertyValidation.png" height="700" width="1000">

Added property can be delete if required. One can select multiple properties at once to delete all selected ones. Refer the below image.

<img src="images/documentationImages/deleteProperty.png" height="700" width="1000">

---

### Adding model relations

Relations may exist among the models. Example - An account must belongs to some customer. So there exist a relation between these two. Relation name, type and related models are required fields. Refer the image below.

Relation type can be of anything from the dropdown.

<img src="images/documentationImages/relationType.png" height="700" width="1000">

Relation of the current model must exist with some other model. One can choose the model from all model list.
Refer the image below.

<img src="images/documentationImages/relationWithModel.png" height="700" width="1000">

Model can be saved at any time using the save button (right bottom). One can add properties , relations or validations later on using edit model option.

---

### Editing a model : -

An existing model can be edited with new values of properties, relations, validations, ACls. Existing properties, relations, validations and ACLs can also be edited. These operations can be done in the same way as how to create a new model.

<img src="images/documentationImages/editModel.png" height="700" width="1000">

Same dialog (create model dialog) will pop up when clicked on edit model option. 

<img src="images/documentationImages/editedModelView.png" height="700" width="1000">

After all the edits , model can be saved using the save button (bottom right).
  
<img src="images/documentationImages/editedModelSave.png" height="700" width="1000">

---

# Data Management

This part of EVF-Designer provides the facility to interact with data.

### Data management operations : -

There are three options for the data management.
1. View Data.
2. Post Data.
3. Upload Data. (Refer below image.)

<img src="images/documentationImages/modelOperations.png" height="700" width="1000">

### View Data : -

This option is to view the existing data either in grid or Json from.

<img src="images/documentationImages/viewDataGridView.png" height="700" width="1000">

Json view is to see the data in JSON format.

<img src="images/documentationImages/viewData.png" height="700" width="1000">

Query can be passed to get the data according to filter condition.

<img src="images/documentationImages/viewDataFilter.png" height="700" width="1000">

---

### Data post : -

This option is to post new data using auto generated form or direct through Json structured form of data. It also provides method to update or delete existing data through Json format.

To post data in an interactive way, a from is auto generated according to the property type of the model. All the required fields appear with mandatory sign. (Refer the image below.) 

<img src="images/documentationImages/postdataUsingForm.png" height="700" width="1000">

Json format of posting data is also available. One can post multiple records at a time. 

<img src="images/documentationImages/jsonPostData.png" height="700" width="1000">

Existing records can be updated by selecting "PUT" method from the method dropdown. "Id" field is required in case of any update queries. If "Id" field is not provided then the record will be posted as a new record.

<img src="images/documentationImages/putOperationToUpdateData.png" height="700" width="1000">

A record can be deleted by selecting "DELETE" method from the method dropdown. "_version" and "Id" fields are mandatory in order to delete the record successfully.

<img src="images/documentationImages/deleteOperationToDeleteData.png" height="700" width="1000">

---

### Upload Data : -

This option provides bulk upload of json data to the model through file. The data should be in json structure.

The data file can be dropped to the circular area(refer image below) or the file can be browsed using the browse icon.

<img src="images/documentationImages/fileUpload.png" height="700" width="1000">

If the upload is successful then the following status will appear. In case of any error, the error message will be displayed. If the data is in array form and some of the elements are not according to the model properties then these elements will be discarded and rest will be posted successfully.

<img src="images/documentationImages/fileUploadSuccess.png" height="700" width="1000">

Posted data can be viewed by selecting the view data from the same dialog.(Refer the image below.)

<img src="images/documentationImages/viewDataAfterFileUpload.png" height="700" width="1000">

---

### Model detailed report : -

By selecting the detailed report option one can see the details of the model.

<img src="images/documentationImages/detailedReport.png" height="700" width="1000">

This option provides detailed information of a model. Like - Model name, its relations, properties and validation. 

<img src="images/documentationImages/detailedView.png" height="700" width="1000">

### Service Personalization : -

Select Manage rule option from the model operations.
Refer image below.

<img src="images/documentationImages/personalizationRulesMenu" height="700" width="1000">

## More information
Please refer wiki documentation for more information on installation and usage.

## License
The project is licensed under MIT License, See [LICENSE](./LICENSE) for more details.

## Contributing
We welcome contributions. Some of the best ways to contribute are to try things out, file bugs, and join in design conversations. 

### [How to contribute](./CONTRIBUTION.md)