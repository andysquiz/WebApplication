ko.bindingHandlers.wsqdroppable = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var va = ko.utils.unwrapObservable(valueAccessor());
        $(element).bind("dragover", wsq.utils.dragDrop.allowDrop);
        $(element).bind("drop", viewModel.drop);
    }
}