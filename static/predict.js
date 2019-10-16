// TensorFlow.js library test
// const t1 = tf.tensor([ [ 1, 2, 8 ], [ 3, 4, 2 ] ]);
// t1.print();

// => ustawienie stopki na dole
putFooterDown();

// // => wybieranie obrazu z dysku
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

	// 	// => wybranie pierwszego zaznaczonego obrazu w oknie wyboru
	let file = $('#image-selector').prop('files')[0];
	// => czytanie zawartości obrazu
	reader.readAsDataURL(file);
});

// // => model AI
let model;
(async function() {
	model = await tf.loadModel('http://localhost:1973/tfjs-models/VGG19/model.json');
	$('.progress-bar').hide();
})();

// // => ustawienie stopki na dole
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
