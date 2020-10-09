const express = require("express");
const serverConfig = require("./config/serverSettings");
const routesDefiniton  = require("./routes/routes-definition");
const errorHandler = require("./routes/error-handler").errorRouteHandler;
const notFoundRoute = require("./routes/not-found");

const app = express();

//use defaults
app.use(serverConfig());
app.use(routesDefiniton(app));

//ALL OTHER ROUTES SHOULD TRIGGER A 404 RESPONSE
app.all('*', notFoundRoute);

//GENERAL ROUTES ERROR HANDLER
app.use(errorHandler);

/*
 * Define localhost port
 * Use app engine's specified port or 3500(locally)
 */
const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}...`);
});
