wsq.workflowActivities = {};
wsq.workflowActivities.loadImage = function (path) {
	var img = new Image();
	img.src = path;
	return img;
};
wsq.workflowActivities.images = {
	modify: wsq.workflowActivities.loadImage("images/workflow/activities/modify.png")
};