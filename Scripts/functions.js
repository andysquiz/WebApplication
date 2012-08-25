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
	}
}