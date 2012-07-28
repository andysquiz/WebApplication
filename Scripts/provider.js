/*
    Data contexts start with a $ and are ended with a .
    $. followed by represents the current data item
    Anything not starting with a $ will be taken as a static template value.
    To start a static template value with a $ double it up to $$ to avoid context parsing.
*/
wsq.provider = {
    root: null,
    parse: function (parsePath, data, controlContext, makeObservable) {
        if (parsePath == null) { return null; }
        if (typeof (parsePath) == "string") {
            if (wsq.utils.str.startsWith(parsePath, "$") && !wsq.utils.str.startsWith(parsePath, "$$")) {
                var parts = parsePath.split(".");
                var newContext = wsq.provider.checkDataContext.call(controlContext, parts[0]);
                if (newContext) {
                    data = newContext;
                }
                parts.splice(0, 1);

                while (parts.length > 0 && data) {
                    if (parts.length == 1) {
                        data = data[parts.splice(0, 1)];
                        if (makeObservable && !ko.isObservable(data)) {
                            data = ko.observable(data);
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
            }
            else {
                if (wsq.utils.str.startsWith(parsePath, "$$")) {
                    return parsePath.substr(1);
                }
                return parsePath;
            }
        }
        else {
            return makeObservable && ko.isObservable(parsePath) ? parsePath : ko.observable(parsePath);
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