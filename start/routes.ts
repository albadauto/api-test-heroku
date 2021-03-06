/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'teste' }
  })

  Route.group(() => {
    Route.post("/registerUser", "UsersController.createNewUser");
    Route.post("/authenticate", "AuthController.verifyLogin");
    Route.get("/findUserById/:id", "UsersController.findUserById")
  }).prefix("user")

  Route.resource("/properties", "PropertiesController").apiOnly();
  Route.get("/findAllPropertiesWithUser", "PropertiesController.findAllWithUser")
  Route.get("/findAllPropertiesIdUser/:id", "PropertiesController.findAllPropertiesIdUser");
  Route.delete("/deleteProperty/:id", "PropertiesController.deleteProperty");

  Route.group(() => {
    Route.post("/recoverPass", "RecoversController.recoverPass")
    Route.post("/verifyCode", "RecoversController.verifyCode")

  }).prefix("Recover")

  
}).prefix("api");

