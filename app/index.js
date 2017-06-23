import 'normalize.css';
import 'animate.css';

require('../node_modules/owl.carousel/src/scss/owl.carousel.scss');
require('./scss/index.scss');
import './waypoints/lib/jquery.waypoints.js';
import 'owl.carousel';
import './utils/calculator';
require('./pdf/Catalog_Etalin_el.pdf');
require('./pdf/Catalog_office_lighting_Etalin_el.pdf');
require('./send.php');


$(function () {
	$('.owl-header-carousel').owlCarousel({
		loop: true,
		autoplay: true,
		autoplayTimeout: 15000,
		autoplaySpeed: 2000,
		nav : false, 
		// slideSpeed : 3000,
		// paginationSpeed : 1000,
		singleItem:true,
		autoWidth: false,
		items: 1,
		pagination: true
	});

	$('.anchor-link').on('click', function (e) {
		e.preventDefault();
		var navMenu = $('.header-nav__menu');
		var sandwich = $('.sandwich-menu')

		var id = this.getAttribute("href");
		var top = $(id).offset().top - 73;
		navMenu.removeClass('header-nav__menu-show');
		sandwich.removeClass('change');

		$('body,html').stop().animate({scrollTop: top}, 1000);
	});
	
	var headerNav = $('.header-nav');
	var $window = $(window);
	$window.on('scroll', function () {
		var scrollOffset = $window.scrollTop();
		if (scrollOffset > headerNav.height()) {
			headerNav.addClass('is-hidden');
		} else {
			headerNav.removeClass('is-hidden');
		};
	});
	
	document.querySelector('.sandwich-menu').addEventListener('click', openMenuFunction, false);
	function openMenuFunction(){
		var elem = this;

		if(elem.classList.contains('change')){
			elem.classList.remove('change');
		}else{
			elem.classList.add('change');
		};

		var menu = document.querySelector('.header-nav__menu');
		if(menu.classList.contains('header-nav__menu-show')){
			menu.classList.remove('header-nav__menu-show');
		}else{
			menu.classList.add('header-nav__menu-show');
		}
	};

	$('.owl-logo-carousel').owlCarousel({
		loop:true,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplaySpeed: 2000,
		margin:10,
		responsiveClass:true,
		nav: false,
		pagination: true,
		responsive:{
			320:{
				items:2,
			},
			768:{
				items:3,
			},
			1200:{
				items:6,
			}
		}
	});
});


// Всплывающие формы

$(document).ready(function(){
 
  $('.section-title').waypoint(function(dir) {
	  if (dir === 'down') {
		$(this.element).addClass('fadeInDown animated');
	  } else {
		  $(this.element).removeClass('fadeInDown');
	  }
  }, { offset: '80%' });

});


$(document).ready(function() {
	$('a#callback').click( function (event){
		event.preventDefault();
		showElement($('.popup-outer'));
		showElement($('#popup-form'));
		
	});

	$('a#servicecall').click( function (event){
		event.preventDefault();
		showElement($('.popup-outer'));
		showElement($('#popup-form__service'));
	});

	$('a#consultationCall').click( function (event){
		event.preventDefault();
		showElement($('.popup-outer'));
		showElement($('#popup-form__consult'));
	});

	$('.popup-outer').on('click', function(event) {
		event.stopPropagation();
		if ($(event.target).is($(this))) {
			hideElement($(this));
			hideElement($('.popup-form'));
		}
	});

	$('.popup-close').click(function (event) {
		hideElement($(this).parent());
		hideElement($('.popup-outer'));
	})
});

// Отправка формы

$(document).ready(function() {
	$("#form-consult").on('submit', handleFormSubmit);
	$("#form-callback").on('submit', handleFormSubmit);
	$("#form-contacts").on('submit', handleFormSubmit);
});

function handleFormSubmit (e) {
	e.preventDefault();
	sendFormData($(this));
}

function sendFormData ($form) {
	let formData = $form.serialize(); //собираем все данные из формы
	jQuery.ajax({
		type: "POST", //Метод отправки
		url: "php/send.php", //путь до php файла отправителя
		data: formData,
		success: () => {
			$form[0].reset();
			hideElement($form.parent('.popup-form'));
			showElement($('.popup-outer'));
			showElement($('#popup-form__thanks'));
		},
		error: () => {
			alert('Не удалось отправить запрос. Попробуйте позже.')
		}
	});
}

function hideElement ($elem) {
	$elem.animate({opacity: 0}, 200, 
		function(){
			$(this).css('display', 'none')
		}
	);
}

function showElement ($elem) {
	$elem.animate({opacity: 1}, 200, 
		function(){
			$(this).css('display', 'block')
		}
	);
}
