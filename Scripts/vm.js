wsq = {};
wsq.utils = {};
wsq.controls = {};
wsq.extenders = {};

wsq.controls.createControls = function (vmArr, templateArr, data) {
	// create the controls and add them to the controls array
	var self = this;
	if (templateArr && templateArr.length) {
		for (var c = 0; c < templateArr.length; c++) {
			vmArr.push(new templateArr[c].type(templateArr[c], wsq.provider.parse(templateArr[c].data || null, data, null) || data, self));
		}
	}
}   

wsq.controls.build = function (vm) {
	var self = vm;
	var f = function () {
		if (!self.extenders) {
			self.extenders = [];
		}

		var arr = [];
		for (var a = 1; a < arguments.length; a++) {
			arr.push(arguments[a]);
		}

		var extender = arguments[0];
		self.extenders.push(extender);
		extender.apply(self, arr);
		return f;
	}
	return f;
}

wsq.extenders.base = function (parent, provider) {
	var self = this;

	self.is = function (type) {
		var self = this;
		if (self.extenders) {
			for (var e = 0; e < self.extenders.length; e++) {
				if (self.extenders[e] == type) {
					return true;
				}
			}
		}
		return false;
	}
	self.provider = provider || wsq.provider;
	self.parent = parent;

	self.options = self.parent ? self.parent.childOptions ? self.parent.childOptions : self.parent.options ? self.parent.options : null : null;
}

wsq.extenders.container = function () {
    var self = this;
    self.controls = ko.observableArray();
}

wsq.extenders.draggable = function () {
    var self = this;
    self.draggable = wsq.provider.parse(self.template.draggable || false, self.data, self, true);
    var dragData = {};
    if (self.template.dragData) {
        for (var m in self.template.dragData) {
            dragData[m] = wsq.provider.parse(self.template.dragData[m], self.data, self, true);
        }
    }
    self.dragData = dragData;
   }

wsq.extenders.childOptions = function (childOptions) {
	var self = this;
	var parentOptions = self.parent && self.parent.options ? self.parent.options : null;
	self.childOptions = $.extend({}, parentOptions, childOptions);
	return this;
}