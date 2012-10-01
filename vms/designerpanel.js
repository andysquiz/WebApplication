wsq.controls.designerpanel = function (template, data, parent) {
    var self = this;
    self.template = template;
    self.data = data;
    wsq.controls.build(self)(wsq.extenders.base, parent)(wsq.extenders.container)(wsq.extenders.droppable);

    self.orientation = wsq.provider.parse(self.template.orientation || "vertical", self.data, self);
    self.type = "designerpanel";
    self.viewTemplate = wsq.provider.parse(self.template.viewTemplate || "designerpanel", self.data, self);
    self.root = self.parent.root;
    self.id = self.root.getControlId();
    self.dimensions = new wsq.dimensions(self, parent.dimensions);

    if (typeof (self.template.controls) != "undefined") {
        wsq.controls.createControls.call(self, self.controls, self.template.controls, self.data, self);
    }
    
    self.drop = function (ev) {
        var dt = ev.originalEvent.dataTransfer;
        var type = dt.getData("type");
        var text = dt.getData("text");
        self.controls.push(new wsq.controls[type]({}, self.data, self));
    }
}