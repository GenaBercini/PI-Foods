<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Food

<p align="right">
  <img height="200" src="./cooking.png" />
</p>

## About
This project consists of the development of S.P.A (Single Page Application), that uses data from spoonacular's API  and it's own relational database. This allows the user to have available the information of all the recipes, and the user can search for recipes, sort them alphabetically and by score, filter by type of diet, create new recipes and delete them.

## Objetives

- Filter recipes by diet
- Order by score and alphabet
- Find, creat and delete recipes

## Stack of Technologies

### Frontend: 
HTML, CSS, Javascript, React, Redux
### Backend: 
NodeJS, Express, Sequelize
### Database: 
PostgreSQL
### Deploy: `https://foods-page.vercel.app/`

## BoilerPlate

The boilerPlate has two folders: `api` and `client`.

Inside `api` you must have to create a file called: `.env` 
that has the following form: 

```
DB_USER=db_user_name
DB_PASSWORD=db_user_password
DB_HOST=localhost
DB_NAME=db_name
PORT=port
API_KEY=api_key
```
You have to replace `api_key`, with your key generated on the page `https://spoonacular.com/food-api/console#Dashboard` with your user.

Inside `client` you must have to create a file called: `.env` 
that has the following form: 

```
REACT_APP_API="http://localhost:PORT"
```
PORT must be the same as api.

## Next 
### _Connect the data base_

 - Go to your postgres database manager and create a new   database. Replace all `.env` information with database information

 ### _Install the necesary package to run it_

- Open the project console
    + Inside `api` folder, run the command line, `npm install`.
    + Inside `client` folder, run the command line, `npm install`.

### _Run the project_

- Open the project console
    + Inside `api` folder, run the command line, `npm start`.
        
    + Inside `client` folder, run the command line, `npm start` and go to `http://localhost:3000/`. 

## Project Screens
<p align="center">Landing Page</p>
<p align="center">
<a href='https://pi-food-six.vercel.app/' width='30%'/><img src='https://user-images.githubusercontent.com/86481813/167896551-3e477602-6ae5-48a8-a0ce-bbc368761090.png' width='75%'/></a>
<a href="https://pi-food-six.vercel.app/"><img src='https://user-images.githubusercontent.com/86481813/167896680-e6407325-97d8-44f0-b011-077d468012d3.png' width='18%'/></a>
</p>
<p align="center">Home</p>
<p align="center">
<a href='https://pi-food-six.vercel.app/' width='30%'/><img src='https://user-images.githubusercontent.com/86481813/167898070-fa4ab854-f047-48b8-bd0a-226f62f916f2.png' width='75%'/></a>
<a href="https://pi-food-six.vercel.app/"><img src='https://user-images.githubusercontent.com/86481813/167898174-8a45cb6a-c2a8-427c-8d0c-1afd22931b61.png' width='18%'/></a>
</p>
<p align="center">Details</p>
<p align="center">
<a href='https://pi-food-six.vercel.app/' width='30%'/><img src='https://user-images.githubusercontent.com/86481813/167898907-7bfba723-9899-4453-8c9e-befe0bfa3dd3.png' width='75%'/></a>
<a href="https://pi-food-six.vercel.app/"><img src='https://user-images.githubusercontent.com/86481813/167898813-a4241f55-2ee1-4340-84dd-666b70d4de41.png' width='18%'/></a>
</p>
<p align="center">Form</p>
<p align="center">
<a href='https://pi-food-six.vercel.app/' width='30%'/><img src='https://user-images.githubusercontent.com/86481813/167899045-55f2e764-cd02-45cf-bae0-a61df512ef8f.png' width='75%'/></a>
<a href="https://pi-food-six.vercel.app/"><img src='https://user-images.githubusercontent.com/86481813/167899149-136d7046-2cda-4245-9a14-0bc9ca551645.png' width='18%'/></a>
</p>
<p align="center">
<a href='https://pi-food-six.vercel.app/' width='30%'/><img src='https://user-images.githubusercontent.com/86481813/167899374-18b1b9f0-62a1-4b28-ad48-457146d7bd80.png' width='75%'/></a>
<a href="https://pi-food-six.vercel.app/"><img src='https://user-images.githubusercontent.com/86481813/167899338-534d520f-95dd-4578-9a26-79003d847b27.png' width='18%'/></a>
</p>
