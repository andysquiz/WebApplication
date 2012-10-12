wsq.controls.workflowcanvas = function (template, data, parent) {
	var self = this;
	var uo = ko.utils.unwrapObservable;
	self.template = uo(template);
	self.data = uo(data);
	self.type = "workflowcanvas";
	self.canvas = new wsq.canvas.manager(self);

	wsq.controls.build(self)(wsq.extenders.base, parent)(wsq.extenders.container)(wsq.extenders.childOptions, { canvas: self.canvas });


	self.viewTemplate = wsq.provider.parse(self.template.viewTemplate || "fillcanvas", self.data, self);
	self.configMinHeight = wsq.provider.parse(self.template.minHeight, self.data, self);
	self.configMinWidth = wsq.provider.parse(self.template.minWidth, self.data, self);
	self.cssClasses = wsq.utils.style.createClassObject(wsq.provider.parse(self.template.classes || {}, self.data, self), null);
	self.root = self.parent.root;
	self.id = self.root.getControlId();
	self.dimensions = new wsq.dimensions(self, parent.dimensions, true);
	self.mousePosition = {
		x: ko.observable(-1),
		y: ko.observable(-1)
	}
	self.mousePosition.x.subscribe(function (newval) {
		if (self.options && self.options.infoData && self.options.infoData.mousePosition) {
			self.options.infoData.mousePosition.x(newval);
		}
	});
	self.mousePosition.y.subscribe(function (newval) {
		if (self.options && self.options.infoData && self.options.infoData.mousePosition) {
			self.parent.mousePosition.y(newval);
		}
	});

	self.drop = function (ev) {
		var dt = ev.originalEvent.dataTransfer;
		var type = dt.getData("type");
		var text = dt.getData("text");
		self.controls.push(new wsq.controls[type]({}, self.data, self));
		self.canvas.render();
	}


	self.context = ko.observable(null);
	self.context.subscribe(function (newVal) {
		self.canvas.setContext(newVal);
	});

	self.canvasData = {
		objectCache: [],
		testText: ko.computed(function () {
			return "x:" + self.mousePosition.x() + ", y:" + self.mousePosition.y();
		})
	}

	if (typeof (self.template.controls) != "undefined") {
		wsq.controls.createControls.call(self, self.controls, self.template.controls, self.data, self);
	}
}