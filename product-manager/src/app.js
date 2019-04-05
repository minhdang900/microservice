var seneca = require("seneca")();
seneca.use(plugin);
seneca.use("mongo-store", {
    name: "seneca",
    host: "127.0.0.1",
    port: "27017"
});
seneca.ready(function (err) {
    seneca.act('role:web', {
        use: {
            prefix: '/products',
            pin: { area: 'product', action: '*' },
            map: {
                fetch: { GET: true },
                edit: { GET: false, POST: true },
                delete: { GET: false, DELETE: true }
            }
        }
    });
    var express = require('express');
    var app = express();
    app.use(require("body-parser").json());
    // This is how you integrate Seneca with Express
    app.use(seneca.export('web'));
    app.listen(3000);
});