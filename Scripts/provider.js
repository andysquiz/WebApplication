/*
    Data contexts start with a $ and are ended with a .
    $. followed by represents the current data item
    Anything not starting with a $ will be taken as a static template value.
    To start a static template value with a $ double it up to $$ to avoid context parsing.
*/
wsq.provider = {
    root: null,
    parse: function (parsePath, data, controlContext, makeObservable) {
        if (!makeObservable) { makeObservable = false; }
        if (parsePath == null) { return null; }
        if (typeof (parsePath) == "string") {
            var tokens = wsq.expressions.tokenise(parsePath);
            var result = null;
            while (tokens.length > 0) {
                var token = tokens[tokens.length - 1];
                result = token.type(tokens, data, controlContext, makeObservable, result);
            }
            return result;
        }
        else {
            return ko.isObservable(parsePath) ? parsePath : makeObservable ? parsePath.length ? ko.observableArray(parsePath) : ko.observable(parsePath) : parsePath;
        }
    },
    checkDataContext: function (context, data) {
        var self = this;
        switch (context) {
            case "$root":
                return wsq.provider.root;
        }
        return null;
    }
}