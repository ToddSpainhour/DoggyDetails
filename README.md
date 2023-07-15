# DoggyDetails
 

### **<u>Needed Environments</u>** 

.NET Core 

Visual Studio

Visual Studio Code 

SQL Server 

Azure Data Studio or SQL Server Management Studio <br><br>


### **<u>Needed Libraries or Resources</u>** 

Live Server for VS Code (or equivalent) <br><br> 

### **<u>Process to Run it</u>** 

First load up the `.bak` file into Azure Data Studio (or SQL Server Management Studio). 
https://github.com/ToddSpainhour/DoggyDetails/tree/main/SQL


The server should be `localhost` and the database name will be `DoggyDetails`. 

Create a new query and `SELECT * FROM [Owner]` to confirm everything is running as expected 

Next, open the file named `DoggyDetails.sln` file in Visual Studio and run the projet.  
https://github.com/ToddSpainhour/DoggyDetails/tree/main/DoggyDetails 

This should open a browser window that displays all the API endpoints in the project via Swagger.  
https://localhost:7260/swagger/index.html 

Now open index.html in Visual Studio Code and run Live Server (or equivalent) and go to the following url. 

http://127.0.0.1:5500/DoggyDetails.ui/ 
or 
http://localhost:5500/DoggyDetails.ui/  <br><br>

### **<u>Port Numbers**</u>

Frontend Port Number: 5500     

Backend Port Number: 7260   