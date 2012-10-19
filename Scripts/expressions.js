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
		if (tokeniser != null) {
			tokens.push(tokeniser.getToken());
			tokeniser = null;
		}
		return tokens;
	},
	isFunction: function (string) {
		if (wsq.functions[string.toLowerCase()]) {
			return true;
		}
		return false;
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
			case "#":
				if (expression.length > 0 && expression[0] != "#") {
					return wsq.expressions.tokenisers.get;
				}
				break;
			case "+":
				return wsq.expressions.tokenisers.add;
			case "(":
				return wsq.expressions.tokenisers.expr;
			default:
				return wsq.expressions.tokenisers.string;
		}
	},
	tokenisers: {
		string: function (char, explicit) {
			var value = explicit ? "" : char;
			var isFunction = false;
			this.eval = function (char) {
				if (explicit) {
					if (char == "\"") {
						return wsq.expressions.state.completeStripChar;
					}
				}

				if (isFunction) {
					var state = value.eval(char);
					if (state == wsq.expressions.state.complete) {
						return state;
					}
				}
				else if (!explicit && char == "(" && wsq.expressions.isFunction(value)) {
					isFunction = true;
					value = new wsq.expressions.tokenisers.func(value);
					return wsq.expressions.state.inProgress;
				}
				else {
					value += char;
				}

				return wsq.expressions.state.inProgress;
			};
			this.getToken = function () {
				if (isFunction) {
					return value.getToken();
				}

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
		},
		func: function (value) {
			var obj = {
				type: wsq.expressions.tokens.functionToken,
				func: value,
				arguments: []
			}
			var openBrackets = 1;
			var currentArgument = "";
			this.eval = function (char) {
				if (char == "(") {
					currentArgument += char;
					openBrackets++;
					return wsq.expressions.state.inProgress;
				}
				else if (char == ")") {
					openBrackets--;
					if (openBrackets > 0) {
						currentArgument += char;
						return wsq.expressions.state.inProgress;
					}
				}
				else if (char == "," && openBrackets == 1) {
					var tokens = wsq.expressions.tokenise(currentArgument);
					obj.arguments.push(tokens);
					currentArgument = "";
					return wsq.expressions.state.inProgress;
				}
				else {
					currentArgument += char;
					return wsq.expressions.state.inProgress;
				}

				if (currentArgument != "") {
					var tokens = wsq.expressions.tokenise(currentArgument);
					obj.arguments.push(tokens);
				}
				return wsq.expressions.state.completed;
			};
			this.getToken = function () {
				return obj;
			}
		}
		, expr: function (char) {
			var value = "";
			var obj = {
				type: wsq.expressions.tokens.expressionToken,
				tokens: []
			}
			var bracketCount = 1;
			this.eval = function (char) {
				// Get the whole string, will need to count brackets then tokenise it
				if (char == "(") {
					bracketCount++;
					value += char;
				}
				else if (char == ")") {
					bracketCount--;
					if (bracketCount == 0) {
						var tokens = wsq.expressions.tokenise(value);
						obj.tokens = tokens;
						return wsq.expressions.state.completed;
					}
					else {
						value += char;
					}
				}
				return wsq.expressions.state.inProgress;
			};
			this.getToken = function () {
				return obj;
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
			var tokenValue = token.value;
			var parts = tokenValue.split(".");
			var newContext = wsq.provider.checkDataContext.call(controlContext, parts[0]);
			if (newContext) {
				data = newContext;
			}
			parts.splice(0, 1);

			while (parts.length > 0 && data) {
				data = ko.utils.unwrapObservable(data);
				if (parts.length == 1) {
					data = data[parts.splice(0, 1)];
					if (makeObservable && !ko.isObservable(data)) {
						if (typeof data == "object" && data.length) {
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
		},
		functionToken: function (tokens, data, controlContext, makeObservable, result) {
			var token = tokens.pop();
			var parsedArguments = [];
			for (var a = 0; a < token.arguments.length; a++) {
				var args = token.arguments[a];
				var arg = null;
				while (args.length > 0) {
					arg = args[args.length - 1].type(args, data, controlContext, makeObservable, arg);
				}
				parsedArguments.push(arg);
			}

			return wsq.functions[token.func](parsedArguments, data);
		},
		expressionToken: function (tokens, data, controlContext, makeObservable, result) {
			var token = tokens.pop();
			return ko.computed(function () {
				var d = ko.utils.unwrapObservable(result) || ko.utils.unwrapObservable(data);
				var r = null;
				var t = token.tokens;
				while (t.length > 0) {
					var currentToken = t[t.length - 1];
					result = currentToken.type(t, d, controlContext, makeObservable, r);
				}
				return r;	
			});
		}
	}
}