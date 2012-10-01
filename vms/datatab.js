wsq.controls.datatab = function (template, data, parent) {
	var self = this;
	var uo = ko.utils.unwrapObservable;
	wsq.controls.build(self)(wsq.extenders.base, parent);
	self.type = "datatab";
	self.viewTemplate = "datatab";
	self.template = template;
	self.data = data;
	self.root = self.parent.root;
	self.dataSource = wsq.provider.parse(self.template.repeatSource, self.data, self, true);
	self.tabs = ko.observableArray();
	self.selectedItem = ko.observable(null);
	self.selectedContent = wsq.provider.parse(self.template.selectedContent, self.data, self, true);
	self.dimensions = new wsq.dimensions(self, parent.dimensions, true);
	self.cssClasses = wsq.utils.style.createClassObject(self.provider.parse(self.template.classes || {}, self.data, self));

	self.tabDimensions = {};

	var oldData = [];

	self.left = {
		parent: self,
		root: self.root,
		actualWidth: ko.observable("0px")
	};
	self.left.dimensions = new wsq.dimensions(self.left, self.dimensions);

	self.right = {
		parent: self,
		root: self.root,
		configWidth: self.provider.parse(self.template.right ? self.template.right.width || "200px" : "200px", self.data, self)
	}
	self.right.dimensions = new wsq.dimensions(self.right, self.dimensions);

	self.leftWidth = ko.computed(function () {
		var newWidth = parseInt(uo(self.dimensions.width))
            - parseInt(uo(self.right.dimensions.width))
            - 4;
		return newWidth + "px";
	});

	self.leftWidth.subscribe(function (newVal) {
		self.left.dimensions.width(newVal);
		if (parseInt(self.scrollPosition()) < 0 && parseInt(self.left.dimensions.width()) >= parseInt(self.left.actualWidth())) {
			self.scrollPosition("0px");
		}
	});

	self.getActualWidth = function () {
		var output = 0;
		var tabs = self.tabs();
		for (var t = 0; t < tabs.length; t++) {
			var tWidth = parseInt(tabs[t].dimensions.width());
			output += isNaN(tWidth) ? 0 : tWidth;
		}
		self.left.actualWidth(output + self.actualWidthBuffer);
		return output + "px";
	}
	self.actualWidthBuffer = 50;
	self.scrollPosition = ko.observable("0px");
	self.scrollRight = function () {
		var scrollAmount = parseInt(self.left.dimensions.width());
		var scrollPos = Math.abs(parseInt(self.scrollPosition()));
		var actualWidth = parseInt(self.left.actualWidth());
		if (scrollPos + scrollAmount < actualWidth - parseInt(self.left.dimensions.width())) {
			self.scrollPosition("-" + (scrollPos + scrollAmount) + "px");
		}
		else {
			self.scrollPosition("-" + (actualWidth - parseInt(self.left.dimensions.width())) + "px");
		}
	}

	self.scrollLeft = function () {
		var scrollAmount = parseInt(self.left.dimensions.width());
		var scrollPos = Math.abs(parseInt(self.scrollPosition()));
		var actualWidth = parseInt(self.left.actualWidth());
		if (scrollPos > 0 && scrollPos - scrollAmount > 0) {
			self.scrollPosition("-" + (scrollPos - self.scrollAmount) + "px");
		}
		else {
			self.scrollPosition("0px");
		}
	}

	self.canScrollRight = ko.computed(function () {
		var scrollPos = Math.abs(parseInt(self.scrollPosition()));
		var scrollAmount = parseInt(self.left.dimensions.width());
		var actualWidth = parseInt(self.left.actualWidth());
		return scrollPos < actualWidth - scrollAmount ? true : false;
	});

	self.canScrollLeft = ko.computed(function () {
		var scrollPos = Math.abs(parseInt(self.scrollPosition()));
		return scrollPos > 0 ? true : false;
	});


	self.scrollLeftClasses = wsq.utils.style.createClassObject(self.provider.parse(self.template.scrollLeftClasses || {}, self.data, self), self.canScrollLeft);
	self.scrollRightClasses = wsq.utils.style.createClassObject(self.provider.parse(self.template.scrollRightClasses || {}, self.data, self), self.canScrollRight);

	function subFunc(newVal) {
		var newData = [];
		for (var o = 0; o < newVal.length; o++) {
			var obj = ko.utils.unwrapObservable(newVal[o])
			var oData = obj ? obj.data : null;
			if (oData) {
				newData.push(oData);
			}
		}

		var differences = ko.utils.compareArrays(oldData, newData);
		var arrPos = 0;
		var tabPos = 0;
		ko.utils.arrayForEach(differences, function (difference) {
			if (difference.status === "added" || difference.status === "retained") {
				var x = newData[arrPos];
				if (!x) {
					return;
				}

				if (difference.status === "added") {
					var tab = uo(newVal[arrPos]);
					self.tabs.splice(tabPos, 0, self.newTab(tab));
				}

				arrPos++;
				tabPos++;
			}
			else if (difference.status === "deleted") {
				self.tabs.splice(tabPos, 1);
			}
		});

		oldData = newData;
		self.getActualWidth();

		if (self.selectedItem && self.selectedItem() == null && newVal.length > 0) {
			self.tabs()[0].click();
		}
	}

	self.dataSource.subscribe(subFunc);

	self.newTab = function (obj) {
		var self = this;
		var tab = {};
		tab.template = obj.template;
		tab.item = obj;
		tab.data = obj.data;
		wsq.controls.build(tab)(wsq.extenders.base, self)(wsq.extenders.container);
		tab.root = self.root;
		tab.dimensions = new wsq.dimensions(tab, self.dimensions);
		wsq.controls.createControls.call(self, tab.controls, tab.template.header.controls, tab.data);
		tab.name = wsq.provider.parse(tab.template.name, tab.data, tab, true);

		function selectContent(t) {
			var item = {};
			if (t.content == null) {
				item.template = tab.template;
				item.data = tab.data;
				wsq.controls.build(item)(wsq.extenders.base, tab)(wsq.extenders.container);
				item.root = tab.root;
				wsq.controls.createControls.call(tab, item.controls, item.template.body.controls, item.data);
				t.content = item;
			}
			else {
				item = t.content;
			}
			return item;
		}

		tab.click = function () {
			tab.parent.selectedItem(tab.item);
			tab.parent.selectedContent(selectContent(tab));
		};
		tab.selected = ko.computed(function () {
			return tab.item == ko.utils.unwrapObservable(tab.parent.selectedItem);
		});
		tab.cssClasses = wsq.utils.style.createClassObject(tab.provider.parse(tab.template.classes, tab.data, self), tab.selected);
		tab.content = null;
		return tab;
	}

	self.newItem = function (itemData) {
		var self = this;
		var item = {};
		item.template = itemData.template;
		item.data = itemData.data;
		wsq.controls.build(item)(wsq.extenders.base, self)(wsq.extenders.container);
		item.root = self.root;
		wsq.controls.createControls.call(self, item.controls, item.template.body.controls, item.data);
		return item;
	}

	subFunc(ko.utils.unwrapObservable(self.dataSource));
}