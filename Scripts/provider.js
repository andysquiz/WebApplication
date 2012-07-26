wsq.provider = {
	root: null,
	parse: function (parsePath, data) {
		var parts = parsePath.split(".");
		var newContext = wsq.provider.checkDataContext(parts[0]);
		if (newContext) {
			parts.splice(0, 1);
			data = newContext;
		}

		while (parts.length > 0 && data) {
			if (parts.length == 1) {
				data = data[parts.splice(0, 1)];
			}
			else {
				data = ko.utils.unwrapObservable(data[parts.splice(0, 1)]);
			}
		}

		return data || null;
	},
	checkDataContext: function (context) {
		switch (context) {
			case "$root":
				return wsq.provider.root;
		}
		return null;
	}
}