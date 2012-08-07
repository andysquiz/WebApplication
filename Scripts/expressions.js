wsq.expressions = {
	state: {
		inProgress: 0,
		complete: 1,
		completeStripChar: 2
	},
	tokenise: function (expression) {
		var tokens = [];
		var tokeniser = null;
		expression = expression.split("");

		while (expression.length > 0) {
			if (tokeniser == null) {
				var char = expression.splice(0, 1)[0];
				while (char == " ") {
					char = expression.splice(0, 1)[0];
				}
				var t = wsq.expressions.findTokeniser(char, expression);
				tokeniser = new t(char);
				continue;
			}

			var res = tokeniser.eval(expression[0]);
			if (res == wsq.expressions.state.inProgress) {
				expression.splice(0, 1);
			}
			else {
				if (res == wsq.expressions.state.completeStripChar) {
					expression.splice(0, 1);
				}
				tokens.push(tokeniser.getToken());
				tokeniser = null;
			}
		}
		tokens.push(tokeniser.getToken());
		return tokens;
	},
	findTokeniser: function (char, expression) {
		switch (char) {
			case "\"":
				return wsq.expressions.tokenisers.explicitString;
			case "$":
				if (expression.length > 0 && expression[0] != "$") {
					return wsq.expressions.tokenisers.get;
				}
				break;
			case "+":
				return wsq.expressions.tokenisers.add;
			default:
				return wsq.expressions.tokenisers.string;
		}
	},
	tokenisers: {
		string: function (char, explicit) {
			var value = explicit ? "" : char;
			this.eval = function (char) {
				if (explicit) {
					if (char == "\"") {
						return wsq.expressions.state.completeStripChar;
					}
				}

				value += char;
				return wsq.expressions.state.inProgress;
			};
			this.getToken = function () {
				return {
					type: wsq.expressions.tokens.stringToken,
					value: value
				}
			}
		},
		explicitString: function (char) {
			var str = new wsq.expressions.tokenisers.string(char, true);
			this.eval = function (char) {
				return str.eval(char);
			};
			this.getToken = function () {
				return str.getToken();
			};
		},
		get: function (char) {
			var value = char;
			this.eval = function (char) {
				if (wsq.expressions.findTokeniser(char) != wsq.expressions.tokenisers.string || char == " ") {
					return wsq.expressions.state.complete;
				}
				value += char;
				return wsq.expressions.state.inProgress;
			};
			this.getToken = function () {
				return {
					type: wsq.expressions.tokens.getToken,
					value: value
				}
			}
		},
		add: function (char) {
			this.eval = function (char) { return wsq.expressions.state.complete; }
			this.getToken = function () {
				return {
					type: wsq.expressions.tokens.addToken
				}
			}
		}
	},
	tokens: {
		addToken: function (tokens, data, controlContext, makeObservable, result) {
			tokens.pop();
			var rhs = result;
			var lhs = tokens[0].type(tokens, data, controlContext, makeObservable, null);
			return ko.computed(function () { return ko.utils.unwrapObservable(lhs) + ko.utils.unwrapObservable(rhs); });
		},
		getToken: function (tokens, data, controlContext, makeObservable, result) {
			var token = tokens.pop();
			var parts = token.value.split(".");
			var newContext = wsq.provider.checkDataContext.call(controlContext, parts[0]);
			if (newContext) {
				data = newContext;
			}
			parts.splice(0, 1);

			while (parts.length > 0 && data) {
				if (parts.length == 1) {
					data = data[parts.splice(0, 1)];
					if (makeObservable && !ko.isObservable(data)) {
						if (data.length) {
							data = ko.observableArray(data);
						}
						else {
							data = ko.observable(data);
						}
					}
				}
				else {
					if (parts[0].toString().length == 0) {
						parts.splice(0, 1);
						controlContext = controlContext.parent;
						if (controlContext) {
							data = controlContext.data;
						}
						else {
							data = null;
							break;
						}
					}
					else {
						data = ko.utils.unwrapObservable(data[parts.splice(0, 1)]);
					}
				}
			}

			return data || null;
		},
		stringToken: function (tokens, data, controlContext, makeObservable, result) {
			var token = tokens.pop();
			return token.value;
		}
	}
}