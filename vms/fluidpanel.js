wsq.controls.fluidpanel = function (template, data, parent) {
    var self = this;
    wsq.controls.build(self)(wsq.extenders.base, parent)(wsq.extenders.container);

    self.template = template;
    self.data = data;
    self.orientation = wsq.provider.parse("orientation", self.data) || "vertical";
    self.type = "fluidpanel";
    self.viewTemplate = "fluidpanel";
    self.root = self.parent.root;
    self.id = self.root.getControlId();
    self.dimensions = new wsq.dimensions(self, parent.dimensions);

    if (self.data && self.template && self.template.controls) {
        wsq.controls.createControls.call(self, self.controls, self.template.controls, self.data);
    }
}