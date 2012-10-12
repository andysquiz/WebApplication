wsq.controls.startactivity = function (template, data, parent) {
    var uo = ko.utils.unwrapObservable;
    var self = this;
    var canvasObj;
    self.template = uo(template);
    self.data = uo(data);
    wsq.controls.build(self)(wsq.extenders.base, parent);

    self.type = "startactivity";
    self.root = self.parent.root;

    function render(c) {
        c.save();
        c.beginPath();
        c.rect(this.left, this.top, 200, 100);
        c.fillStyle = '#8ED6FF';
        c.fill();
        c.lineWidth = 5;
        c.strokeStyle = 'black';
        c.stroke();
        c.closePath();
        c.restore();
    }

    function hitTest() {

    }

    if (self.options && self.options.canvas) {
        canvasObj = new wsq.canvas.object(self, 200, { x: ko.utils.unwrapObservable(self.parent.mousePosition.x), y: ko.utils.unwrapObservable(self.parent.mousePosition.y) }, render, hitTest);
        self.options.canvas.addObject(canvasObj);
    }
}