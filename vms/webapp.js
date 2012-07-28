

wsq.app = function (template, data, identifier) {
    var self = this;
    var controlIds = -1;

    wsq.controls.build(self)(wsq.extenders.base, null)(wsq.extenders.container);
    wsq.provider.root = data;

    self.root = self;
    self.name = data.name;
    self.resizeControlList = ko.observableArray();
    self.identifier = identifier || "wsqapp";
    self.version = data.version;
    self.template = template;
    self.data = data;
    self.type = "app";
    self.dimensions = {
        height: ko.observable(),
        width: ko.observable()
    };

    function getDimensions() {
        self.dimensions.height($(window).height() + "px");
        self.dimensions.width($(window).width() + "px");
        $(self.resizeControlList()).each(function () {
            var vm = this;
            var elem = document.getElementById(self.identifier + "_" + vm.id);
            if (elem) {
                vm.dimensions.setRenderDimensions(elem);
            }
        });
    }
    getDimensions();

    self.getControlId = function () {
        return ++controlIds;
    }

    self.id = self.getControlId();


    if (typeof(self.template.controls) != "undefined") {
        wsq.controls.createControls.call(self, self.controls, self.template.controls, self.data);
    }


    $(window).bind("resize", getDimensions);
}
