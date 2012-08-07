wsq.controls.repeater = function (template, data, parent) {
	var self = this;
	var uo = ko.utils.unwrapObservable;
	wsq.controls.build(self)(wsq.extenders.base, parent);

	self.template = template;
	self.data = data;
	self.type = "repeater";
	self.viewTemplate = wsq.provider.parse(self.template.viewTemplate || "repeater", self.data, self);
	self.configMinHeight = wsq.provider.parse(self.template.minHeight, self.data, self);
	self.configMinWidth = wsq.provider.parse(self.template.minWidth, self.data, self);
	self.root = self.parent.root;
	self.id = self.root.getControlId();
	self.dimensions = new wsq.dimensions(self, parent.dimensions);
	self.items = ko.observableArray();
	var old = [];

	self.repeatSource = wsq.provider.parse(self.template.repeatSource, self.data, self);


	function subscriptionFunc(arr) {
		var differences = ko.utils.compareArrays(old, arr);
		var arrPos = 0;
		var itemsPos = 0;
		ko.utils.arrayForEach(differences, function (difference) {
			if (difference.status === "added" || difference.status === "retained") {
				var x = arr[arrPos];
				if (!x) {
					return;
				}

				if (difference.status === "added") {
					self.items.splice(itemsPos, 1, self.createItem(x));
				}

				arrPos++;
				itemsPos++;
			}
			else if (difference.status === "deleted") {
				self.items.splice(itemsPos, 1);
			}
		});

		old = arr;
	}

	if (self.repeatSource) {
		self.repeatSource.subscribe(subscriptionFunc);
	}


	self.createItem = function (data) {
		var self = this;
		var item = {};
		item.template = self.template;
		item.data = data;
		wsq.controls.build(item)(wsq.extenders.base, self)(wsq.extenders.container);
		self.root = self.parent.root;
		wsq.controls.createControls.call(self, item.controls, template.controls, item.data);
		return item;
	};

	if (self.repeatSource) {
		subscriptionFunc(uo(self.repeatSource));
	}
}