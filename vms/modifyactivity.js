wsq.controls.modifyactivity = function (template, data, parent) {
	var uo = ko.utils.unwrapObservable;
	var self = this;
	var canvasObj;
	self.template = uo(template);
	self.data = uo(data);
	wsq.controls.build(self)(wsq.extenders.base, parent);

	self.type = "modifyactivity";
	self.root = self.parent.root;
	

	function render(c) {
		var cornerRadius = 5;
		var width, height;
		var img = new Image();
		width = height = 100;
		c.save();
		c.beginPath();
		c.moveTo(this.left + cornerRadius, this.top);
		c.lineTo(this.left + width - cornerRadius, this.top);
		c.arcTo(this.left + width, this.top, this.left + width, this.top + cornerRadius, cornerRadius);
		c.lineTo(this.left + width, this.top + height - cornerRadius);
		c.arcTo(this.left + width, this.top + height, this.left + width - cornerRadius, this.top + height, cornerRadius);
		c.lineTo(this.left + cornerRadius, this.top + height);
		c.arcTo(this.left, this.top + height, this.left, this.top + height - cornerRadius, cornerRadius);
		c.lineTo(this.left, this.top + cornerRadius);
		c.arcTo(this.left, this.top, this.left + cornerRadius, this.top, cornerRadius);

		c.lineWidth = 2;
		c.strokeStyle = 'black';
		c.fillStyle = '#cccccc';
		c.fill();
		
		c.stroke();
		c.drawImage(wsq.workflowActivities.images.modify, this.left + 5, this.top + 5);
		c.closePath();
		c.restore();
	}

	function hitTest() {

	}

	if (self.options && self.options.canvas) {
		canvasObj = new wsq.canvas.object(self, 200, { x: ko.utils.unwrapObservable(self.parent.mousePosition.x)-50, y: ko.utils.unwrapObservable(self.parent.mousePosition.y)-50 }, render, hitTest);
		self.options.canvas.addObject(canvasObj);
	}
}