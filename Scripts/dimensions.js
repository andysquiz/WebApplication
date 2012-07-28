﻿wsq.dimensions = function (obj, parent, max) {
    var self = this;
    var storedHeight = ko.observable(null);
    var storedWidth = ko.observable(null);
    var uo = ko.utils.unwrapObservable;
    self.height = ko.computed({
        read: function () {
            var minHeight = obj.configMinHeight ? uo(obj.configMinHeight) : null;
            var tempHeight;
            if (obj.configHeight && uo(obj.configHeight)) {
                switch (wsq.utils.str.getConfigValueType(uo(obj.configHeight))) {
                    case "px":
                        return uo(obj.configHeight);
                    case "%":
                        tempHeight = wsq.utils.sizing.getPercentValue(uo(obj.configHeight), uo(parent.height));
                        return minHeight && parseInt(tempHeight) < parseInt(minHeight) ? minHeight : tempHeight + "px";
                }
            }
            else if (max) {
                tempHeight = uo(parent.height);
                return (minHeight && parseInt(tempHeight) < parseInt(minHeight) ? minHeight : parseInt(tempHeight)) + "px";
            }
            else {
                return minHeight && uo(storedHeight) < parseInt(minHeight) ? minHeight : uo(storedHeight) + "px";
            }
        },
        write: function (value) {
            storedHeight(parseInt(uo(value)));
        }
    });

    self.width = ko.computed({
        read: function () {
            var minWidth = obj.configMinWidth ? uo(obj.configMinWidth) : null;
            var tempWidth;
            if (obj.configWidth && uo(obj.configWidth)) {
                switch (wsq.utils.str.getConfigValueType(uo(obj.configWidth))) {
                    case "px":
                        return uo(obj.configWidth);
                    case "%":
                        tempWidth = wsq.utils.sizing.getPercentValue(uo(obj.configWidth), uo(parent.width));
                        return minWidth && parseInt(tempWidth) < parseInt(minWidth) ? minWidth : tempWidth + "px";
                }
            }
            else if (max) {
                tempWidth = uo(parent.width);
                return (minWidth && parseInt(tempWidth) < parseInt(minWidth) ? minWidth : parseInt(tempWidth)) + "px";
            }
            else {
                return minWidth && uo(storedWidth) < parseInt(minWidth) ? minWidth : uo(storedWidth) + "px";
            }
        },
        write: function (value) {
            storedWidth(parseInt(uo(value)));
        }
    });

    self.setRenderDimensions = function (el) {
        var w, h;
        w = parseInt($(el).width());
        h = parseInt($(el).height());
        storedWidth(w + "px");
        storedHeight(h + "px");
    }
}
