// Constants
var CANVAS_HEIGHT = 400;
var START_Y = 100;

// Globals
var canvas;
var ctx;
var canvasWidth;
var mouseDown;

$(document).ready(function() {
	// Initialize canvas and context
	canvas = $("#puzzleCanvas")[0];
	ctx = canvas.getContext("2d");
	setCanvasWidth();
	canvas.height = CANVAS_HEIGHT;

	// Create event handlers
	$(window).resize(onResize);
	$("#puzzleCanvas").mousedown(onMouseDown);
	
	// Draw screen
	update();
});

function onResize() {
	canvasWidth = $("#canvasWidth").width();
	canvas.width = canvasWidth;
	update();
};

function onMouseDown() {
	mouseDown = true;
}

function update() {
	ctx.font = "1.5em sans-serif";
	ctx.fillText("Hello!", 10, 50);
	if (mouseDown) {
		ctx.strokeRect(10, 10, 100, 100);
	}
}
