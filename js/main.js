'use strict';

var slides = document.querySelectorAll('.slides__item');
var indContainer = document.querySelector('.indicators');
var indicators = document.querySelectorAll('.indicators__item');
var currentSlide = 0;

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const SPACE = 32;
const PAUSE = '<i class="fas fa-pause"></i>';
const PLAY = '<i class="fas fa-play"></i>';

document.querySelector('.controls').style.display = 'block';
indContainer.style.display = 'flex';

// slider engine
var goToSlide = function (n) {
	slides[currentSlide].classList.toggle('active');
	indicators[currentSlide].classList.toggle('active');
	currentSlide = (n + slides.length) % slides.length;
	slides[currentSlide].classList.toggle('active');
	indicators[currentSlide].classList.toggle('active');
};

var nextSlide = function () {
	goToSlide(currentSlide + 1);
};

var prevSlide = function () {
	goToSlide(currentSlide - 1);
};

var pauseSlideShow = function () {
	pauseButton.innerHTML = PAUSE;
	playingStatus = false;
	clearInterval(slideInterval);
};

var playSlideShow = function () {
	pauseButton.innerHTML = PLAY;
	playingStatus = true;
	slideInterval = setInterval(nextSlide, 2000);
};

var slideInterval = setInterval(nextSlide, 2000);

// control buttons
var playingStatus = true;
var pauseButton = document.querySelector('.indicators__pause');
var nextButton = document.querySelector('.controls__next');
var prevButton = document.querySelector('.controls__prev');

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

pauseButton.addEventListener('click', pauseClickHandler);
prevButton.addEventListener('click', prevClickHandler);
nextButton.addEventListener('click', nextClickHandler);

// inicators
var indicatorsClickHandler = function (e) {
	let target = e.target;

	if (target.classList.contains('indicators__item')) {
		let n = target.getAttribute('data-slide-to') - 1;
		pauseSlideShow();
		goToSlide(n);
	}
};

indContainer.addEventListener('click', indicatorsClickHandler);

// keyboard controls
var keyControlsHandler = function (e) {
	if (e.keyCode === LEFT_ARROW) { prevClickHandler(); }
	if (e.keyCode === RIGHT_ARROW) { nextClickHandler(); }
	if (e.keyCode === SPACE) { pauseClickHandler(); }
};

document.addEventListener('keydown', keyControlsHandler);