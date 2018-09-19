var slides = $('.slides__item');
var indContainer = $('.indicators');
var indicators = $('.indicators__item');
var currentSlide = 0;

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const SPACE = 32;
const PAUSE = '<i class="fas fa-pause"></i>';
const PLAY = '<i class="fas fa-play"></i>';

$('.controls').show();
indContainer.css('display', 'flex');

// slider engine
var goToSlide = function (n) {
	slides[currentSlide].toggle('active');
	indicators[currentSlide].toggle('active');
	currentSlide = (n + slides.length) % slides.length;
	slides[currentSlide].toggle('active');
	indicators[currentSlide].toggle('active');
};

var nextSlide = function () {
	goToSlide(currentSlide + 1);
};

var prevSlide = function () {
	goToSlide(currentSlide - 1);
};

var pauseSlideShow = function () {
	pauseButton.html(PAUSE);
	playingStatus = false;
	clearInterval(slideInterval);
};

var playSlideShow = function () {
	pauseButton.html(PLAY);
	playingStatus = true;
	slideInterval = setInterval(nextSlide, 2000);
};

var slideInterval = setInterval(nextSlide, 2000);

// control buttons
var playingStatus = true;
var pauseButton = $('.indicators__pause');
var nextButton = $('.controls__next');
var prevButton = $('.controls__prev');

var pauseClickHandler = function () {
	playingStatus ? pauseSlideShow() : playSlideShow();
};
 
var nextClickHandler = function () {
	pauseSlideShow();
	nextSlide();
};

var prevClickHandler = function () {
	pauseSlideShow();
	prevSlide();
};

pauseButton.on('click', pauseClickHandler);
prevButton.on('click', prevClickHandler);
nextButton.on('click', nextClickHandler);

// inicators
var indicatorsClickHandler = function (e) {
	let target = e.target;

	if (target.contains('indicators__item')) {
		let n = target.attr('data-slide-to') - 1;
		pauseSlideShow();
		goToSlide(n);
	}
};

indContainer.on('click', indicatorsClickHandler);

// keyboard controls
var keyControlsHandler = function (e) {
	if (e.keyCode === LEFT_ARROW) { prevClickHandler(); }
	if (e.keyCode === RIGHT_ARROW) { nextClickHandler(); }
	if (e.keyCode === SPACE) { pauseClickHandler(); }
};

$on('keydown', keyControlsHandler);