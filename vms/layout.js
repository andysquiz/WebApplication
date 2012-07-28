wsq.controls.layout = function (template, data, parent) {
    var self = this;
    var uo = ko.utils.unwrapObservable;
    wsq.controls.build(self)(wsq.extenders.base, parent);

    self.template = template;
    self.data = data;
    self.type = "layout";
    self.viewTemplate = wsq.provider.parse(self.template.viewTemplate || "layout", self.data, self);
    self.configMinHeight = wsq.provider.parse(self.template.minHeight, self.data, self);
    self.configMinWidth = wsq.provider.parse(self.template.minWidth, self.data, self);
    self.root = self.parent.root;
    self.id = self.root.getControlId();
    self.invertLeftRight = wsq.provider.parse(self.template.invertLeftRight || false, self.data, self, true);
    self.invertTopBottom = wsq.provider.parse(self.template.invertTopBottom || false, self.data, self, true);
    self.dimensions = new wsq.dimensions(self, parent.dimensions, true);

    self.top = {
        parent: self,
        root: self.root,
        configHeight: wsq.provider.parse(self.template.top ? self.template.top.height || "0px" : "0px", self.data, self),
        configWidth: wsq.provider.parse(self.template.top ? self.template.top.width || "100%" : "100%", self.data, self),
        configMinHeight: wsq.provider.parse(self.template.top ? self.template.top.minHeight || null : null, self.data, self),
        collapsible: wsq.provider.parse(self.template.top ? self.template.top.collapsible || false : false, self.data, self, true),
        collapsed: wsq.provider.parse(self.template.top ? self.template.top.collapsed || false : false, self.data, self, true),
        id: self.root.getControlId(),
        controls: ko.observableArray()
    }
    self.top.dimensions = new wsq.dimensions(self.top, self.dimensions);
    if (self.template.top && typeof(self.template.top.controls) != "undefined") {
        wsq.controls.createControls.call(self.top, self.top.controls, self.template.top.controls, self.data);
    }

    self.bottom = {
        parent: self,
        root: self.root,
        configHeight: wsq.provider.parse(self.template.bottom ? self.template.bottom.height || "0px" : "0px", self.data, self),
        configWidth: wsq.provider.parse(self.template.bottom ? self.template.bottom.width || "100%" : "100%", self.data, self),
        configMinHeight: wsq.provider.parse(self.template.bottom ? self.template.bottom.minHeight || null : null, self.data, self),
        collapsible: wsq.provider.parse(self.template.bottom ? self.template.bottom.collapsible || false : false, self.data, self, true),
        collapsed: wsq.provider.parse(self.template.bottom ? self.template.bottom.collapsed || false : false, self.data, self, true),
        id: self.root.getControlId(),
        controls: ko.observableArray()
    }
    self.bottom.dimensions = new wsq.dimensions(self.bottom, self.dimensions);
    if (self.template.bottom && typeof(self.template.bottom.controls) != "undefined") {
        wsq.controls.createControls.call(self.bottom, self.bottom.controls, self.template.bottom.controls, self.data);
    }

    self.right = {
        parent: self,
        root: self.root,
        configWidth: wsq.provider.parse(self.template.right ? self.template.right.width || "0px" : "0px", self.data, self),
        configMinWidth: wsq.provider.parse(self.template.right ? self.template.right.minWidth || null : null, self.data, self),
        collapsible: wsq.provider.parse(self.template.right ? self.template.right.collapsible || false : false, self.data, self, true),
        collapsed: wsq.provider.parse(self.template.right ? self.template.right.collapsed || false : false, self.data, self, true),
        id: self.root.getControlId(),
        controls: ko.observableArray()
    }
    self.right.dimensions = new wsq.dimensions(self.right, self.dimensions);
    if (self.template.right && typeof(self.template.right.controls) != "undefined") {
        wsq.controls.createControls.call(self.right, self.right.controls, self.template.right.controls, self.data);
    }

    self.left = {
        parent: self,
        root: self.root,
        configWidth: wsq.provider.parse(self.template.left ? self.template.left.width || "0px" : "0px", self.data, self),
        configMinWidth: wsq.provider.parse(self.template.left ? self.template.left.minWidth || null : null, self.data, self),
        collapsible: wsq.provider.parse(self.template.left ? self.template.left.collapsible || false : false, self.data, self, true),
        collapsed: wsq.provider.parse(self.template.left ? self.template.left.collapsed || false : false, self.data, self, true),
        id: self.root.getControlId(),
        controls: ko.observableArray()
    }
    self.left.dimensions = new wsq.dimensions(self.left, self.dimensions);
    if (self.template.left && typeof(self.template.left.controls)!= "undefined") {
        wsq.controls.createControls.call(self.left, self.left.controls, self.template.left.controls, self.data);
    }


    self.middle = {
        parent: self,
        root: self.root,
        configMinWidth: wsq.provider.parse(self.template.middle ? self.template.middle.minWidth || null : null, self.data, self),
        configMinHeight: wsq.provider.parse(self.template.middle ? self.template.middle.minHeight || null : null, self.data, self),
        id: self.root.getControlId(),
        controls: ko.observableArray()
    }
    self.middle.dimensions = new wsq.dimensions(self.middle, self.dimensions);

    self.topCollapser = {
        parent: self,
        root: self.root,
        configHeight: wsq.provider.parse(self.template.topCollapser ? self.template.topCollapser.configHeight || "20px" : "20px", self.data, self),
        id: self.root.getControlId(),
        viewTemplate: wsq.provider.parse(self.template.topCollapser ? self.template.topCollapser.viewTemplate || "layoutTopCollapser" : "layoutTopCollapser", self.data, self),
        toggleCollapse: function () {
            self.top.collapsed(!uo(self.top.collapsed));
        }
    }
    self.topCollapser.dimensions = new wsq.dimensions(self.topCollapser, self.dimensions);

    self.bottomCollapser = {
        parent: self,
        root: self.root,
        configHeight: wsq.provider.parse(self.template.bottomCollapser ? self.template.bottomCollapser.configHeight || "20px" : "20px", self.data, self),
        id: self.root.getControlId(),
        viewTemplate: wsq.provider.parse(self.template.bottomCollapser ? self.template.bottomCollapser.viewTemplate || "layoutBottomCollapser" : "layoutBottomCollapser", self.data, self),
        toggleCollapse: function () {
            self.bottom.collapsed(!uo(self.bottom.collapsed));
        }
    }
    self.bottomCollapser.dimensions = new wsq.dimensions(self.bottomCollapser, self.dimensions);

    self.leftCollapser = {
        parent: self,
        root: self.root,
        configWidth: wsq.provider.parse(self.template.leftCollapser ? self.template.leftCollapser.configWidth || "20px" : "20px", self.data, self),
        id: self.root.getControlId(),
        viewTemplate: wsq.provider.parse(self.template.leftCollapser ? self.template.leftCollapser.viewTemplate || "layoutLeftCollapser" : "layoutLeftCollapser", self.data, self),
        toggleCollapse: function () {
            self.left.collapsed(!uo(self.left.collapsed));
        }
    }
    self.leftCollapser.dimensions = new wsq.dimensions(self.leftCollapser, self.dimensions);

    self.rightCollapser = {
        parent: self,
        root: self.root,
        configWidth: wsq.provider.parse(self.template.rightCollapser ? self.template.rightCollapser.configWidth || "20px" : "20px", self.data, self),
        id: self.root.getControlId(),
        viewTemplate: wsq.provider.parse(self.template.rightCollapser ? self.template.rightCollapser.viewTemplate || "layoutRightCollapser" : "layoutRightCollapser", self.data, self),
        toggleCollapse: function () {
            self.right.collapsed(!uo(self.right.collapsed));
        }
    }
    self.rightCollapser.dimensions = new wsq.dimensions(self.rightCollapser, self.dimensions);

    self.middleHeight = ko.computed(function () {
        var newHeight = parseInt(uo(self.dimensions.height))
            - (uo(self.top.collapsed) ? 0 : parseInt(uo(self.top.dimensions.height)))
            - (uo(self.bottom.collapsed) ? 0 : parseInt(uo(self.bottom.dimensions.height)))
            - (uo(self.top.collapsible) ? parseInt(uo(self.topCollapser.dimensions.height)) : 0)
            - (uo(self.bottom.collapsible) ? parseInt(uo(self.bottomCollapser.dimensions.height)) : 0);
        return newHeight + "px";
    });
    self.middleHeight.subscribe(function (value) {
        self.middle.dimensions.height(value);
        self.left.dimensions.height(uo(self.middle.dimensions.height));
        self.right.dimensions.height(uo(self.middle.dimensions.height));
    });
    self.middle.dimensions.height(uo(self.middleHeight) + "px");
    self.left.dimensions.height(uo(self.middle.dimensions.height));
    self.right.dimensions.height(uo(self.middle.dimensions.height));

    self.middleWidth = ko.computed(function () {
        var newWidth = parseInt(uo(self.dimensions.width))
            - (uo(self.left.collapsed) ? 0 : parseInt(uo(self.left.dimensions.width)))
            - (uo(self.right.collapsed) ? 0 : parseInt(uo(self.right.dimensions.width)))
            - (uo(self.left.collapsible) ? parseInt(uo(self.leftCollapser.dimensions.width)) : 0)
            - (uo(self.right.collapsible) ? parseInt(uo(self.rightCollapser.dimensions.width)) : 0);
        return newWidth + "px";
    });
    self.middleWidth.subscribe(function (value) {
        self.middle.dimensions.width(value);
    });
    self.middle.dimensions.width(uo(self.middleWidth));

    if (self.template.middle && typeof (self.template.middle.controls) != "undefined") {
        wsq.controls.createControls.call(self.middle, self.middle.controls, self.template.middle.controls, self.data);
    }
}