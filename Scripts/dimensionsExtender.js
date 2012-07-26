ko.bindingHandlers.wsqdimensions = {
	init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		viewModel.root.resizeControlList.push(viewModel);
		viewModel.dimensions.setRenderDimensions(element);
	}
}