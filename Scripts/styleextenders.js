ko.bindingHandlers.wsqstyleheight = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var va = valueAccessor();
        var value = va.value;
        if (!value) {
            value = va.obj.height;
        }
        var elemBorder = parseInt($(element).css("border-top-width")) + parseInt($(element).css("border-bottom-width"));
        var newHeight = (parseInt(ko.utils.unwrapObservable(value)) - (!isNaN(elemBorder) ? elemBorder : 0)) + "px";
        va.obj.innerHeight(newHeight);
        $(element).css("height", newHeight);
    }
}

ko.bindingHandlers.wsqstylewidth = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var va = valueAccessor();
        var value = va.value;
        if (!value) {
            value = va.obj.width;
        }
        var elemBorder = parseInt($(element).css("border-left-width")) + parseInt($(element).css("border-right-width"));
        var newWidth = (parseInt(ko.utils.unwrapObservable(value)) - (!isNaN(elemBorder) ? elemBorder : 0)) + "px";
        va.obj.innerWidth(newWidth);
        $(element).css("width", newWidth);
    }
}