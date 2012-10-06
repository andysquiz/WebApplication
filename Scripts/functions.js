wsq.functions = {
    join: function (arguments, data) {
        var a = arguments;
        return ko.computed(function () {
            var args = ko.utils.unwrapObservable(a);
            var output = [];
            for (var i = 0; i < args.length; i++) {
                var item = ko.utils.unwrapObservable(args[i]);
                output = output.concat(item);
            }

            return output;
        });
    },
    controlitems: function (arguments, data) {
        var a = arguments;
        return ko.computed(function () {
            var args = ko.utils.unwrapObservable(a);
            var items = ko.utils.unwrapObservable(args[0]);
            var template = ko.utils.unwrapObservable(args[1]);
            if (!items.length) {
                return [];
            }

            var outputItems = [];
            for (var i = 0; i < items.length; i++) {
                var newItem = ko.observable({
                    data: items[i],
                    template: template
                })

                outputItems.push(newItem);
            }

            return outputItems;
        });
    },
    controlitem: function (arguments, data, controlContext) {
        var a = arguments;
        return ko.computed({
            read: function () {
                var args = ko.utils.unwrapObservable(a);
                var item = wsq.provider.parse(args[0], data, controlContext);
                if (!item) {
                    return {};
                }

                var template = wsq.provider.parse(args[1], ko.utils.unwrapObservable(item), controlContext);

                if (!template) {
                    return { controls: [] };
                }

                return newItem = {
                    data: ko.utils.unwrapObservable(item),
                    template: wsq.provider.parse("#.templates." + template, null, controlContext)
                };
            },
            deferEvaluation: true
        });
    }
}