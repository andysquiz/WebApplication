wsq.controls.datatab = function (template, data, parent) {
    var self = this;
    var uo = ko.utils.unwrapObservable;
    wsq.controls.build(self)(wsq.extenders.base, parent);
    self.type = "datatab";
    self.viewTemplate = "datatab";
    self.template = template;
    self.data = data;
    self.root = self.parent.root;
    self.dataSource = wsq.provider.parse(self.template.repeatSource, self.data, self, true);
    self.tabs = ko.observableArray();
    self.selectedItem = wsq.provider.parse(self.template.selectedItem, self.data, self, true);
    var oldData = [];

    function subFunc(newVal) {
        var newData = [];
        for (var o = 0; o < newVal.length; o++) {
            var obj = ko.utils.unwrapObservable(newVal[o])
            var oData = obj ? obj.data : null;
            if (oData) {
                newData.push(oData);
            }
        }

        var differences = ko.utils.compareArrays(oldData, newData);
        var arrPos = 0;
        var tabPos = 0;
        ko.utils.arrayForEach(differences, function (difference) {
            if (difference.status === "added" || difference.status === "retained") {
                var x = newData[arrPos];
                if (!x) {
                    return;
                }

                if (difference.status === "added") {
                    var tab = uo(newVal[arrPos]);
                    self.tabs.splice(tabPos, 0, self.newTab(tab));
                }

                arrPos++;
                tabPos++;
            }
            else if (difference.status === "deleted") {
                self.tabs.splice(tabPos, 1);
            }
        });

        oldData = newData;

        if (self.selectedItem && self.selectedItem() == null && newVal.length > 0) {
            self.selectedItem(uo(newVal[0]));
        }
    }

    self.dataSource.subscribe(subFunc);


    self.newTab = function (obj) {
        var self = this;
        var tab = {};
        tab.template = obj.template;
        tab.item = obj;
        tab.data = obj.data;
        wsq.controls.build(tab)(wsq.extenders.base, self)(wsq.extenders.container);
        tab.root = self.root;
        wsq.controls.createControls.call(self, tab.controls, tab.template.header.controls, tab.data);
        tab.name = wsq.provider.parse(tab.template.name, tab.data, tab, true);
        tab.click = function () {
            tab.parent.selectedItem(tab.item);
        }
        return tab;
    }

    subFunc(ko.utils.unwrapObservable(self.dataSource));
}