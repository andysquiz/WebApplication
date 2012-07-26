wsq.controls.layout = function (template, data, parent) {
	var self = this;
	wsq.controls.build(self)(wsq.extenders.base, parent);

	self.template = template;
	self.data = data;
	self.type = "layout";
	self.viewTemplate = "layout";
	self.configMinHeight = ko.observable(self.template.minHeight);
	self.configMinWidth = ko.observable(self.template.minWidth);
	self.root = self.parent.root;
	self.id = self.root.getControlId();
	self.invertLeftRight = wsq.provider.parse(self.template.invertLeftRight, self.data || false);
	self.invertTopBottom = wsq.provider.parse(self.template.invertTopBottom, self.data || false);
	self.dimensions = new wsq.dimensions(self, parent.dimensions, true);

	self.top = {
		parent: self,
		root: self.root,
		configHeight: ko.observable(self.template.top.height),
		configMinHeight: ko.observable(self.template.top.minHeight),
		collapsible: ko.observable(self.template.top.collapsible),
		collapsed: ko.observable(self.template.top.collapsed),
		id: self.root.getControlId(),
		controls: ko.observableArray()
	}
	self.top.dimensions = new wsq.dimensions(self.top, self.dimensions);
	self.bottom = {
		parent: self,
		root: self.root,
		configHeight: ko.observable(self.template.bottom.height),
		collapsible: ko.observable(self.template.bottom.collapsible),
		collapsed: ko.observable(self.template.bottom.collapsed),
		id: self.root.getControlId(),
		controls: ko.observableArray()
	}
	self.bottom.dimensions = new wsq.dimensions(self.bottom, self.dimensions);
	self.right = {
		parent: self,
		root: self.root,
		configWidth: ko.observable(self.template.right.width),
		collapsible: ko.observable(self.template.right.collapsible),
		collapsed: ko.observable(self.template.right.collapsed),
		id: self.root.getControlId(),
		controls: ko.observableArray()
	}
	self.right.dimensions = new wsq.dimensions(self.right, self.dimensions);
	self.left = {
		parent: self,
		root: self.root,
		configWidth: ko.observable(self.template.left.width),
		collapsible: ko.observable(self.template.left.collapsible),
		collapsed: ko.observable(self.template.left.collapsed),
		id: self.root.getControlId(),
		controls: ko.observableArray()
	}
	self.left.dimensions = new wsq.dimensions(self.left, self.dimensions);
	self.middle = {
		parent: self,
		root: self.root,
		id: self.root.getControlId(),
		controls: ko.observableArray()
	}
	self.middle.dimensions = new wsq.dimensions(self.middle, self.dimensions);

	self.topCollapser = {
		parent: self,
		root: self.root,
		id: self.root.getControlId(),
		viewTemplate: self.template.topCollapser.viewTemplate,
		toggleCollapse: function () {
			self.top.collapsed(!self.top.collapsed());
		}
	}
	self.topCollapser.dimensions = new wsq.dimensions(self.topCollapser, self.dimensions);

	self.bottomCollapser = {
		parent: self,
		root: self.root,
		id: self.root.getControlId(),
		viewTemplate: self.template.bottomCollapser.viewTemplate,
		toggleCollapse: function () {
			self.bottom.collapsed(!self.bottom.collapsed());
		}
	}
	self.bottomCollapser.dimensions = new wsq.dimensions(self.bottomCollapser, self.dimensions);

	self.leftCollapser = {
		parent: self,
		root: self.root,
		configWidth: ko.observable(self.template.leftCollapser.width),
		id: self.root.getControlId(),
		viewTemplate: self.template.leftCollapser.viewTemplate,
		toggleCollapse: function () {
			self.left.collapsed(!self.left.collapsed());
		}
	}
	self.leftCollapser.dimensions = new wsq.dimensions(self.leftCollapser, self.dimensions);

	self.rightCollapser = {
		parent: self,
		root: self.root,
		configWidth: ko.observable(self.template.rightCollapser.width),
		id: self.root.getControlId(),
		viewTemplate: self.template.rightCollapser.viewTemplate,
		toggleCollapse: function () {
			self.right.collapsed(!self.right.collapsed());
		}
	}
	self.rightCollapser.dimensions = new wsq.dimensions(self.rightCollapser, self.dimensions);

	self.middleHeight = ko.computed(function () {
		var newHeight = parseInt(self.dimensions.height())
            - (self.top.collapsed() ? 0 : parseInt(self.top.dimensions.height()))
            - (self.bottom.collapsed() ? 0 : parseInt(self.bottom.dimensions.height()))
            - (self.top.collapsible() ? parseInt(self.topCollapser.dimensions.height()) : 0)
            - (self.bottom.collapsible() ? parseInt(self.bottomCollapser.dimensions.height()) : 0);
		return newHeight + "px";
	});
	self.middleHeight.subscribe(function (value) {
		self.middle.dimensions.height(value);
	});
	self.middle.dimensions.height(self.middleHeight());

	self.middleWidth = ko.computed(function () {
		var newWidth = parseInt(self.dimensions.width())
            - (self.left.collapsed() ? 0 : parseInt(self.left.dimensions.width()))
            - (self.right.collapsed() ? 0 : parseInt(self.right.dimensions.width()))
            - (self.left.collapsible() ? parseInt(self.leftCollapser.dimensions.width()) : 0)
            - (self.right.collapsible() ? parseInt(self.rightCollapser.dimensions.width()) : 0);
		return newWidth + "px";
	});
	self.middleWidth.subscribe(function (value) {
		self.middle.dimensions.width(value);
	});
	self.middle.dimensions.width(self.middleWidth());
}