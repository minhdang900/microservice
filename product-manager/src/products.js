var plugin = function (options) {
    var seneca = this;
    /**
    * Fetch the list of all the products.
    */
    seneca.add({ area: "product", action: "fetch" }, function (args,
        done) {
        var products = this.make("products");
        products.list$({}, done);
    });
    /**
    * Fetch the list of products by category.
    */
    seneca.add({
        area: "product", action: "fetch", criteria:
            "byCategory"
    }, function (args, done) {
        var products = this.make("products");
        products.list$({ category: args.category }, done);
    });
    /**
    * Fetch a product by id.
    */
    seneca.add({ area: "product", action: "fetch", criteria: "byId" },
        function (args, done) {
            var product = this.make("products");
            product.load$(args.id, done);
        });
    /**
    * Adds a product.
    */
    seneca.add({ area: "product", action: "add" }, function (args,
        done) {
        var products = this.make("products");
        products.category = args.category;
        products.name = args.name;
        products.description = args.description;
        products.category = args.category;
        products.price = args.price
        products.save$(function (err, product) {
            done(err, products.data$(false));
        });
    });
    /**
    * Removes a product by id.
    */
    seneca.add({ area: "product", action: "remove" }, function (args,
        done) {
        var product = this.make("products");
        product.remove$(args.id, function (err) {
            done(err, null);
        });
    });
    /**
    * Edits a product fetching it by id first.
    */
    seneca.add({ area: "product", action: "edit" }, function (args,
        done) {
        seneca.act({
            area: "product", action: "fetch", criteria:
                "byId", id: args.id
        }, function (err, result) {
            result.data$(
                {
                    name: args.name,
                    category: args.category,
                    description: args.description,
                    price: args.price
                }
            );
            result.save$(function (err, product) {
                done(err, product.data$(false));
            });
        });
    });
}
module.exports = plugin;