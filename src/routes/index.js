const express = require("express");
const series_router = require("./series.route");


function routerApi(app){
    const routes = express.Router();
    routes.use("/series",series_router);
    app.use("/api/v1", routes); /* endpoint http://localhost:3000/api/v1 */
}

module.exports = routerApi;
