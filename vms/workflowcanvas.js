wsq.controls.workflowcanvas = function (template, data, parent) {
	var self = this;
	var uo = ko.utils.unwrapObservable;
	wsq.controls.build(self)(wsq.extenders.base, parent)(wsq.extenders.container);

	self.template = template;
	self.data = data;
	self.type = "workflowcanvas";
	self.viewTemplate = wsq.provider.parse(self.template.viewTemplate || "fillcanvas", self.data, self);
	self.configMinHeight = wsq.provider.parse(self.template.minHeight, self.data, self);
	self.configMinWidth = wsq.provider.parse(self.template.minWidth, self.data, self);
	self.cssClasses = wsq.utils.style.createClassObject(wsq.provider.parse(self.template.classes || {}, self.data, self), null);
	self.root = self.parent.root;
	self.id = self.root.getControlId();
	self.dimensions = new wsq.dimensions(self, parent.dimensions, true);

	if (typeof (self.template.controls) != "undefined") {
		wsq.controls.createControls.call(self, self.controls, self.template.controls, self.data, self);
	}
}