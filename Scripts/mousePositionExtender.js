ko.bindingHandlers.wsqmouseposition = {
	init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		$(element).bind("mousemove", function (ev) {
			var res = wsq.utils.mouse.getElementPosition(element, ev);
			viewModel.mousePosition.x(res.x);
			viewModel.mousePosition.y(res.y);
		});
	}
}