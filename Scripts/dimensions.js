wsq.dimensions = function (obj, parent, max) {
	var self = this;
	var storedHeight = ko.observable(null);
	var storedWidth = ko.observable(null);
	self.height = ko.computed({
		read: function () {
			var minHeight = null;
			//var minHeight = obj.configMinHeight ? ko.utils.unwrapObservable(obj.configMinHeight) : null;
			var tempHeight;
			if (obj.configHeight && obj.configHeight()) {
				switch (wsq.utils.str.getConfigValueType(obj.configHeight())) {
					case "px":
						return obj.configHeight();
					case "%":
						tempHeight = wsq.utils.sizing.getPercentValue(obj.configHeight(), parent.height());
						return (minHeight && parseInt(tempHeight) < parseInt(minHeight) ? minHeight : tempHeight) + "px";
				}
			}
			else if (max) {
				tempHeight = parent.height();
				return (minHeight && parseInt(tempHeight) < parseInt(minHeight) ? minHeight : tempHeight) + "px";
			}
			else {
				return storedHeight();
			}
		},
		write: function (value) {
			storedHeight(typeof (value) == "function" ? parseInt(value()) : value);
		}
	});

	self.width = ko.computed({
		read: function () {
			//var minWidth = obj.configMinWidth ? ko.utils.unwrapObservable(obj.configMinWidth) : null;
			var minWidth = null;
			var tempWidth;
			if (obj.configWidth && obj.configWidth()) {
				switch (wsq.utils.str.getConfigValueType(obj.configWidth())) {
					case "px":
						return obj.configWidth();
					case "%":
						tempWidth = wsq.utils.sizing.getPercentValue(obj.configWidth(), parent.width());
						return (minWidth && parseInt(tempWidth) < parseInt(minWidth) ? minWidth : tempWidth) + "px";
				}
			}
			else if (max) {
				tempWidth = parent.width();
				return (minWidth && parseInt(tempWidth) < parseInt(minWidth) ? minWidth : tempWidth) + "px";
			}
			else {
				return storedWidth();
			}
		},
		write: function (value) {
			storedWidth(typeof (value) == "function" ? value() : value);
		}
	});

	self.setRenderDimensions = function (el) {
		var w, h;
		w = parseInt($(el).width());
		h = parseInt($(el).height());
		storedWidth(w + "px");
		storedHeight(h + "px");
	}
}
