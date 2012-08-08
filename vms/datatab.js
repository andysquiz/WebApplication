wsq.controls.datatab = function (template, data, parent) {
    var self = this;
    var uo = ko.utils.unwrapObservable;
    wsq.controls.build(self)(wsq.extenders.base, parent);
    self.type = "datatab";
    self.viewTemplate = "";
    self.template = template;
    self.data = data;
    self.dataSource = wsq.provider.parse(self.template.repeatSource, self.data, self, true);
}