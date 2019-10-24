// => błąd nieprawidłowej wartości learningRate
const lrError = 'Proszę wprowadzić prawidłową wartość współczynnika learning rate.' + 
'należy uzyć kropki, a nie przecinka. Wartość musi być w zakresie od 0 do 1.'


// element canvas do tworzenia układu współrzędnych
let cnv;

// input do wprowadzania wartości learningRate
let lrInput = document.getElementById('lrate');

// tablice przechowujące argumenty x (xs) oraz wartości funkcji postaci f(x) = ax + b (ys)
let x_vals = [];
let y_vals = [];

// => wagi a i b
// => są to współczynniki a i b funkcji liniowej postaci f(x) = ax + b
let a, b;

// => learningRate sieci neuronowej
// to współczynnik mówiący mniej więcej jak szybko nowe wytrenowane wartośc zastępują poprzednie
let lR = 0.5;

// sprawdzanie czy Użytkownik kliknął w obrębie układu współrzędnych
function checkGoodClick() {
	let result = false;
	// miejsca kliknięć
	var mx = cnv.position().x + mouseX;
	var my = cnv.position().y + mouseY;
	// narożniki układu współrzędnych
	var left = cnv.position().x;
	var right = cnv.position().x + 600;
	var top = cnv.position().y;
	var bottom = cnv.position().y + 600;
	if (mx > left && mx < right && my > top && my < bottom) result = true;

	return result;
}

// start programu
function setup() {
	lrInput.value = lR;
	// => rysuję układ współrzędnych wraz z osiami
	// => tworzę element canvas
	cnv = createCanvas(600, 600);
	cnv.parent('canvas-holder');
	background(21, 105, 121);
	// => rysuję osie
	drawAxis();
	// => ustawiam początkowe wartości współczynnilków a i b
	// czyli nadaję początkowy kierunek linii będącej wykresem funkcji f(x) = ax + b
	// mogą to być dowolne wartości
	// => ponieważ wartości te podczas trenowania sieci neuronowe jbędą się zmieniać
	// muszą to być zmienne w rozumieniu biblioteki TensorFlow.js
	// ustawiam początkową ich wartość na a: 1, b = 0 - będzie to zatem linia nachylona do osi x pod kątem 45 st.
	// funkcja przjmie postać: f(x) = 1x + 0, czyli f(x) = x
	var pocz_a = 1;
	var pocz_b = 0;
	// opcja z losowymi wartościami początkowymi wag a i b
	// var pocz_a = random(1);
	// var pocz_b = random(1);
	// => tworzę zatem zmienne TF
	a = tf.variable(tf.scalar(pocz_a));
	b = tf.variable(tf.scalar(pocz_b));
}

// => tzw funkcja minimalnej straty (loss function)
// oblicza bezwzględną średnią odległość punktu ze zbioru danych od przewidywanej linii
// ponieważ nie jest istotny kierunek odchylenia wartość podnoszę do kwadratu
// paramatry: pred => to wartości funkcji f(x) (ys) uzyskane z funkcji predict
// real => rzeczywiste wartości f(x) (ys) z punktów danych (które narysowałem)
function loss(pred, real) {
	// zwracam => średnią wartość z różnicy pomiędzy punktami przewidywanymi minus rzeczywistymi podniesioną do kwadratu
	return pred.sub(real).square().mean();
}

// => funkcja obliczjąca wartości y (f(x)) dla uzyskanych w wyniku treningu sieci
// współczynników a i b
function predict(x) {
	// => z wartości wejściowych (tablicy xs) tworzę tensor
	const xs = tf.tensor1d(x);
	// obliczam ys na podstawie wzoru y = ax + b
	const ys = xs.mul(a).add(b);
	return ys;
}

// => zdarfzenie na klikniecie myszą
// => rysuję punkt na układzie i dodaję go do tablic z argumentami i wartościami funkcji
function mousePressed() {
	if (checkGoodClick()) {
		var lRateVal = parseFloat(lrInput.value);
		if (isNaN(lRateVal) || lRateVal < 0 || lRateVal > 1) {
			alert(lrError);
			return;
		} else {
			lR = lRateVal;
		}
		let x = map(mouseX, 0, width, 0, 1);
		let y = map(mouseY, 0, height, 1, 0);
		x_vals.push(x);
		y_vals.push(y);
		// wyświetlanie tabeli punktów
		updateTable();
	}
}

