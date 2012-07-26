ko.bindingHandlers.wsqid = {
	init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		element.id = viewModel.root.identifier + "_" + viewModel.id;
	}
}