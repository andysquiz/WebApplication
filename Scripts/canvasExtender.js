ko.bindingHandlers.wsqcanvas2d = {
	update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		viewModel.context(element.getContext("2d"));
	}
}