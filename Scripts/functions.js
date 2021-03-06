﻿wsq.functions = {
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
                    return { controls: [], cssClasses: null };
                }

                return newItem = {
                    data: ko.utils.unwrapObservable(item),
                    template: wsq.provider.parse("#.templates." + template, null, controlContext)
                };
            },
            deferEvaluation: true
        });
    },
    switchval: function (arguments, data, controlContext) {
        var a = arguments;
        return ko.computed(function () {
            var args = ko.utils.unwrapObservable(a);
            var input = ko.utils.unwrapObservable(wsq.provider.parse(args[0], data, controlContext));
            var set = ko.utils.unwrapObservable(wsq.provider.parse(args[2], data, controlContext));
            if (input && typeof (set) === "object") {
                if (set[input[args[1]]]) {
                    return ko.utils.unwrapObservable(wsq.provider.parse(set[input[args[1]]], data, controlContext));
                }
            }

            return null;
        });
    },
    indirectval: function (arguments, data, controlContext) {
        var a = arguments;
        return ko.computed(function () {
            var args = ko.utils.unwrapObservable(a);
            var input = ko.utils.unwrapObservable(wsq.provider.parse(args[0], data, controlContext));
            if (input && input[args[1]]) {
                return ko.utils.unwrapObservable(wsq.provider.parse(input[args[1]], data, controlContext));
            }
            return null;
        });
    }
}