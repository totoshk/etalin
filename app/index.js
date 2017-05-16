import 'normalize.css';
import 'animate.css';

require('../node_modules/owl.carousel/src/scss/owl.carousel.scss');
require('./scss/index.scss');
import 'owl.carousel';
import './utils/calculator';


$(function () {
    $('.owl-header-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 7000,
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

        var id = this.getAttribute("href");
        var top = $(id).offset().top - 93;

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
		var titleOffset = $(".section-title").offset().top;
		if (titleOffset - scrollOffset < 10) {
			$(".section-title").addClass('animated fadeInDown')
		} 
	});
	
$(window).scroll(function(){
  var windowWidth = $(this).width();
  var windowHeight = $(this).height();
  var windowScrollTop = $(this).scrollTop();

  if(windowScrollTop<2300) {
	  $(".section-title").addClass('animated fadeInDown')
  } else {
	  $(".section-title").removeClass('animated fadeInDown')
  }
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
        // loop:true,
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




$(document).ready(function() {
	$('a#callback').click( function (event){
		event.preventDefault();
		$('.popup-form')
			.animate({top: '50%', opacity: 1}, 200,
				function(){
					$(this).css('display', 'block');
				}
			);
	});

	$('.popup-close').click( function(event){
		console.log("hello");
		$('.popup-form') 
			.animate({opacity: 0, top: '45%'}, 200, 
				function(){
					$(this).css('display', 'none')
				}
			);	
	});
});