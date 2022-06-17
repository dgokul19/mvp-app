
# MVP APP 

MVP is a Simple MERN application used to manage employee details.

## Built in Technologies

* Client Side 
    - React Js
    - Material UI
    - Sass

* Server Side
    - Node Js
    - Express Js
    - Mongoose


( Note: Due to frequent api access issue happened in the provided endpoint, I have worked on REST API using node server )


## Getting Started

To run the application locally, You need to clone application in to your machine. 

Before started, You need to have 
    
    Node ( Mandatory )
    
    MongoDB ( Or point your DB connection url in server.js file) in your machine.

- Open the terminal,( Go to preferred location to have your application in local.)

```bash 
            1) git clone https://github.com/dgokul19/mvp-app.git

            2) cd mvp-app

```
## Installation

Install mvp-app with npm

```bash
  npm install
```

## Usage

Start your application using following commands

```bash
    Node App : npm run server

    above command should start the node application in 8080 port.  If you need to run the application in any other port 
    please change in ( server.js file ) with new port number.

    In case, if you changed the Node Server Port, You have to change the connection URL in following file in client side.
    
    src/client/Util/constants.js 


    React App: npm start

    Your application should be started and run in PORT 3000. ( http://localhost:3000 ).
```
## Documentation
Below features has been covered as part of this application.

- File Upload ( Multiple File )
- Employee Dashboard ( Pagination, Sorting, Filtering )
- Employee CRUD Operation.


On starting the react application should get you to 

Image 1 : 

[![hkibZx.md.png](https://iili.io/hkibZx.md.png)](https://freeimage.host/i/hkibZx)



### 1. File Upload ( CSV file )

* You can able to select multiple file.
* If your file is greater than **2MB** and any other format than **text/csv**, it will be automatically omitted.
* Selected file will be shown in the UI. (See Below Image)

Image 2 :

[![hksqZv.md.png](https://iili.io/hksqZv.md.png)](https://freeimage.host/i/hksqZv)

You can able to remove, unwanted files.
* OnClick Upload button will upload the csv file into database. and the status of uploading will be shown like below image.
Image 3 :

[![hkszFI.md.png](https://iili.io/hkszFI.md.png)](https://freeimage.host/i/hkszFI).

* If upload is successfully, the employees details in csv file will be automatically reflected in the employees table.
* In case of error, you will get notified which file is error in the UI.

### 2. Employee Dashboard

*   In default 5 employee record will be displayed in the table, Can able to change in bottom of the table.

*   Supports filtering based on salary range on input field top the table.

( Note: For Initial Load of employee details, i have used some mock data from the given endpoint from `beeceptor.com` )

### 3. Dashboard CRUD Feature

* Can able to edit name, login, and salary details, employee_id is non editable. On succesful edit, it will be automatically reflects in the UI.

* Can able to delete the record,On succesful edit, it will be automatically reflects in the UI.

## Author

- [@dgokul19](https://www.github.com/dgokul19)

