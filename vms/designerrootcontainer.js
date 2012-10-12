wsq.controls.designerrootcontainer = function (template, data, parent) {
	var uo = ko.utils.unwrapObservable;
	var self = this;
	self.template = uo(template);
	self.data = uo(data);
	wsq.controls.build(self)(wsq.extenders.base, parent)(wsq.extenders.container);

	self.orientation = wsq.provider.parse(self.template.orientation || "vertical", self.data, self);
	self.type = "designerrootcontainer";
	self.viewTemplate = wsq.provider.parse(self.template.viewTemplate || "designerrootcontainer", self.data, self);
	self.root = self.parent.root;
	self.id = self.root.getControlId();
	self.dimensions = new wsq.dimensions(self, parent.dimensions);
	self.isControl = true;

	if (typeof (self.template.controls) != "undefined") {
		wsq.controls.createControls.call(self, self.controls, self.template.controls, self.data, self);
	}

	self.drop = function (ev) {
		var dt = ev.originalEvent.dataTransfer;
		var type = dt.getData("type");
		var text = dt.getData("text");
		self.controls.push(new wsq.controls[type]({}, self.data, self));
	}

	self.hover = function (e) {
		if (self.options && self.options.infoData && self.options.infoData.hoverControl) {
			var path = "";
			var ctl = self;
			while (ctl && ctl.isControl) {
				if (path != "") {
					path = " > " + path;
				}
				path = ctl.type + path;
				ctl = ctl.parent;
			}

			self.options.infoData.hoverControl(path);
			e.stopPropagation();
		}
	}
}