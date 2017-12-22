// Constants
var TIME_PER_FRAME = 33;
var CANVAS_HEIGHT = 400;
var START_Y = 100;

// Globals
var canvas;
var ctx;
var canvasWidth;
var mouseDown;
var dasherImage = new Image(150, 150);
dasherImage.src = "img/A.png";
var dasher = {id: 0, xPos: 0, yPos: 0, img: dasherImage}
var reindeer = [dasher];
var draggingReindeer = null;
var loop;

$(document).ready(function() {
	// Initialize canvas and context
	canvas = $("#puzzleCanvas");
	ctx = canvas[0].getContext("2d");
	setCanvasWidth();
	canvas[0].height = CANVAS_HEIGHT;

	// Create event handlers
	$(window).resize(setCanvasWidth);
	canvas.mousedown(onMouseDown);
	canvas.mouseup(onMouseUp);
	canvas.mousemove(onMouseMove);
	
	// Start loop
	loop = setInterval(update, TIME_PER_FRAME);
});

function setCanvasWidth() {
	canvasWidth = $("#canvasWidth").width();
	canvas[0].width = canvasWidth;
};

function onMouseDown(e) {
	if (draggingReindeer == null) {
		var x = getXClick(e);
		var y = getYClick(e);
		if (x > dasher.xPos && x < dasher.xPos + 150 &&
				y > dasher.yPos && y < dasher.yPos + 150) {
			draggingReindeer = dasher;
			setDraggingPosition(e);
		}
	}
}

function onMouseUp(e) {
	if (draggingReindeer != null) {
		draggingReindeer = null;
	}
}

function onMouseMove(e) {
	if (draggingReindeer != null) {
		setDraggingPosition(e);
	}
}

function update() {
	clear();
	ctx.drawImage(dasher.img, dasher.xPos, dasher.yPos);
}

function clear() {
	var oldFill = ctx.fillStyle;
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvasWidth, CANVAS_HEIGHT);
	ctx.fillStyle = oldFill;
}

function setDraggingPosition(e) {
	var x = getXClick(e);
	var y = getYClick(e);
	var targetX = x - 75;
	var targetY = y - 75;
	if (targetX < 0) {
		targetX = 0;
	} else if (targetX + 150 > canvasWidth) {
		targetX = canvasWidth - 150;
	}
	
	if (targetY < 0) {
		targetY = 0;
	} else if (targetY + 150 > CANVAS_HEIGHT) {
		targetY = CANVAS_HEIGHT - 150;
	}
	
	draggingReindeer.xPos = targetX;
	draggingReindeer.yPos = targetY;
}

// Return the X position of the click relative to the canvas
function getXClick(e) {
	return e.pageX - canvas.offset().left + canvas.scrollLeft();
}

// Return the Y position of the click relative to the canvas
function getYClick(e) {
	return e.pageY - canvas.offset().top + canvas.scrollTop();
}
