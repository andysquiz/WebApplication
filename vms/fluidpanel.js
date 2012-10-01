wsq.controls.fluidpanel = function (template, data, parent) {
    var self = this;
    self.template = template;
    self.data = data;
    wsq.controls.build(self)(wsq.extenders.base, parent)(wsq.extenders.container)(wsq.extenders.draggable);

    
    self.orientation = wsq.provider.parse(self.template.orientation || "vertical", self.data, self);
    self.type = "fluidpanel";
    self.viewTemplate = wsq.provider.parse(self.template.viewTemplate || "fluidpanel", self.data, self);
    self.root = self.parent.root;
    self.id = self.root.getControlId();
    self.dimensions = new wsq.dimensions(self, parent.dimensions);

    if (typeof(self.template.controls) != "undefined") {
        wsq.controls.createControls.call(self, self.controls, self.template.controls, self.data, self);
    }
}