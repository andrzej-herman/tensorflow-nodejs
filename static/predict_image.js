// TensorFlow.js - test biblioteki
// const t1 = tf.tensor([ [ 1, 2, 8 ], [ 3, 4, 2 ] ]);
// t1.print();

async function loadModel() {
	$('#model-loader').show();
	model = undefined;
	// model = await tf.loadModel(`http://136.243.117.158:3001/tfjs-models/MobileNet/model.json`);
	model = await tf.loadModel(`http://localhost:3001/tfjs-models/MobileNet/model.json`);
	$('#model-loader').hide();
	document.getElementById('predict-button').disabled = true;
}

function preprocessImage(image) {
	let tensor = tf.fromPixels(image).resizeNearestNeighbor([ 224, 224 ]).toFloat();
	let offset = tf.scalar(127.5);
	return tensor.sub(offset).div(offset).expandDims();
}

async function runImageRecognition() {
	let image = $('#selected-image').get(0);
	let tensor = preprocessImage(image);
	var m = model;
	let predictions = await model.predict(tensor).data();
	let top5 = Array.from(predictions)
		.map(function(p, i) {
			return {
				probability: p,
				percentage: (p * 100).toFixed(4).toString() + ' %',
				className: IMAGENET_CLASSES[i]
			};
		})
		.sort(function(a, b) {
			return b.probability - a.probability;
		})
		.slice(0, 5);

	showResults(top5);
	$('#pred-loader').hide();
}

function getDisplayName(name) {
	var commas = name.split(',').length - 1;
	if (commas <= 1) {
		return name;
	} else {
		var parts = name.split(',');
		return parts[0] + ', ' + parts[1];
	}
}

function showResults(results) {
	var name1 = document.getElementById('res-name-01');
	var progress1 = document.getElementById('res-progress-01');
	var percent1 = document.getElementById('res-percent-01');
	name1.innerHTML = getDisplayName(results[0].className);
	var dp1 = (results[0].probability * 100).toString().substring(0, 2) + '%';
	progress1.style.width = dp1;
	percent1.innerHTML = results[0].percentage;
	var name2 = document.getElementById('res-name-02');
	var progress2 = document.getElementById('res-progress-02');
	var percent2 = document.getElementById('res-percent-02');
	name2.innerHTML = getDisplayName(results[1].className);
	var dp2 = (results[1].probability * 100).toString().substring(0, 2) + '%';
	progress2.style.width = dp2;
	percent2.innerHTML = results[1].percentage;
	var name3 = document.getElementById('res-name-03');
	var progress3 = document.getElementById('res-progress-03');
	var percent3 = document.getElementById('res-percent-03');
	name3.innerHTML = getDisplayName(results[2].className);
	var dp3 = (results[2].probability * 100).toString().substring(0, 2) + '%';
	progress3.style.width = dp3;
	percent3.innerHTML = results[2].percentage;
	var name4 = document.getElementById('res-name-04');
	var progress4 = document.getElementById('res-progress-04');
	var percent4 = document.getElementById('res-percent-04');
	name4.innerHTML = getDisplayName(results[3].className);
	var dp4 = (results[3].probability * 100).toString().substring(0, 2) + '%';
	progress4.style.width = dp4;
	percent4.innerHTML = results[3].percentage;
	var name5 = document.getElementById('res-name-05');
	var progress5 = document.getElementById('res-progress-05');
	var percent5 = document.getElementById('res-percent-05');
	name5.innerHTML = getDisplayName(results[4].className);
	var dp5 = (results[4].probability * 100).toString().substring(0, 2) + '%';
	progress5.style.width = dp5;
	percent5.innerHTML = results[4].percentage;
	$('#results-set').show();
}

let model;
loadModel();

$('#image-selector').change(function() {
	let reader = new FileReader();
	reader.onload = function() {
		let dataURL = reader.result;
		$('#selected-image').attr('src', dataURL);
	};
	let file = $('#image-selector').prop('files')[0];
	reader.readAsDataURL(file);
	var titleBig = document.getElementById('image-set');
	titleBig.innerHTML = 'Wybrano obraz';
	var titleSmall = document.getElementById('image-filename');
	titleSmall.innerHTML = 'Nazwa pliku: ' + file.name;
	document.getElementById('predict-button').disabled = false;
});

$('#predict-button').click(function() {
	$('#pred-loader').show();
	runImageRecognition();
});

$('#reset-button').click(function() {
	document.getElementById('image-selector').value = '';
	document.getElementById('image-set').innerHTML = 'Brak wybranego obrazu do rozpoznania';
	document.getElementById('image-filename').innerHTML = '';
	$('#selected-image').attr('src', 'ui/images/empty.jpeg');
	document.getElementById('predict-button').disabled = true;
	$('#results-set').hide();
});

// ---------------------------------------------------------------------
// STARA WERSJA
// // => wybieranie obrazu z dysku
// $('#image-selector').change(function() {
// 	// => tworzenie obiektu reader do wczytania zawartości obrazu
// 	let reader = new FileReader();
// 	reader.onload = function() {
// 		let dataUrl = reader.result;
// 		// => wyświetlanie wybranego obrazu na stronie
// 		$('#selected-image').attr('src', dataUrl);
// 		// => czyszczenie listy predykcji
// 		$('#prediction-list').empty();
// 	};

