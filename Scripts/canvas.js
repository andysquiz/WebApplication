wsq.canvas = {
	object: function (vm, layerId, position, renderFunction, hitFunction) {
		this.model = vm;
		this.layer = layerId;
		this.left = position.x;
		this.top = position.y;
		this.render = renderFunction;
		this.hitTest = hitFunction;
	},
	manager: function (vm) {
		var objectRegister = [];
		var context = null;
		var layers = [{
			name: "System",
			id: 0
		},
		{
			name: "Background",
			id: 100
		},
		{
			name: "Foreground",
			id: 200
		},
		{
			name: "Active",
			id: 300
		},
		{
			name: "Property",
			id: 400
		}];

		this.setContext = function (newContext) {
			var self = this;
			context = newContext;
			self.render();
		}

		this.addLayer = function (name, id) {
			if (typeof (name) === "string" && !isNaN(parseInt(id))) {
				id = parseInt(id);
				var pos = -1;
				for (var p = 0; p < layers.length; p++) {
					if ((p == 0 && id < layers[p].id) || (id > layers[p - 1].id && id < layers[p].id)) {
						pos = p;
						break;
					}
				}
				var obj = { "name": name, "id": id };
				if (pos == -1) {
					layers.push(obj);
				}
				else {
					layers.splice(pos, 0, obj);
				}
			}
		}

		this.addObject = function (obj) {
			objectRegister.push(obj);
		}

		this.render = function () {
			if (context) {
				for (var l = 0; l < layers.length; l++) {
					// Loop through each layer and render objects connected to each one
					for (var i = 0; i < objectRegister.length; i++) {
						if (objectRegister[i].layer == layers[l].id) {
							var item = objectRegister[i];
							item.render.call(item, context);
						}
					}
				}
			}
		}
	}
}
