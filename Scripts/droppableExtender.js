ko.bindingHandlers.wsqdroppable = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var va = ko.utils.unwrapObservable(valueAccessor());
        $(element).bind("dragover", wsq.utils.dragDrop.allowDrop);
        $(element).bind("drop", function (ev) {
            var res = wsq.utils.mouse.getElementPosition(element, ev.originalEvent);
            viewModel.mousePosition.x(res.x);
            viewModel.mousePosition.y(res.y);
            viewModel.drop(ev);
        });
    }
}