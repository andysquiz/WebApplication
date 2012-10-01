wsq.utils = {};
wsq.utils.str = {};
wsq.utils.sizing = {};
wsq.utils.style = {};
wsq.utils.dragDrop = {};


wsq.utils.str.endsWith = function (str, match) {
    if (typeof (str) != "string"
        || typeof (match) != "string"
        || str.length < match.length
        || str.indexOf(match) != (str.length-match.length)) { return false; }
    return true;
}

wsq.utils.str.startsWith = function (str, match) {
    if (typeof (str) != "string"
        || typeof (match) != "string"
        || str.length < match.length
        || str.indexOf(match) != 0) { return false; }
    return true;
}

wsq.utils.str.getConfigValueType = function (value) {
    if (wsq.utils.str.endsWith(value, "px")) {
        return "px";
    }
    else if (wsq.utils.str.endsWith(value, "%")) {
        return "%";
    }
    return null;
}

wsq.utils.sizing.getConfigValue = function (value, parent) {
	if (wsq.utils.str.endsWith(value, "px")) {
		var val = parseInt(value);
		var pv = parseInt(parent);
		if (!isNaN(val) && !isNaN(pv) && val <= pv) {
			return parseInt(value);
		}
		return null;
	}
	else if (wsq.utils.str.endsWith(value, "%")) {
		return wsq.utils.sizing.getPercentValue(value, parent);
	}
	else {
		return value || null;
	}
}

wsq.utils.sizing.getPercentValue = function (value, parentValue) {
	var pv = parseInt(ko.utils.unwrapObservable(parentValue));
	value = parseInt(value);
	if (!isNaN(pv) && !isNaN(value)) {
		return Math.round((parseInt(value) / 100) * pv);
	}
	return null;
}


wsq.utils.style.createClassObject = function (classesToApply, comparisonValue) {
    var classes = {};
    for (var c in classesToApply) {
        if (classesToApply[c] === true) {
            classes[c] = comparisonValue || true;
        }
        else if(classesToApply[c] === false) {
            classes[c] = ko.computed(function () { return !ko.utils.unwrapObservable(comparisonValue); });
        }
		else if(classesToApply[c] === "all"){
			classes[c] = true;
		}
    }
    return classes;
}

wsq.utils.dragDrop.allowDrop = function (ev) {
    ev.preventDefault();
}

wsq.utils.dragDrop.drag = function (ev, data) {
    if (ev) {
        for (var m in data) {
            ev.originalEvent.dataTransfer.setData(m, ko.utils.unwrapObservable(data[m]));
        }
    }
}