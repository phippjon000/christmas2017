// Constants
var TIME_PER_FRAME = 33;
var CANVAS_HEIGHT = 700;
var IMAGE_SIZE = 150;
var BOX_SIZE = 150;
var SANTA_X = 975;
var SANTA_Y = 430;

// Globals
var canvas;
var ctx;
var canvasWidth;
var mouseDown;
var submitted;

var dasherImage = new Image(IMAGE_SIZE, IMAGE_SIZE),
	dancerImage = new Image(IMAGE_SIZE, IMAGE_SIZE),
	prancerImage = new Image(IMAGE_SIZE, IMAGE_SIZE),
	vixenImage = new Image(IMAGE_SIZE, IMAGE_SIZE),
	cometImage = new Image(IMAGE_SIZE, IMAGE_SIZE),
	cupidImage = new Image(IMAGE_SIZE, IMAGE_SIZE),
	donderImage = new Image(IMAGE_SIZE, IMAGE_SIZE),
	blitzenImage = new Image(IMAGE_SIZE, IMAGE_SIZE),
	rudolphImage = new Image(IMAGE_SIZE, IMAGE_SIZE),
	santaImage = new Image(IMAGE_SIZE, IMAGE_SIZE);

dasherImage.src = "img/dasher.png";
dancerImage.src = "img/dancer.png";
prancerImage.src = "img/prancer.png";
vixenImage.src = "img/vixen.png";
cometImage.src = "img/comet.png";
cupidImage.src = "img/cupid.png";
donderImage.src = "img/donder.png";
blitzenImage.src = "img/blitzen.png";
rudolphImage.src = "img/rudolph.png";
santaImage.src = "img/santa.png";

var dasher = {id: 0, xPos: 50, yPos: 0, img: dasherImage, inBox: -1},
	dancer = {id: 1, xPos: 100, yPos: 150, img: dancerImage, inBox: -1},
	prancer = {id: 2, xPos: 250, yPos: 0, img: prancerImage, inBox: -1},
	vixen = {id: 3, xPos: 300, yPos: 150, img: vixenImage, inBox: -1},
	comet = {id: 4, xPos: 450, yPos: 0, img: cometImage, inBox: -1},
	cupid = {id: 5, xPos: 500, yPos: 150, img: cupidImage, inBox: -1},
	donder = {id: 6, xPos: 650, yPos: 0, img: donderImage, inBox: -1},
	blitzen = {id: 7, xPos: 700, yPos: 150, img: blitzenImage, inBox: -1},
	rudolph = {id: 8, xPos: 850, yPos: 0, img: rudolphImage, inBox: -1};

var reindeer = [dasher, dancer, prancer, vixen, comet, cupid, donder, blitzen, rudolph];

var box0 = {xPos: 50, yPos: 300, currentReindeer: -1, expectedReindeer: 2},
	box1 = {xPos: 100, yPos: 500, currentReindeer: -1, expectedReindeer: 5},
	box2 = {xPos: 250, yPos: 300, currentReindeer: -1, expectedReindeer: 8},
	box3 = {xPos: 300, yPos: 500, currentReindeer: -1, expectedReindeer: 0},
	box4 = {xPos: 450, yPos: 300, currentReindeer: -1, expectedReindeer: 7},
	box5 = {xPos: 500, yPos: 500, currentReindeer: -1, expectedReindeer: 3},
	box6 = {xPos: 650, yPos: 300, currentReindeer: -1, expectedReindeer: 4},
	box7 = {xPos: 700, yPos: 500, currentReindeer: -1, expectedReindeer: 6},
	box8 = {xPos: 850, yPos: 300, currentReindeer: -1, expectedReindeer: 1};
	
var boxes = [box0, box1, box2, box3, box4, box5, box6, box7, box8];

var draggingReindeer = null;
var loop;

$(document).ready(function() {
	// Initialize canvas and context
	canvas = $("#puzzleCanvas");
	ctx = canvas[0].getContext("2d");
	setCanvasWidth();
	canvas[0].height = CANVAS_HEIGHT;

	// Create event handlers
	$(window).on("resize", setCanvasWidth);
	canvas.on("mousedown", onDown);
	canvas.on("mouseup", onUp);
	canvas.on("mousemove", onMove);
	$("#submit").on("click", onSubmit);
	
	// Start loop
	loop = setInterval(update, TIME_PER_FRAME);
});

function setCanvasWidth() {
	canvasWidth = $("#canvasWidth").width();
	canvas[0].width = canvasWidth;
};