// => funkcja rysująca punkty oraz przewidzianą przez NN linię (wykres funkcji postaci f(x) = ax + b
// gdzie a i b zostały ustalone (wytrenowane) przez optimizer
function draw() {
	// => optymizer NN
	// czyli jaki algorytm zostanie użyty do trenowania sieci aby wartość funkcji straty była jak najmniejsza
	// wybieram algorytm stochastycznego spadku gradientu (SGD - stochastic gradient descent)
	// jest on dostepny w TensorFlow, przekazujemy do funkcji parametr learningRate
	// trenowanie polega na takim dobraniu współczynników a i b aby zminimalizować wartość funkcji straty
	// innymi słowy linia powstała w wyniku treningu będzie możliwie najbliżej wszystkich punktów z zestawu danych
	const optimizer = tf.train.sgd(lR);
	// => ponieważ podczas trenowania sieci TensorFlow tworzy za każem razy nowy tensor
	// (a dokładniej: funkcje loss i predict tworzą wiele tensorów)
	// istnieje konieczność zwolnienia ich z pamięci po wykonanym procesie
	// służy do tego metoda TF tf.tidy()
	tf.tidy(() => {
		if (x_vals.length > 1) {
			const ys = tf.tensor1d(y_vals);
			optimizer.minimize(() => loss(predict(x_vals), ys));			
		}
	});

	background(21, 105, 121);
	// osie
	drawAxis();
	// punkty
	stroke(255);
	strokeWeight(6);
	for (let idx = 0; idx < x_vals.length; idx++) {
		let px = map(x_vals[idx], 0, 1, 0, width);
		let py = map(y_vals[idx], 0, 1, height, 0);
		point(px, py);
	}
	// wykres
	drawLine();
	// wyświetlanie równania`
	displayEquation();
}

function updateTable() {
	var table = document.getElementById('positions');
	table.innerHTML = '';
	var content = '<thead><tr><th>#</th><th>x</th><th>f(x)</th></tr></thead><tbody>';
	for (let idx = 0; idx < x_vals.length; idx++) {
		content += '<tr><td>';
		content += (idx+1).toString();
		content += '</td><td>';
		content += (x_vals[idx] - 0.8333).toFixed(4).toString();
		content += '</td><td>';
		content += (y_vals[idx] - 0.8333).toFixed(4).toString();
		content += '</td></tr>';
	}

	content += '</tbody>';
	table.innerHTML = content;
}


// => funkcja rysująca przewidywany wykres (linię postaci ax + b)
function drawLine() {
	const lineX = [ 0, 1 ];
	const ys = tf.tidy(() => predict(lineX));
	// => ponieważ ys jest tensorem, muszę wyciągnąć z niego wartości
	// służy do tego metoda TF dataSync()
	let lineY = ys.dataSync();
	ys.dispose();

	let x1 = map(lineX[0], 0, 1, 0, width);
	let x2 = map(lineX[1], 0, 1, 0, width);
	let y1 = map(lineY[0], 0, 1, height, 0);
	let y2 = map(lineY[1], 0, 1, height, 0);

	stroke(255, 240, 0);
	strokeWeight(2);
	line(x1, y1, x2, y2);
}

// => rysowanie osi układu współrzędnych
function drawAxis() {
	background(21, 105, 121);
	stroke(255, 255, 255);
	strokeWeight(2);
	line(50, 550, 50, 50);
	line(50, 550, 550, 550);
	textSize(25);
	fill(255);
	text('f(x)', 10, 10, 120, 120);
	text('1', 25, 50, 80, 90);
	text('x', 570, 550, 120, 120);
	text('1', 550, 520, 80, 90);
	textSize(16);
	text('0.5', 20, 300, 80, 90);
	text('0.5', 300, 570, 80, 90);
}

// => wyswietlanie aktualnej postaci równania
function displayEquation() {
	var res = document.getElementById('result');
	var plain_a = a.dataSync();
	var plain_b = b.dataSync();
	var da = plain_a[0] == 0 ? '' : plain_a[0] == 1 ? 'x' : plain_a[0].toFixed(4).toString() + 'x';
	var db = plain_b[0] == 0 ? '' : ' + ' + plain_b[0].toFixed(4).toString();
	res.innerHTML = 'f(x) = ' + da + db;
}

// => czyszczenie danych
function clearData() {
	location.reload();
}

// => ustawianie wartości learning rate
function setLr() {
	var lRateVal = parseFloat(lrInput.value);
		if (isNaN(lRateVal) || lRateVal < 0 || lRateVal > 1) {
			alert(lrError);
			return;
		} else {
			lR = lRateVal;
		}
}

