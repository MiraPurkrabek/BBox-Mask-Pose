window.HELP_IMPROVE_VIDEOJS = false;

function debounce(func, wait) {
	let timeout;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			func.apply(context, args);
		}, wait);
	};
}

function syncPublicationLinksWidth() {
	const $title = $('.publication-title');
	const $links = $('.publication-links');

	if (!$title.length || !$links.length) {
		return;
	}

	// Reset before measuring to accommodate responsive changes
	$links.css('width', 'auto');

	const titleWidth = $title.outerWidth();
	const parentWidth = $links.parent().innerWidth() || titleWidth;
	const measuredWidth = Math.min(titleWidth, parentWidth);

	if (measuredWidth) {
		$links.css('width', measuredWidth + 'px');
	}
}

$(document).ready(function() {
	// Check for click events on the navbar burger icon

	const $burger = $('.navbar-burger');
	const $menu = $('#site-navbar');
	if ($burger.length && $menu.length) {
		$burger.on('click', function () {
			$burger.toggleClass('is-active');
			$menu.toggleClass('is-active');
		});
	}

	var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
	}

		// Initialize all div with carousel class
	var carousels = bulmaCarousel.attach('.carousel', options);
	
	bulmaSlider.attach();

	const resizeHandler = debounce(syncPublicationLinksWidth, 120);
	syncPublicationLinksWidth();
	$(window).on('resize', resizeHandler);
});

window.addEventListener('load', syncPublicationLinksWidth);
