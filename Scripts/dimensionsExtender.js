ko.bindingHandlers.wsqdimensions = {
	init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		viewModel.root.resizeControlList.push(viewModel);
		viewModel.dimensions.setRenderDimensions(element);
	}
}

ko.bindingHandlers.wsqdimensionssingle = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var va = valueAccessor();
        viewModel.dimensions.setRenderDimensions(element);
        va();
    }
}
