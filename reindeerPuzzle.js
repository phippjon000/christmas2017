// Constants
var CANVAS_HEIGHT = 400;
var TIME_PER_FRAME = 100;

// Globals
var canvas;
var ctx;

$(document).ready(function() {
	// Initialize canvas and context
	canvas = $("#puzzleCanvas")[0];
	ctx = canvas.getContext("2d");
	setCanvasWidth();
	canvas.height = CANVAS_HEIGHT;

	// Create event handlers
	$(window).resize(setCanvasWidth);
	update();
});

function setCanvasWidth() {
	var width = $("#canvasWidth").width();
	canvas.width = width;
	update();
};

function update() {
	ctx.font = "1.5em sans-serif";
	ctx.fillText("Hello!", 10, 50);
}
