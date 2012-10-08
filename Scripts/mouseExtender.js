ko.bindingHandlers.wsqmouseover = {
	init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		$(element).bind("mouseover", valueAccessor());
	}
}

ko.bindingHandlers.wsqmouseout = {
	init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		$(element).bind("mouseout", valueAccessor());
	}
}

ko.bindingHandlers.wsqmouseposition = {
	init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		$(element).bind("mousemove", function (ev) {
			var res = wsq.utils.mouse.getElementPosition(element, ev);
			viewModel.mousePosition.x(res.x);
			viewModel.mousePosition.y(res.y);
		});
	}
}