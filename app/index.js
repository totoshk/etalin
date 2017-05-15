import 'normalize.css';
import 'animate.css';

require('../node_modules/owl.carousel/src/scss/owl.carousel.scss');
require('./scss/index.scss');
import 'owl.carousel';


$(function () {
    $('.owl-header-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
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

	$('#dropdownListTis').on('click', function (e) {
		$('#tisLampsOptions').toggle(300, )
	});
	$('#dropdownListLed').on('click', function (e) {
		$('#ledLampsOptions').toggle(300, )
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
		if (scrollOffset < scrollOffset+200) {
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



{
let tisLamps = [
		{
			name: "ЛПО 0,6м 2*18",
			bulbPower: 18,
			bulbQty: 2,
			lampPower: 36,
			article: "",
			type: "Люминисцентная",
			lifeTime: 2000,
			lampCost: 300,
			imgSrc: require("./images/calculator/lpo-two-small.jpg"),
			ledAnalogs: [
					{
						type: "led",
						name: "L-420-Line-0,6M-16-5K",
						lampPower: 16,
						lifeTime: 30000,
						lampCost: 1260,
						imgSrc: require("./images/calculator/led-line-one.jpg")
					},
					{
						type: "led",
						name: "L-422-TRI-P-0,6-18-5K",
						lampPower: 18,
						lifeTime: 30000,
						lampCost: 2700,
						imgSrc: require("./images/calculator/led-line-two.jpg")
					}
				]
		},
		{
			name: "ЛПО 1,2м 2*36",
			bulbPower: 36,
			bulbQty: 2,
			lampPower: 72,
			article: "",
			type: "Люминисцентная",
			lifeTime: 2000,
			lampCost: 500,
			imgSrc: require("./images/calculator/lpo-two-big.jpg"),
			ledAnalogs: [
					{
						type: "led",
						name: "L-421-Line-1,2M-32-5K",
						lampPower: 32,
						lifeTime: 30000,
						lampCost: 2100,
						imgSrc: require("./images/calculator/led-line-one-2.jpg")
					},
					{
						type: "led",
						name: "L-424-TRI-P-1,2-36-5K",
						lampPower: 36,
						lifeTime: 30000,
						lampCost: 4000,
						imgSrc: require("./images/calculator/led-line-two-big.jpg")
					}
				]
		},
		{
			name: "ЛПО 6060 4*18",
			bulbPower: 18,
			bulbQty: 4,
			lampPower: 72,
			article: "",
			type: "Люминисцентная",
			lifeTime: 2000,
			lampCost: 300,
			imgSrc: require("./images/calculator/lpo-four-small.png"),
			ledAnalogs: [
					{
						type: "led",
						name: "L-419-SPL6060-36-5K",
						lampPower: 36,
						lifeTime: 30000,
						lampCost: 5700,
						imgSrc: require("./images/calculator/L-419-SPL6060-36-5K.png")
					},
					{
						type: "led",
						name: "L-418-RPL6060-36-5K",
						lampPower: 36,
						lifeTime: 30000,
						lampCost: 3700,
						imgSrc: require("./images/calculator/led-block-two.png")
					}
				]
		},
		{
			name: "НПП 150",
			bulbPower: 150,
			bulbQty: 1,
			lampPower: 150,
			article: "",
			type: "Накаливания",
			lifeTime: 1000,
			lampCost: 150,
			imgSrc: require("./images/calculator/npp-small.jpg"),
			ledAnalogs: [
					{
						type: "led",
						name: "410-LED-OCL-15-6K",
						lampPower: 15,
						lifeTime: 30000,
						lampCost: 2700,
						imgSrc: require("./images/calculator/led-ocl.png")
					},
					{
						type: "led",
						name: "409-LED-OLL-15-6K",
						lampPower: 15,
						lifeTime: 30000,
						lampCost: 2700,
						imgSrc: require("./images/calculator/409-LED-OLL-15-6K.png")
					}
				]
		},
		{
			name: "НПП 200",
			bulbPower: 200,
			bulbQty: 1,
			lampPower: 200,
			article: "",
			type: "Накаливания",
			lifeTime: 1000,
			lampCost: 200,
			imgSrc: require("./images/calculator/npp-small.jpg"),
			ledAnalogs: [
					{
						type: "led",
						name: "412-LED-OCL-20-6K",
						lampPower: 20,
						lifeTime: 30000,
						lampCost: 3800,
						imgSrc: require("./images/calculator/led-ocl.png")
					},
					{
						type: "led",
						name: "411-LED-OLL-20-6K",
						lampPower: 20,
						lifeTime: 30000,
						lampCost: 3800,
						imgSrc: require("./images/calculator/409-LED-OLL-15-6K.png")
					}
				]
		},
	];

	const chosenValues = {
		tisLamp: null,
		ledLamp: null
	};

	// Элементы формы
	let calcFormLampPower = $('.calculator__form-group--power');
	let resultsBlock = $('.calculator__results');
	let economyResultsBlock = resultsBlock.find('.calculator__results-economy');
	let recoupmentResultsBlock = resultsBlock.find('.calculator__results-month');

	let availableTisTypes = tisLamps.reduce((prev, cur) => {
		prev.indexOf(cur.type) === -1 ? prev.push(cur.type) : null;
		return prev;
	}, []);
	// Фильтрующая функция списка по типу светильника
	let filterFunc = function (lampType) {
		return function(lamp) {
			return lamp.type === lampType;
		}
	}

	function electricityEconomy (ledLamp, tisLamp, tisLampQty, electricityTariff) {
		let replacementNumber = ledLamp.lifeTime / tisLamp.lifeTime;
		let replacementCost = tisLampQty * tisLamp.bulbQty * tisLamp.lampCost * replacementNumber;
		let tisElectricityCost = tisLampQty * tisLamp.lampPower * ledLamp.lifeTime * electricityTariff / 1000;
		let ledElectricityCost = tisLampQty * ledLamp.lampPower * ledLamp.lifeTime * electricityTariff / 1000;
		let electricityEconomy = tisElectricityCost - ledElectricityCost;

		return electricityEconomy;
	}

	function recoupment (ledLamp, tisLamp, tisLampQty, electricityTariff) {
		let replacementCost = tisLampQty * tisLamp.bulbQty * tisLamp.lampCost * (ledLamp.lifeTime / tisLamp.lifeTime);
		let tisToLedReplacementCost = tisLampQty * ledLamp.lampCost;
		let ledLampLifeTimeMonths = (ledLamp.lifeTime*12)/(365 * 8);
		let totalEconomy = electricityEconomy(ledLamp, tisLamp, tisLampQty, electricityTariff) + replacementCost;
		let recoupment = tisToLedReplacementCost / (totalEconomy / ledLampLifeTimeMonths);

		return Math.ceil(recoupment);
	}

	// Подтягиваем список ламп люминисцентных или накаливания в зависимости от выбора пользователя
	$('[name="tisBulbType"]').on('change', function (e){
		var selectedTisLampType = $(this).find('option:selected').text();
		let chosenLamps = tisLamps.filter(filterFunc(selectedTisLampType));
		updateLampsOptions(chosenLamps);
	});
	// Формируется список вариантов ламп
	function updateLampsOptions (lampsArr) {
		resetCalculator();
		let tisLampTypeSelect = $('#tisLampsOptions');
		let html = '';
		lampsArr.forEach(function (lamp, index) {
			html += `<div class="calculator-form__options-item calculator-form__tis-lamp clearfix" data-lamp='${JSON.stringify(lamp)}'>
						<div class="options-item__name">${lamp.name}</div>
						<div class="options-item__image">
							<img src="${lamp.imgSrc}" alt="${lamp.name}">
						</div>
					</div>`;
		});

		tisLampTypeSelect.html(html);

		$('.calculator-form__tis-lamp').on('click', function (e) {
			let lamp = JSON.parse(this.dataset.lamp);
			updateLedLampsOptions(lamp);
		});
	}
	// Формируетс список аналогов ламп LED, на основе выбора не лед лампы
	function updateLedLampsOptions (tisLamp) {
		let ledLampTypeSelect = $('#ledLampsOptions');
		let html = '';
		tisLamp.ledAnalogs.forEach(function (lamp, index) {
			html += `<div clacalcFormLampPowerss="calculator-form__options-item calculator-form__tis-lamp clearfix" data-lamp='${JSON.stringify(lamp)}'>
						<div class="options-item__name">${lamp.name}</div>
						<div class="options-item__image">
							<img src="${lamp.imgSrc}" alt="${lamp.name}">
						</div>
						<div class="options-item__price">
							${lamp.lampCost} тг
						</div>
					</div>`;
		});

		ledLampTypeSelect.html(html);
		calcFormLampPower.find('.calculator-form__field').html(tisLamp.lampPower);
		calcFormLampPower.slideDown();
	}



	// Вывод результатов по нажатия на кнопку РАССЧИТАТЬ (т.е. подтверждение формы)
	$('.calculator-form').on('submit', function(e) {
		resetCalculator();

		let electricityTariff = Number($('#electricityTariff').val());
		let tisLampQty = Number($('#tisLampQty').val());
		
		recoupmentResultsBlock.html(electricityEconomy(ledLamp, tisLamp, tisLampQty, electricityTariff) + ' мес');
		economyResultsBlock.html(recoupment(ledLamp, tisLamp, tisLampQty, electricityTariff) + ' тг');
		resultsBlock.removeClass('u-hidden');
		return false;
	});

	function resetCalculator() {
		resultsBlock.addClass('u-hidden');
		recoupmentResultsBlock.html('');
		economyResultsBlock.html('');
		calcFormLampPower.slideUp();
		// calcFormLampPower.find('.calculator-form__field').html('');
		$('#ledLampsOptions').html('');
	}
}