ko.bindingHandlers.wsqdraggable = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var va = ko.utils.unwrapObservable(valueAccessor());
        if (va) {
            $(element).attr("draggable", va);
            $(element).bind("dragstart", function (ev) {
                wsq.utils.dragDrop.drag(ev, viewModel.dragData);
            });
        }
    }
}