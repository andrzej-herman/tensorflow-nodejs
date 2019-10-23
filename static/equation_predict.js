let xs = [];
let ys = [];

function setup() {
	var cnv = createCanvas(500, 500);
	cnv.parent('canvas-holder');
	background(21, 105, 121);
	drawLine();
}

function draw() {}

function drawLine() {
	background(21, 105, 121);
	stroke(255, 255, 255);
	line(10, 400, 10, 200);
}

function mousePressed() {}

// Stary kod
// --------------------------------------------------------------------
// var X = [];
// var Y = [];
// var M, B;

// const m = tf.variable(tf.scalar(Math.random()));
// const b = tf.variable(tf.scalar(Math.random()));

// const learningRate = 0.5;
// const optimizer = tf.train.sgd(learningRate);

// function setup() {
// 	var cnv = createCanvas(900, 500);
// 	cnv.parent('canvas-holder');
// 	background(21, 105, 121);
// }

// function draw() {
// 	background(21, 105, 121);
// 	plotData();

// 	if (X.length) {
// 		tf.tidy(() => {
// 			const xs = tf.tensor(X, [ X.length, 1 ]);
// 			const ys = tf.tensor(Y, [ Y.length, 1 ]);

// 			train(xs, ys);

// 			M = m.dataSync()[0];
// 			B = b.dataSync()[0];
// 		});
// 		drawLine();
// 		var res = document.getElementById('result');
// 		res.innerHTML = 'f(x) = ' + M.toFixed(3).toString() + 'x + ' + B.toFixed(3).toString();
// 	}
// }

// function predict(x) {
// 	// y = m * x + b
// 	return m.mul(x).add(b);
// }

// function loss(predictions, labels) {
// 	// Mean Squared Error
// 	return predictions.sub(labels).square().mean();
// }

// function train(xs, ys, numIterations = 1) {
// 	for (let iter = 0; iter < numIterations; iter++) {
// 		optimizer.minimize(() => loss(predict(xs), ys));
// 	}
// }

// function h(x) {
// 	return B + M * x;
// }

// function drawLine() {
// 	let x1 = 0.0;
// 	let y1 = h(x1);
// 	let x2 = 1.0;
// 	let y2 = h(x2);

// 	let denormX1 = Math.floor(map(x1, 0, 1, 0, width));
// 	let denormY1 = Math.floor(map(y1, 0, 1, 0, height));
// 	let denormX2 = Math.floor(map(x2, 0, 1, 0, width));
// 	let denormY2 = Math.floor(map(y2, 0, 1, 0, height));

// 	stroke(255, 240, 0);
// 	line(denormX1, denormY1, denormX2, denormY2);
// }

// function mousePressed() {
// 	let normX = map(mouseX, 0, width, 0, 1);
// 	let normY = map(mouseY, 0, height, 1, 0);

// 	X.push(normX);
// 	Y.push(normY);
// }

// function plotData() {
// 	noStroke();
// 	fill(255);
// 	for (let i = 0; i < X.length; i++) {
// 		let denormX = Math.floor(map(X[i], 0, 1, 0, width));
// 		let denormY = Math.floor(map(Y[i], 0, 1, 0, height));
// 		ellipse(denormX, denormY, 6);
// 	}
// 	noFill();
// }

// function clearData() {
// 	location.reload();
// }
