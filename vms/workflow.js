﻿wsq.controls.workflow = function (template, data, parent) {
    var self = this;
    var uo = ko.utils.unwrapObservable;
    self.template = template;
    self.data = data;
    wsq.controls.build(self)(wsq.extenders.base, parent)(wsq.extenders.container)(wsq.extenders.childOptions, { infoData: self });

    self.type = "workflow";
    self.childTypes = "Activities";
    self.cssClasses = wsq.utils.style.createClassObject(wsq.provider.parse(self.template.classes || {}, self.data, self), null);
    self.dimensions = new wsq.dimensions(self, parent.dimensions);
    self.mousePosition = {
    	x: ko.observable(0),
    	y: ko.observable(0)
    }
}