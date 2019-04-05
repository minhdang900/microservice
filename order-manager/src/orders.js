var plugin = function (options) {
    var seneca = this;
    seneca.add({ area: "orders", action: "fetch" }, function (args,
        done) {
        var orders = this.make("orders");
        orders.list$({ id: args.id }, done);
    });
    seneca.add({ area: "orders", action: "delete" }, function (args,
        done) {
        var orders = this.make("orders");
        orders.remove$({ id: args.id }, function (err) {
            done(err, null);
        });
    });
}
module.exports = plugin;
