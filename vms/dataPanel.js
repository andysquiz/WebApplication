wsq.controls.datapanel = function (template, data, parent) {
	var self = this;
	var uo = ko.utils.unwrapObservable;
	wsq.controls.build(self)(wsq.extenders.base, parent);

	self.template = template;
	self.data = data;
	self.type = "datapanel";
	self.dataSource = wsq.provider.parse(self.template.dataSource, self.data, self);
	self.viewTemplate = wsq.provider.parse(self.template.viewTemplate || "datapanel", self.data, self);
	self.configMinHeight = wsq.provider.parse(self.template.minHeight, self.data, self);
	self.configMinWidth = wsq.provider.parse(self.template.minWidth, self.data, self);
	self.cssClasses = wsq.utils.style.createClassObject(wsq.provider.parse(self.template.classes || {}, self.data, self), null);
	self.root = self.parent.root;
	self.id = self.root.getControlId();
	self.dimensions = new wsq.dimensions(self, parent.dimensions, true);
	self.control = ko.observable();

	function subFunc(newVal) {
		if (newVal) {
			newVal.viewTemplate = "datapanelitem";
			self.control(newVal);
		}
	}

	self.dataSource.subscribe(subFunc);
	subFunc(self.dataSource());
}