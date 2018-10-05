# Question and Answer App - REST API

#### Requirements: 
- Ensure ```node``` is installed
- Ensure mongoDB is installed and the mongo daemon is running:  ``` $ brew install mongodb && mongod ```

#### Setup
- Clone the repo by running: ```git clone https://github.com/victoriaaoka/qa-app-rest-api.git```
- Change directory into the project folder: ```$ cd qa-app-rest-api```
- Install dependencies by running the command: ```$ npm install``` 
- Start the app by running the command: ```$ node app.js``` or ```$ nodemon```
- Access the app at: ```localhost:3000``` 
- Use Postman to test the API endpoints.

### API Endpoints
| URL Endpoint | HTTP Methods | Description |
| -------- | ------------- | --------- |
| `/questions` | `GET`  | Retrieve all the questions|
| `/questions` | `POST` | Add a question |
|  `/questions/<id>` | `GET` | Retrieve a single question by ID|
| `/questions/<id>/answers` | `POST` | Add an answer to a particular question|
| `/questions/<id>/answers/<answer_id>` | `PUT` | Update a specific answer by answer_id |
| `/questions/<id>/answers/<answer_id>` | `DELETE` | Delete a specific answer by answer_id |
| `/questions/<id>/answers/<answer_id>/vote-<up/down>` | `POST` | Vote for a specific answer by answer_id|