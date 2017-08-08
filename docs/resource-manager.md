# Managing App Themes with oe-studio

## What you'll Build

Working on a [Example Application](http://evgit/oecloud.io/oe-demo-app) which is added with oe-studio as a bower dependency, we will add a different theme to the admin user while the application is running.

## What you'll Need
* Familiarity with oeClod.io
* Basic understanding of UIComponents,Routes,themes and Navigation Links
* Basic understanding of HTML,CSS,JavaScript
* Clone the [Example Application](http://evgit/oecloud.io/oe-demo-app) to start with

## How to complete this guide

In business scenarios, it is common to have different themes, for the same application based on various scopes[roles, type of devices,users, etc].
By the end of this guide, we will add a specific theme for the admin user.

Run the application using `node .` and open [http://localhost:3000/](http://localhost:3000/) in your browser.

Login in as an admin, credentials are :
```
username : john
password :Edge@2017$
```

The page looks as below

![Start Page][start-page]



Navigate to http://localhost:3000/designer. You should see the screen as below:

![Designer Page][desstart-page]

## Choosing an existing theme or customising a theme

oe-studio offers you some existing themes, you can choose from them or customise one. 

Select create/Manage components, to the right side you will see an option to customize theme as shown in the below picture. Choose the same

![Customising Theme][customising-theme]

As mentioned above you can choose an existing theme or design your own theme. 
To customise your own theme, you can click on customize theme as shown  image below: 
![Customising Step1][customising-theme1]

You will navigate to the below screen , you can choose a Primary color and a Accent color for the theme and later download the same. 
![Customising Step2][customising-theme2]

In this guide, we have picked up an existing theme as shown in the image below, and downloaded the same
![Customising Step3][customising-theme3]

The downloaded app-theme for the example application looks as below:

```
<dom-module id="app-theme">
  <template>
    <style>
      :root {
        --dark-primary-color:       #616161;
        --default-primary-color:    #9E9E9E;
        --light-primary-color:      #F5F5F5;
        --text-primary-color:       #212121;
        --accent-color:             #448AFF;
        --primary-background-color: #F5F5F5;
        --primary-text-color:       #212121;
        --secondary-text-color:     #757575;
        --disabled-text-color:      #BDBDBD;
        --divider-color:            #BDBDBD;


        /* Components */

        /* paper-drawer-panel */
        --drawer-menu-color:           #ffffff;
        --drawer-border-color:         1px solid #ccc;
        --drawer-toolbar-border-color: 1px solid rgba(0, 0, 0, 0.22);

        /* paper-menu */
        --paper-menu-background-color: #fff;
        --menu-link-color:             #111111;

        /* paper-input */
		
		--paper-input-container-color: #757575;
		--paper-input-container-input-color: #757575;
		--paper-input-container-focus-color: #9E9E9E;
      }
    </style>
  </template>
</dom-module>
```
** You can always edit this file to add more details.**
#### **NOTE** : _Do not change the file name when downloading/uploading the app-theme_

## Modifications to theme import to support run time selection of themes 

In the example application, the import to the theme is specified in app-shell. So, navigate to app-shell.html i.e., in client/elements folder. 

The current theme import is specified as 

```<link rel="import" href="/api/UIResources/content/app-theme.html">``` 

Rather than a relative path like _href="../style/app-theme.html"_ .This change, calls the api UIResources,to fetch the appropriate app-theme from server for the specific user/scope.

## Navigating to Resource Manager Mode and adding a new theme

Click on the Resource Manager icon as marked in the below image:

![Resource Manager][resource-manager]

you will be navigated to Resource Manager. We will see the screen as below:

![ResourceManager Page][resource-managerpage]

A new app-theme is placed in the application folder in root. Let us add that theme to admin.

Click on add-new button as marked in the above screen.We will see the screen as below:
![Adding Theme][add-theme]

Upload the theme from the application, add scope and save details . To understand more about personalisation, follow [guides](https://www.oecloud.io/guide/datapersonalization)

```
{"roles":["admin"]} 
```
![Theme Added][theme-success]

Now let us compare the changes, in our application: 

Before adding the changes, the admin header was as below:

![Before Theme][before-theme]

Refresh http://localhost:3000, now the header looks as below:

![After Theme][after-theme]

Let us confirm, that the change in the theme is only  applicable to admin user and not other users. 

Logout as John, and login as Judith:

```
username:judith
password:Edge@2017$
```

If the header of Judith is as below ,then we have successfully added admin specific theme using oe-studio

![Non Admin][non-admin]

## Summary

Creating specific themes is made easy with oe-studio


[start-page]:  images/oe-studio-charts/application-start.PNG "Start Page"
[desstart-page]:  images/oe-studio-resman/desstart-page.PNG "Designer Page"
[resource-manager]: images/oe-studio-resman/navigate_rm.PNG "Resource Manager"
[add-theme]:images/oe-studio-resman/add_new_theme.PNG "Adding Theme"
[theme-success]:images/oe-studio-resman/after_adding_theme.PNG "Theme Added"
[resource-managerpage]:images/oe-studio-resman/rm-screen.PNG "ResourceManager Page"
[before-theme]:images/oe-studio-resman/start_page.PNG "Before Theme"
[after-theme]:images/oe-studio-resman/new_theme.PNG "After Theme"
[non-admin]:images/oe-studio-resman/non_admin.PNG "Non Admin"
[customising-theme]:images/oe-studio-resman/customising_theme.PNG "Customising Theme"
[customising-theme1]:images/oe-studio-resman/customising_theme1.PNG "Customising Step1"
[customising-theme2]:images/oe-studio-resman/customising_theme2.PNG "Customising Step2"
[customising-theme3]:images/oe-studio-resman/customising_theme3.PNG "Customising Step3"