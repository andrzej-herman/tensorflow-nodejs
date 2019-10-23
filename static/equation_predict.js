var canvas;
let xs = [];
let ys = [];

document.addEventListener('click', onMouseClick, true);
createCanvas();

// => funkcja rysująca canvas
// => ustawiam jego rozmiar, kształt itd ...
function createCanvas() {
	canvas = document.getElementById('canvas');
}

function onMouseClick(e) {
	SetPixel(e.clientX, e.clientY);
}

// => funkcja rysująca punkt
function SetPixel(x, y) {
	if (checkIfDraw(x, y)) {
		var dimleft = parseInt(canvas.getBoundingClientRect().left);
		var dimtop = canvas.getBoundingClientRect().top;
		var xpos = x - dimleft;
		var ypos = y - dimtop;
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = '#fff';
		ctx.beginPath();
		ctx.arc(xpos, ypos, 1, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}
}

// => sprawdzanie czy kursor myszy jest w polu rysowania
function checkIfDraw(posX, posY) {
	var dims = canvas.getBoundingClientRect();
	if (posX > dims.left && posX < dims.right && posY > dims.top && posY < dims.bottom) return true;
	else return false;
}

// ---------------------------------------------------------------------------------------------------------
// OLD PIECE OF CODE

// TensorFlow.js - test biblioteki
// const t1 = tf.tensor([ [ 1, 2, 8, 10 ], [ 3, 4, 2, 3 ] ]);
// t1.print();

/**
 * Get the car data reduced to just the variables we are interested
 * and cleaned of missing data.
 */
// var color = Chart.helpers.color;
// async function getData() {
// 	const carsDataReq = await fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json');
// 	const carsData = await carsDataReq.json();
// 	const cleaned = carsData
// 		.map((car) => ({
// 			mpg: car.Miles_per_Gallon,
// 			horsepower: car.Horsepower
// 		}))
// 		.filter((car) => car.mpg != null && car.horsepower != null);

// 	return cleaned;
// }

// function generateData() {
// 	// const data = getData();
// 	// const values = data.map((d) => ({
// 	// 	x: d.horsepower,
// 	// 	y: d.mpg
// 	// }));
// 	// var data = [];
// 	// for (var i = 0; i < 7; i++) {
// 	// 	data.push({
// 	// 		x: randomScalingFactor(),
// 	// 		y: randomScalingFactor()
// 	// 	});
// 	// }
// 	// return values;
// }

// async function run() {
// 	var dataDisplay = await getData();
// 	const values = dataDisplay.map((d) => ({
// 		x: d.horsepower,
// 		y: d.mpg
// 	}));

// 	var scatterChartData = {
// 		datasets: [
// 			{
// 				label: 'MOC / SPALANIE',
// 				borderColor: window.chartColors.blue,
// 				backgroundColor: color(window.chartColors.blue).alpha(0.2).rgbString(),
// 				data: values
// 			}
// 		]
// 	};

// 	displayChart(scatterChartData);
// 	// More code will be added below
// }

// function displayChart(scatterChartData) {
// 	var color = Chart.helpers.color;
// 	var ctx = document.getElementById('canvas').getContext('2d');
// 	window.myScatter = Chart.Scatter(ctx, {
// 		data: scatterChartData,
// 		options: {
// 			title: {
// 				display: true,
// 				text: ''
// 			}
// 		}
// 	});
// }

// document.addEventListener('DOMContentLoaded', run);