// 	// => wybranie pierwszego zaznaczonego obrazu w oknie wyboru
// 	let file = $('#image-selector').prop('files')[0];
// 	// => czytanie zawartości obrazu
// 	reader.readAsDataURL(file);
// });

// // => model AI
// let model;
// (async function() {
// 	// => ładowanie modelu VGG19 z pliku model.json zawierającego wskaźniki do plików wag
// 	model = await tf.loadModel('http://localhost:1973/tfjs-models/VGG19/model.json');
// 	$('.herman-loader').hide();
// })();

// async function runNeuralNetwork() {
// 	// => pobieram obraz z pliku
// 	let image = $('#selected-image').get(0);
// 	// => tworzę tensor z pikseli obrazu używając funkcji TF 'fromPixels'
// 	// => ustawiam rozmiar tensora na 224 x 224 - wymagany przez model VGG19
// 	// => konwertuję jego wartości na typ float

// 	// => WERSJA TENSORA PRZED OPTYMALIZACJĄ WAG
// 	//let tensor = tf.fromPixels(image).resizeNearestNeighbor([ 224, 224 ]).toFloat().expandDims();

// 	// PRZYGOTOWANA DO OPTTYMALIZACJI (bez rozszerzania - nastepi ono po optymalizacji wag tensora)
// 	let tensor = tf.fromPixels(image).resizeNearestNeighbor([ 224, 224 ]).toFloat();

// 	// ------------------------------------------------------------------------
// 	// => Optymalizacja wag
// 	// Od każdego pixela o kolorze R, G lub B odejmuje średnią dla tego koloru
// 	let meanImageNetRGB = {
// 		red: 123.68,
// 		green: 116.779,
// 		blue: 103.939
// 	};

// 	// => buduję tablicę jednowymiarowych tensorów
// 	let indices = [ tf.tensor1d([ 0 ], 'int32'), tf.tensor1d([ 1 ], 'int32'), tf.tensor1d([ 2 ], 'int32') ];

// 	// => uśredniam wartości Kolorów R, G, B, odejmując od wartości koloru (0-255) wartość średnią z ImageNet
// 	// tworzę obiekt zawierający tensory dla każdego uśrednionego koloru
// 	let centeredRGB = {
// 		red: tf.gather(tensor, indices[0], 2).sub(tf.scalar(meanImageNetRGB.red)).reshape([ 50176 ]),
// 		green: tf.gather(tensor, indices[1], 2).sub(tf.scalar(meanImageNetRGB.green)).reshape([ 50176 ]),
// 		blue: tf.gather(tensor, indices[2], 2).sub(tf.scalar(meanImageNetRGB.blue)).reshape([ 50176 ])
// 	};

// 	let optimizedTensor = tf
// 		.stack([ centeredRGB.red, centeredRGB.green, centeredRGB.blue ], 1)
// 		.reshape([ 224, 224, 3 ])
// 		.reverse(2)
// 		.expandDims();

// 	// ------------------------------------------------------------------------

// 	// => rozpoczynam predykcję wyników przekazując przygotowany tensor do funkcji TF predict
// 	// => zwraca on tensor wyjściowy (wyniki predykcji) na podstawie tensora wyjściowego (input)
// 	// => na tensorze wyjściowym wykonuję metodę 'data', która asynchronicznie ładuje otrzymane wartości z tensora do tablicy
// 	let predictions = await model.predict(optimizedTensor).data();
// 	// => tworzę listę 5 najbardziej prawdopodobnych wyników
// 	// z tablicy predykcji tworzę tablicę obiektów,
// 	// każdy z obiektów zawiera wartość prawdopodobieństwa co przedstawia obrazek
// 	// oraz nazwę klasy z IMAGENET => de facto AI zwraca jako output prawdopodobieństwo, że
// 	// obraz przedstawia taki numer klasy IMAGE_NET, oraz numer klasy - a ten numer klasy oznacza nazwę obiektu
// 	// który przedstawia obraz => pobieram zatem tę nazwę z pliku imagenet_classes.js
// 	// dodatkowo do kdego obiektu dodaję wartość procentową prawdopodobieństwa
// 	// => następnie sortuję obiekty po prawdopodobieństwie malejąco
// 	// i pobieram pierwsze trzy najwyższe wyniki
// 	let top3 = Array.from(predictions)
// 		.map(function(p, idx) {
// 			return {
// 				probability: p,
// 				percentage: (p * 100).toFixed(3).toString() + ' %',
// 				className: IMAGENET_CLASSES[idx]
// 			};
// 		})
// 		.sort(function(a, b) {
// 			return b.probability - a.probability;
// 		})
// 		.slice(0, 5);

// 	// => czyszczę listę predykcji po poprzednim obrazie
// 	$('#prediction-list').empty();
// 	// => i wyświetlam w niej nowe wyniki
// 	top3.forEach(function(item) {
// 		$('#prediction-list').append(`<li>${item.className}: ${item.percentage}</li>`);
// 	});

// 	predictionImg.style.visibility = 'hidden';
// }

// // => obsłużenie przycisku "Rozpoznaj obraz" => uruchomienie procesu rozpoznawania obrazu przez AI
// $('#predict-button').click(function() {
// 	predictionImg.style.visibility = 'visible';
// 	runNeuralNetwork();
// });
