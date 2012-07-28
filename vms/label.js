wsq.controls.label = function (template, data, parent) {
    var self = this;
    wsq.controls.build(self)(wsq.extenders.base, parent);

    self.template = template;
    self.data = data;
    self.type = "label";
    self.viewTemplate = wsq.provider.parse(self.template.viewTemplate || "label", self.data, self);
    self.root = self.parent.root;
    self.id = self.root.getControlId();
    self.text = wsq.provider.parse(self.template.text || "", self.data, self);
    self.dimensions = new wsq.dimensions(self, parent.dimensions);
}