function onDown(e) {
	submitted = false;
	
	if (draggingReindeer == null) {
		var x = getXClick(e);
		var y = getYClick(e);
		for (var i = 0; i < reindeer.length; i++) {
			if (x > reindeer[i].xPos && x < reindeer[i].xPos + IMAGE_SIZE &&
					y > reindeer[i].yPos && y < reindeer[i].yPos + IMAGE_SIZE) {
				draggingReindeer = reindeer[i];
				setDraggingPosition(e);
				if (draggingReindeer.inBox != -1) {
					boxes[draggingReindeer.inBox].currentReindeer = -1;
					draggingReindeer.inBox = -1;
				}
			}
		}
	}
}

function onUp(e) {
	if (draggingReindeer != null) {
		var x = getXClick(e);
		var y = getYClick(e);
		for (var i = 0; i < boxes.length; i++) {
			if (x > boxes[i].xPos && x < boxes[i].xPos + BOX_SIZE &&
					y > boxes[i].yPos && y < boxes[i].yPos + BOX_SIZE) {
				draggingReindeer.xPos = boxes[i].xPos;
				draggingReindeer.yPos = boxes[i].yPos;
				draggingReindeer.inBox = i;
				boxes[i].currentReindeer = draggingReindeer.id;
			}
		}
		
		draggingReindeer = null;
	}
}

function onMove(e) {
	if (draggingReindeer != null) {
		setDraggingPosition(e);
	}
}

function onSubmit() {
	submitted = true;
	var correct = true;
	for (var i = 0; i < boxes.length; i++) {
		if (boxes[i].currentReindeer != boxes[i].expectedReindeer) {
			correct = false;
		}
	}
	
	if (correct) {
		$("#answer")[0].innerHTML = "Correct! Good job! To figure out which presents are yours, add the digits of the number together. If it's even, it's Mom's. If it's odd, it's Dad's.";
	} else {
		$("#answer")[0].innerHTML = "Sorry, try again!";
	}
}

function update() {
	clear();
	
	ctx.drawImage(santaImage, SANTA_X, SANTA_Y);
	
	for (var i = reindeer.length - 1; i >= 0; i--) {
		ctx.drawImage(reindeer[i].img, reindeer[i].xPos, reindeer[i].yPos);
	}
	
	for (var i = boxes.length - 1; i >= 0; i--) {
		if (submitted) {
			if (boxes[i].currentReindeer == boxes[i].expectedReindeer) {
				ctx.strokeStyle = "green";
				ctx.fillStyle = "green";
			} else {
				ctx.strokeStyle = "red";
				ctx.fillStyle = "red";
			}
		} else {
			ctx.strokeStyle = "black";
			ctx.fillStyle = "black";
		}
		
		ctx.strokeRect(boxes[i].xPos, boxes[i].yPos, BOX_SIZE, BOX_SIZE);
		ctx.font = "20px";
		ctx.fillText((i + 1).toString(), boxes[i].xPos + 70, boxes[i].yPos + 20);
		ctx.strokeStyle = "black";
		ctx.fillStyle = "black";
	}
	
	ctx.beginPath();
	ctx.moveTo(1050, 480);
	ctx.lineTo(125, 480);
	ctx.lineTo(125, 450);
	ctx.moveTo(175, 480);
	ctx.lineTo(175, 500);
	ctx.moveTo(325, 480);
	ctx.lineTo(325, 450);
	ctx.moveTo(375, 480);
	ctx.lineTo(375, 500);
	ctx.moveTo(525, 480);
	ctx.lineTo(525, 450);
	ctx.moveTo(575, 480);
	ctx.lineTo(575, 500);
	ctx.moveTo(725, 480);
	ctx.lineTo(725, 450);
	ctx.moveTo(775, 480);
	ctx.lineTo(775, 500);
	ctx.moveTo(925, 480);
	ctx.lineTo(925, 450);
	ctx.stroke();
	ctx.strokeRect(0, 0, canvasWidth, CANVAS_HEIGHT);
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
	var targetX = x - IMAGE_SIZE / 2;
	var targetY = y - IMAGE_SIZE / 2;
	if (targetX < 0) {
		targetX = 0;
	} else if (targetX + IMAGE_SIZE > canvasWidth) {
		targetX = canvasWidth - IMAGE_SIZE;
	}
	
	if (targetY < 0) {
		targetY = 0;
	} else if (targetY + IMAGE_SIZE > CANVAS_HEIGHT) {
		targetY = CANVAS_HEIGHT - IMAGE_SIZE;
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
