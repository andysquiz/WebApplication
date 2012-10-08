ko.bindingHandlers.wsqstyleheight = {
	update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
		var va = valueAccessor();
		var value = va.value;
		if (!value) {
			value = va.obj.height;
		}

		var overflowNode = element.parentNode;
		while (overflowNode && !overflowNode.className) {
			overflowNode = overflowNode.parentNode;
		}

		var overflow = $(overflowNode).css("overflow");

		var elemBorder = parseInt($(element).css("border-top-width"))
            + parseInt($(element).css("border-bottom-width"))
            + parseInt($(element).css("padding-top"))
            + parseInt($(element).css("padding-bottom"))
			+ (overflow == "auto" || overflow == "scroll" ? 32 : 0);
		var newHeight = (parseInt(ko.utils.unwrapObservable(value)) - (!isNaN(elemBorder) ? elemBorder : 0)) + "px";
		if (va.obj) {
			va.obj.innerHeight(newHeight);
		}
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
		var overflowNode = element.parentNode;
		while (overflowNode && !overflowNode.className) {
			overflowNode = overflowNode.parentNode;
		}

		var overflow = $(overflowNode).css("overflow");

		var elemBorder = parseInt($(element).css("border-left-width"))
            + parseInt($(element).css("border-right-width"))
            + parseInt($(element).css("padding-left"))
            + parseInt($(element).css("padding-right"))
			+ (overflow == "auto" || overflow == "scroll" ? 32 : 0);
		var newWidth = (parseInt(ko.utils.unwrapObservable(value)) - (!isNaN(elemBorder) ? elemBorder : 0)) + "px";
		if (va.obj) {
			va.obj.innerWidth(newWidth);
		}
		$(element).css("width", newWidth);
	}
}