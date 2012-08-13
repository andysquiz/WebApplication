wsq.functions = {
    join: function (arguments, data) {

    },
    controlitems: function (arguments, data) {
        var a = arguments;
        return ko.computed(function () {
            var newItem = { args: a };
            return newItem;
        });
    }
}