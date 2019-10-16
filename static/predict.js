// TensorFlow.js - test biblioteki
// const t1 = tf.tensor([ [ 1, 2, 8 ], [ 3, 4, 2 ] ]);
// t1.print();

// => ustawienie stopki na dole
putFooterDown();
var predictionImg = document.getElementById('predict-loader');
predictionImg.style.visibility = 'hidden';

// => wybieranie obrazu z dysku
$('#image-selector').change(function() {
	// => tworzenie obiektu reader do wczytania zawartości obrazu
	let reader = new FileReader();
	reader.onload = function() {
		let dataUrl = reader.result;
		// => wyświetlanie wybranego obrazu na stronie
		$('#selected-image').attr('src', dataUrl);
		// => czyszczenie listy predykcji
		$('#prediction-list').empty();
	};

	// => wybranie pierwszego zaznaczonego obrazu w oknie wyboru
	let file = $('#image-selector').prop('files')[0];
	// => czytanie zawartości obrazu
	reader.readAsDataURL(file);
});

// => model AI
let model;
(async function() {
	// => ładowanie modelu VGG19 z pliku model.json zawierającego wskaźniki do plików wag
	model = await tf.loadModel('http://localhost:1973/tfjs-models/VGG19/model.json');
	$('.herman-loader').hide();
})();

async function runNeuralNetwork() {
	// => pobieram obraz z pliku
	let image = $('#selected-image').get(0);
	// => tworzę tensor z pikseli obrazu używając funkcji TF 'fromPixels'
	// => ustawiam rozmiar tensora na 224 x 224 - wymagany przez model VGG19
	// => konwertuję jego wartości na typ float

	// => WERSJA TENSORA PRZED OPTYMALIZACJĄ WAG
	//let tensor = tf.fromPixels(image).resizeNearestNeighbor([ 224, 224 ]).toFloat().expandDims();

	// PRZYGOTOWANA DO OPTTYMALIZACJI (bez rozszerzania - nastepi ono po optymalizacji wag tensora)
	let tensor = tf.fromPixels(image).resizeNearestNeighbor([ 224, 224 ]).toFloat();

	// ------------------------------------------------------------------------
	// => Optymalizacja wag
	// Od każdego pixela o kolorze R, G lub B odejmuje średnią dla tego koloru
	let meanImageNetRGB = {
		red: 123.68,
		green: 116.779,
		blue: 103.939
	};

	// => buduję tablicę jednowymiarowych tensorów
	let indices = [ tf.tensor1d([ 0 ], 'int32'), tf.tensor1d([ 1 ], 'int32'), tf.tensor1d([ 2 ], 'int32') ];

	// => uśredniam wartości Kolorów R, G, B, odejmując od wartości koloru (0-255) wartość średnią z ImageNet
	// tworzę obiekt zawierający tensory dla każdego uśrednionego koloru
	let centeredRGB = {
		red: tf.gather(tensor, indices[0], 2).sub(tf.scalar(meanImageNetRGB.red)).reshape([ 50176 ]),
		green: tf.gather(tensor, indices[1], 2).sub(tf.scalar(meanImageNetRGB.green)).reshape([ 50176 ]),
		blue: tf.gather(tensor, indices[2], 2).sub(tf.scalar(meanImageNetRGB.blue)).reshape([ 50176 ])
	};

	let optimizedTensor = tf
		.stack([ centeredRGB.red, centeredRGB.green, centeredRGB.blue ], 1)
		.reshape([ 224, 224, 3 ])
		.reverse(2)
		.expandDims();

	// ------------------------------------------------------------------------

	// => rozpoczynam predykcję wyników przekazując przygotowany tensor do funkcji TF predict
	// => zwraca on tensor wyjściowy (wyniki predykcji) na podstawie tensora wyjściowego (input)
	// => na tensorze wyjściowym wykonuję metodę 'data', która asynchronicznie ładuje otrzymane wartości z tensora do tablicy
	let predictions = await model.predict(optimizedTensor).data();
	// => tworzę listę 5 najbardziej prawdopodobnych wyników
	// z tablicy predykcji tworzę tablicę obiektów,
	// każdy z obiektów zawiera wartość prawdopodobieństwa co przedstawia obrazek
	// oraz nazwę klasy z IMAGENET => de facto AI zwraca jako output prawdopodobieństwo, że
	// obraz przedstawia taki numer klasy IMAGE_NET, oraz numer klasy - a ten numer klasy oznacza nazwę obiektu
	// który przedstawia obraz => pobieram zatem tę nazwę z pliku imagenet_classes.js
	// dodatkowo do kdego obiektu dodaję wartość procentową prawdopodobieństwa
	// => następnie sortuję obiekty po prawdopodobieństwie malejąco
	// i pobieram pierwsze trzy najwyższe wyniki
	let top3 = Array.from(predictions)
		.map(function(p, idx) {
			return {
				probability: p,
				percentage: (p * 100).toFixed(3).toString() + ' %',
				className: IMAGENET_CLASSES[idx]
			};
		})
		.sort(function(a, b) {
			return b.probability - a.probability;
		})
		.slice(0, 5);

	// => czyszczę listę predykcji po poprzednim obrazie
	$('#prediction-list').empty();
	// => i wyświetlam w niej nowe wyniki
	top3.forEach(function(item) {
		$('#prediction-list').append(`<li>${item.className}: ${item.percentage}</li>`);
	});

	predictionImg.style.visibility = 'hidden';
}

// => obsłużenie przycisku "Rozpoznaj obraz" => uruchomienie procesu rozpoznawania obrazu przez AI
$('#predict-button').click(function() {
	predictionImg.style.visibility = 'visible';
	runNeuralNetwork();
});

// => ustawienie stopki na dole
function putFooterDown() {
	var w = $(window).height();
	var footer = document.getElementById('herman-footer');
	var wint = parseInt(w) / 2;
	var margin = wint;
	footer.style.marginTop = margin.toString() + 'px';
}

window.addEventListener('resize', function(event) {
	putFooterDown();
});
