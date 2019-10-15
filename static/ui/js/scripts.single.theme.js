/* Dore Single Theme Initializer Script 

Table of Contents

01. Single Theme Initializer
*/

/* 01. Single Theme Initializer */

(function($) {
	if ($().dropzone) {
		Dropzone.autoDiscover = false;
	}
	var $dore = $('body').dore();
})(jQuery);

// centrowanie mojego logo
function centerLogo() {
	var w = $(window).width();
	var logo = document.getElementById('herman-logo');
	var wint = parseInt(w) / 2;
	var margin = wint - 185;
	logo.style.position = 'absolute';
	logo.style.marginLeft = margin.toString() + 'px';
}

centerLogo();

window.addEventListener('resize', function(event) {
	centerLogo();
});
