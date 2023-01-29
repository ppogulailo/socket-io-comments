# Instructions to run the Project 

## With Docker
Add an environment file to the project 
Add a .env file in the server, client folder (at the top of your server, client folder, so nest can find it)
 - add your own REACT_APP_RECAPTCHA_SECRET in the .env file on client
 - add your own RECAPTCHA_SECRET in the .env file on server
Command:  
`docker-compose up`  
and then visit `localhost:3000`

### Tipps & Tricks for docker
If you need to remove docker images or containers you can use one of the following commands.

Command to remove all images:  
`docker rmi -f $(docker images -a -q)`

Command to remove all containers:  
`docker rm -vf $(docker ps -a -q)`


## Without Docker
### 2. Add an environment file to the project
Add a .env file in the api folder (at the top of your api folder, so nest can find it)  
 - add your own DATABASE_URL in the .env file
 - add your own JWT_REFRESH_SECRET in the .env file
 - add your own JWT_ACCESS_SECRET in the .env file
 - add your own RECAPTCHA_SECRET in the .env file
 
Add a .env file in the client folder (at the top of your client folder)  
 - add your own DATABASE_URL in the .env file
 - add your own JWT_REFRESH_SECRET in the .env file
 - add your own JWT_ACCESS_SECRET in the .env file
 - add your own REACT_APP_RECAPTCHA_SECRET in the .env file


Example of file: 
    DATABASE_URL=<your url>  
    JWT_REFRESH_SECRET=jklasjdoij897231na
    JWT_ACCESS_SECRET=jklasjdoij897231na


### Start the Backend in dev Mode after you added the .env file
`cd api`  
`npm install`  
`npm start`
  
### Start the Frontend in dev Mode after you added the .env file
`cd frontend`    
`npm install`  
`npm start`

etc. would be great.
