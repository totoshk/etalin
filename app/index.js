import 'normalize.css';
require('../node_modules/owl.carousel/src/scss/owl.carousel.scss');
require('./scss/index.scss');
import 'owl.carousel';


$(function () {
    $('.owl-carousel').owlCarousel({
        navigation : true, 
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true,
        autoWidth: false,
        items: 1,
        pagination: true
    });

    $('.header-nav__item a').on('click', function (e) {
        e.preventDefault();

        var id = this.getAttribute("href");
        var top = $(id).offset().top - 53;

        $('body,html').animate({scrollTop: top}, 1000);
    });
})

$('.partners .owl-carousel').owlCarousel({
    items:6,
    itemsTablet: [768, 3],
    itemsMobile: [425, 2],
    lazyLoad:true,
    loop:true,
    margin:10,
    slideSpeed: 300,
    stopOnHover: true
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