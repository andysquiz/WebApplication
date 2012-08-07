wsq.controls.expander = function (template, data, parent) {
	var self = this;
	var uo = ko.utils.unwrapObservable;
	wsq.controls.build(self)(wsq.extenders.base, parent);

	self.template = template;
	self.data = data;
	self.type = "expander";
	self.viewTemplate = wsq.provider.parse(self.template.viewTemplate || "expander", self.data, self);
	self.configMinHeight = wsq.provider.parse(self.template.minHeight, self.data, self);
	self.configMinWidth = wsq.provider.parse(self.template.minWidth, self.data, self);
	self.collapsed = wsq.provider.parse(self.template.collapsed || false, self.data, self, true);
	self.cssHeaderClasses = wsq.utils.style.createClassObject(wsq.provider.parse(self.template.headerClasses || {}, self.data, self), self.collapsed);
	self.cssSelectorClasses = wsq.utils.style.createClassObject(wsq.provider.parse(self.template.selectorClasses || {}, self.data, self), self.collapsed);
	self.cssContentClasses = wsq.utils.style.createClassObject(wsq.provider.parse(self.template.contentClasses || {}, self.data, self), null);
	self.root = self.parent.root;
	self.id = self.root.getControlId();
	self.dimensions = new wsq.dimensions(self, parent.dimensions);
	self.headerControls = ko.observableArray();
	self.contentControls = ko.observableArray();
	if (typeof (self.template.headerControls) != "undefined") {
		wsq.controls.createControls.call(self, self.headerControls, self.template.headerControls, self.data, self);
	}

	if (typeof (self.template.contentControls) != "undefined") {
		wsq.controls.createControls.call(self, self.contentControls, self.template.contentControls, self.data, self);
	}

	self.toggleCollapsed = function () {
		self.collapsed(!self.collapsed());
	}
}