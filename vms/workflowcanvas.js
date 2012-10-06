wsq.controls.workflowcanvas = function (template, data, parent) {
    var self = this;
    var uo = ko.utils.unwrapObservable;
    self.template = uo(template);
    self.data = uo(data);
    self.type = "workflowcanvas";

    wsq.controls.build(self)(wsq.extenders.base, parent)(wsq.extenders.container);


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
        self.parent.mousePosition.x(newval);
    });
    self.mousePosition.y.subscribe(function (newval) {
        self.parent.mousePosition.y(newval);
    });

    if (typeof (self.template.controls) != "undefined") {
        wsq.controls.createControls.call(self, self.controls, self.template.controls, self.data, self);
    }

    self.context = ko.observable(null);
    self.canvasData = {
        objectCache: [],
        testText: ko.computed(function () {
            return "x:" + self.mousePosition.x() + ", y:" + self.mousePosition.y();
        })
    }

    self.redraw = ko.computed(function () {
        var x = self.mousePosition.x();
        var y = self.mousePosition.y();
        if (self.context() != null) {
            var c = self.context();
            c.scale(1, 1);
            c.clearRect(0, 0, parseInt(self.dimensions.width()), parseInt(self.dimensions.height()));
            c.font = '18pt Calibri';
            c.fillStyle = 'blue';
            c.fillText(self.canvasData.testText(), 10, 25);
        }
    })
}