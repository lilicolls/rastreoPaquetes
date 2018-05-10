# Tracking system -- Sistema de rastreo de encomiendas 

Web application created to track packages in real time.
Every truck have an GPS inside connected with an Arduino UNO that send it's location every minute to firebase database. Web application consume that data so the user (client or supervisor) can check the location of the package in real time.
Also, if the user is logged as a supervisor can list every package or look an especific one filtering by the package id.

## Built With
 - Javascript
 - [Firebase services (Database, Authentication and Hosting)](https://firebase.google.com/)
 - Google Maps API -Used to show graphic location to the user

## Screenshots 

![login](https://github.com/lilicolls/rastreoPaquetes/blob/master/docs/images/login.jpg)

![principal-page](https://github.com/lilicolls/rastreoPaquetes/blob/master/docs/images/principal.jpg)

![filterById](https://github.com/lilicolls/rastreoPaquetes/blob/master/docs/images/filter.jpg)

![Description](https://github.com/lilicolls/rastreoPaquetes/blob/master/docs/images/detail2.jpg)

## Authors
- **Liliana Colls**

## License
This project is licensed under the **MIT** License
