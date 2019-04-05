var express = require("express");
var bodyParser = require('body-parser');
var senecaEmailer = require("seneca")().client({
    host: "192.168.0.2",
    port: 8080
});
var senecaProductManager = require("seneca")().client({
    host: "192.168.0.3",
    port: 8080
});
var senecaOrderProcessor = require("seneca")().client({
    host: "192.168.0.4",
    port: 8080
});
function api(options) {
    var seneca = this;
    /**
    * Gets the full list of products
    [ 113 ]
    */
    seneca.add({ area: "ui", action: "products" }, function (args,
        done) {
        // More code to come
    });
    /**
    * Get a product by id
    */
    seneca.add({ area: "ui", action: "productbyid" }, function (args,
        done) {
        // More code to come
    });
    /**
    * Creates an order
    */
    seneca.add({ area: "ui", action: "createorder" }, function (args,
        done) {
        // More code to come
    });
    this.add("init:api", function (msg, respond) {
        seneca.act('role:web', {
            use: {
                prefix: '/api',
                pin: 'area:ui,action:*',
                map: {
                    products: { GET: true },
                    productbyid: { GET: true, suffix: '/:id' },
                    createorder: { POST: true }
                }
            }
        }, respond)
    });
}
module.exports = api;