import 'normalize.css';

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

    $('.header-nav__item a').on('click', function (e) {
        e.preventDefault();

        var id = this.getAttribute("href");
        var top = $(id).offset().top - 93;

        $('body,html').animate({scrollTop: top}, 1000);
    });

	
	var headerNav = $('.header-nav');
	var $window = $(window);
	$window.on('scroll', function () {
		var scrollOffset = $window.scrollTop();
		if (scrollOffset > headerNav.height()) {
			headerNav.addClass('is-hidden');
		} else {
			headerNav.removeClass('is-hidden');
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
			.animate({opacity: 1, bottom: '50%'}, 200,
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
			lampCost: 300
		},
		{
			name: "ЛПО 0,6м 2*18",
			bulbPower: 18,
			bulbQty: 2,
			lampPower: 36,
			article: "",
			type: "Накаливания",
			lifeTime: 2000,
			lampCost: 300
		},
		{
			name: "хер 0,6м 2*18",
			bulbPower: 18,
			bulbQty: 2,
			lampPower: 36,
			article: "",
			type: "Накаливания",
			lifeTime: 2000,
			lampCost: 300
		},
	];

	let ledLamps = [
		{
			type: "led",
			name: "",
			lampPower: 16,
			lifeTime: 30000,
			lampCost: 1260,
		}
	];

	let availableTisTypes = tisLamps.reduce((prev, cur) => {
		prev.indexOf(cur.type) === -1 ? prev.push(cur.type) : null;
		return prev;
	}, []);

	let filterFunc = function (lampType) {
		return function(lamp) {
			return lamp.type === lampType;
		}
	}


	function electricityEconomy (ledLamp, tisLamp, tisLampQty, electricityTariff) {
		let replacementNumber = calcReplacementNumber(ledLamp, tisLamp);
		let replacementCost = tisLampQty * tisLamp.bulbQty * tisLamp.lampCost * replacementNumber;
		let tisElectricityCost = tisLampQty * tisLamp.lampPower * ledLamp.lifeTime * electricityTariff / 1000;
		let ledElectricityCost = tisLampQty * ledLamp.lampPower * ledLamp.lifeTime * electricityTariff / 1000;
		let electricityEconomy = tisElectricityCost - ledElectricityCost;

		return electricityEconomy;
	}

	function recoupment (ledLamp, tisLamp, tisLampQty, electricityTariff) {
		let replacementCost = tisLampQty * tisLamp.bulbQty * tisLamp.lampCost * calcReplacementNumber(ledLamp, tisLamp);
		let tisToLedReplacementCost = tisLampQty * ledLamp.lampCost;
		let ledLampLifeTimeMonths = (ledLamp.lifeTime*12)/(365 * 8);
		let totalEconomy = electricityEconomy(ledLamp, tisLamp, tisLampQty, electricityTariff) + replacementCost;
		let recoupment = tisToLedReplacementCost / (totalEconomy / ledLampLifeTimeMonths);

		return Math.ceil(recoupment);
	}

	function calcReplacementNumber (ledLamp, tisLamp) {
		return ledLamp.lifeTime / tisLamp.lifeTime;
	}


	$('[name="tisBulbType"]').on('change', function (e){
		var selectedTisLampType = $(this).find('option:selected').text();
		let chosenLamps = tisLamps.filter(filterFunc(selectedTisLampType));
		updateLampsOptions(chosenLamps);
	});

	function updateLampsOptions (lampsArr) {
		let tisLampTypeSelect = $('.huy');
		let html = '<div disbled="">Выбрать из списка</div>';
		lampsArr.forEach(function (lamp, index) {
			html += '<div>' + lamp.name + '</div>';
		});

		tisLampTypeSelect.html(html);
	}
}

// $('body').click(function () {
// 	        var obj_form=document.forms.cl_form;
// 	        var obj_pole_total_type_lighting_hidden=obj_form.total_type_lighting_hidden;
// 	        var obj_pole_number_lightiing=obj_form.number_lightiing;
// 	        var obj_pole_tariff_for_electro=obj_form.tariff_for_electro;
// 	        var obj_pole_total_type_lamp=obj_form.total_type_lamp;

//           	if (obj_pole_total_type_lighting_hidden.value=='Прожектор МГЛ-100'){

//           		$("#led-line-one").prop('checked', true);

//           		if ($("#led-line-one").prop("checked"))	{

//             	// $('.all-block-one-of-led.two').removeClass('focus');

//             	// мощность светильника скрытая
// 	          	var total_power_lighting_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.one.focus .power-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-power-lighting-led-hidden').value = total_power_lighting_hidden;
// 	          	//

// 	          	// время работы скрытая
// 	          	var total_time_job_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.one.focus .time-job-led-hidden').innerHTML;
// 	          	document.getElementById('total-time-job-led-hidden').value = total_time_job_hidden;
// 	          	//

// 	          	// стоимость лампы скрытая
// 	          	var total_cost_lamp_lighting_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.one.focus .cost-lamp-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = total_cost_lamp_lighting_hidden;

// 	          	//

// 	          	// 

//             	$('.all-block-one-of-led.two').removeClass('focus');


// 	          	$('.button-calc').fadeIn(0);

//             }

//           		// существует

//           			$('.right-block-calc').fadeIn(0);
//           			$('.right-block-calc-two').fadeOut(0);
//           			$('.right-block-calc-three').fadeOut(0);
//           			$('.all-block-one-of-led-fade').fadeIn(0);
//           			$('.all-block-two-of-led-fade').fadeOut(0);
//           			$('.all-block-three-of-led-fade').fadeOut(0);

//           			$('.button-calc').fadeIn(0);
//         	}

// 	        else if (obj_pole_total_type_lighting_hidden.value=='Прожектор МГЛ-150'){
// 	        	// существует

// 	        		$("#led-line-three").prop('checked', true);

// 	        		if ($("#led-line-three").prop("checked"))	{

// 		            	// $('.all-block-one-of-led.two').removeClass('focus');

// 		            	// мощность светильника скрытая
// 			          	var total_power_lighting_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.three.focus .power-lighting-led-hidden').innerHTML;
// 			          	document.getElementById('total-power-lighting-led-hidden').value = total_power_lighting_hidden;
// 			          	//

// 			          	// время работы скрытая
// 			          	var total_time_job_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.three.focus .time-job-led-hidden').innerHTML;
// 			          	document.getElementById('total-time-job-led-hidden').value = total_time_job_hidden;
// 			          	//

// 			          	// стоимость лампы скрытая
// 			          	var total_cost_lamp_lighting_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.three.focus .cost-lamp-lighting-led-hidden').innerHTML;
// 			          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = total_cost_lamp_lighting_hidden;

// 			          	//

// 		            	$('.all-block-one-of-led.four').removeClass('focus');


// 			          	$('.button-calc').fadeIn(0);

// 		            }

// 	        		$('.right-block-calc').fadeIn(0);
// 	        		$('.right-block-calc-two').fadeOut(0);
// 	        		$('.right-block-calc-three').fadeOut(0);
// 	        		$('.all-block-one-of-led-fade').fadeOut(0);
//           			$('.all-block-two-of-led-fade').fadeIn(0);
//           			$('.all-block-three-of-led-fade').fadeOut(0);

//           			$('.button-calc').fadeIn(0);
// 	        }

// 	        else if (obj_pole_total_type_lighting_hidden.value=='Прожектор МГЛ-250'){
// 	        	// существует

// 	        		$("#led-line-six").prop('checked', true);

// 	        		if ($("#led-line-six").prop("checked"))	{

// 		            	// $('.all-block-one-of-led.one').removeClass('focus');

// 		            	// мощность светильника скрытая
// 			          	var total_power_lighting_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.six.focus .power-lighting-led-hidden').innerHTML;
// 			          	document.getElementById('total-power-lighting-led-hidden').value = total_power_lighting_hidden;
// 			          	//

// 			          	// время работы скрытая
// 			          	var total_time_job_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.six.focus .time-job-led-hidden').innerHTML;
// 			          	document.getElementById('total-time-job-led-hidden').value = total_time_job_hidden;
// 			          	//

// 			          	// стоимость лампы скрытая
// 			          	var total_cost_lamp_lighting_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.six.focus .cost-lamp-lighting-led-hidden').innerHTML;
// 			          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = total_cost_lamp_lighting_hidden;
// 			          	//
// 			          	// 

// 		            	$('.all-block-one-of-led.five').removeClass('focus');

// 			          	$('.button-calc').fadeIn(0); 	

// 		            }
	        		

// 	        		$('.right-block-calc').fadeIn(0);
// 	        		$('.right-block-calc-two').fadeOut(0);
// 	        		$('.right-block-calc-three').fadeOut(0);
// 	        		$('.all-block-one-of-led-fade').fadeOut(0);
//           			$('.all-block-two-of-led-fade').fadeOut(0);
//           			$('.all-block-three-of-led-fade').fadeIn(0);

//           			$('.button-calc').fadeIn(0);
// 	        }

// 	        else if (obj_pole_total_type_lighting_hidden.value=='РКУ 250'){
// 	        	// существует

// 	        		$("#led-line-seven").prop('checked', true);

// 	        		if ($("#led-line-seven").prop("checked"))	{

// 		            	// $('.all-block-one-of-led.two').removeClass('focus');

// 		            	// мощность светильника скрытая
// 			          	var total_power_lighting_hidden = document.querySelector('.right-block-calc-two .all-block-one-of-led.seven.focus .power-lighting-led-hidden').innerHTML;
// 			          	document.getElementById('total-power-lighting-led-hidden').value = total_power_lighting_hidden;
// 			          	//

// 			          	// время работы скрытая
// 			          	var total_time_job_hidden = document.querySelector('.right-block-calc-two .all-block-one-of-led.seven.focus .time-job-led-hidden').innerHTML;
// 			          	document.getElementById('total-time-job-led-hidden').value = total_time_job_hidden;
// 			          	//

// 			          	// стоимость лампы скрытая
// 			          	var total_cost_lamp_lighting_hidden = document.querySelector('.right-block-calc-two .all-block-one-of-led.seven.focus .cost-lamp-lighting-led-hidden').innerHTML;
// 			          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = total_cost_lamp_lighting_hidden;

// 			          	//

// 		            	$('.all-block-one-of-led.eight').removeClass('focus');


// 			          	$('.button-calc').fadeIn(0);

// 		            }

// 	        		$('.right-block-calc-two').fadeIn(0);
// 	        		$('.right-block-calc').fadeOut(0);
// 	        		$('.all-block-one-of-led-fade').fadeIn(0);
//           			$('.all-block-two-of-led-fade').fadeOut(0);
// 	        }

// 	        else if (obj_pole_total_type_lighting_hidden.value=='РКУ 400'){
// 	        	// существует

// 	        		$('.right-block-calc-two').fadeIn(0);
// 	        		$('.right-block-calc').fadeOut(0);
// 	        		$('.all-block-one-of-led-fade').fadeOut(0);
//           			$('.all-block-two-of-led-fade').fadeIn(0);
// 	        }

// 		    // не существует
// 		    else 	{
// 		       	$('.right-block-calc').fadeOut(0);
// 		       	$('.right-block-calc-two').fadeOut(0);
// 		       	$('.all-block-one-of-led-fade').fadeOut(0);
//           		$('.all-block-two-of-led-fade').fadeOut(0);
//           		$('.all-block-three-of-led-fade').fadeOut(0);
// 	    	}

// 	        // //////////////////////////////////////////////////////////////////////////////////////////////////////////

// 	        if (obj_pole_total_type_lamp.value=='Металлогалогенная'){
//           		// существует

//           		$('.block-select-one.lum').fadeIn(0);
//           		$('.block-select-two').fadeOut(0);
//           		$('.disabled-input').fadeOut(0);          		
//         	}

//         	else if (obj_pole_total_type_lamp.value=='ДНАТ'){
//           		// существует

//           		$('.block-select-two').fadeIn(0);
//           		$('.block-select-one.lum').fadeOut(0);
//           		$('.disabled-input').fadeOut(0);
//           	}

// 	        // не существует
// 	        	else 	{
//           		$('.disabled-input').fadeIn(0);
// 	          	$('.block-select-one.lum').fadeOut(0);
// 	          	$('.block-select-two').fadeOut(0);
// 	        }
//       	});

// // $('.select-registration-calc').click(function () {
//         	var total = document.querySelector('#total-calc').innerHTML;
//             $('.all-block-option-calc').fadeIn(200);
//             $('.btn-select-calc').addClass('active');
//         });

// 		$('.points-count-calc.focus').click(function () {
//             $('.all-block-option-calc').fadeOut(200);
//             $('.btn-select-calc').removeClass('active');
//         });

//         $(document).click( function(event){
//           	if( $(event.target).closest('.select-registration-calc').length ) 
//             	return;
//           	$('.btn-select-calc').removeClass('active');
//           	$('.all-block-option-calc').fadeOut(200);
//          	event.stopPropagation();
//         });

//     	$('.content-select-calc').find(".points-count-calc").click(function () {
// 		  	$('.points-count-calc').removeClass('focus');
// 	        $(this).addClass('focus');
// 		});

// 		// ///////////////////////////////////////////////////////////////////

//        	$('.points-count-calc.focus').click(function () {
//           	var total = document.querySelector('.content-select-calc .points-count-calc.focus').innerHTML;
//           	document.getElementById('total-calc').innerHTML = total;

//           	// тип светильника
//           	// var type_lamp = document.querySelector('.content-select-calc .points-count-calc.focus .type-lamp').innerHTML;
//           	// document.getElementById('total-type-lamp').value = type_lamp;
//           	// 

//           	// мощность лампы
//           	var power_lamp = document.querySelector('.content-select-calc .points-count-calc.focus .power-lamp').innerHTML;
//           	// document.getElementById('total-power-lamp').value = power_lamp;
//           	document.getElementById('power-lamp').innerHTML = power_lamp;
//           	//

//           	// тип светильника скрытая
//           	var total_type_lighting_hidden = document.querySelector('.content-select-calc .points-count-calc.focus .type-lighting').innerHTML;
//           	document.getElementById('total-type-lighting-hidden').value = total_type_lighting_hidden;
//           	//

//           	// мощность лампы скрытая
//           	var total_power_lamp_hidden = document.querySelector('.content-select-calc .points-count-calc.focus .power-lamp-hidden').innerHTML;
//           	document.getElementById('total-power-lamp-hidden').value = total_power_lamp_hidden;
//           	//

//           	// количество ламп скрытая
//           	var total_number_lamp_hidden = document.querySelector('.content-select-calc .points-count-calc.focus .number-lamp-hidden').innerHTML;
//           	document.getElementById('total-number-lamp-hidden').value = total_number_lamp_hidden;
//           	//

//           	// мощность светильника скрытая
//           	// var total_power_lighting_hidden = document.querySelector('.content-select-calc .points-count-calc.focus .power-lighting-hidden').innerHTML;
//           	// document.getElementById('total-power-lighting-hidden').value = total_power_lighting_hidden;
//           	//

//           	// время работы скрытая
//           	var total_time_job_hidden = document.querySelector('.content-select-calc .points-count-calc.focus .time-job-hidden').innerHTML;
//           	document.getElementById('total-time-job-hidden').value = total_time_job_hidden;
//           	//


//           	// стоимость лампы скрытая
//           	var total_cost_lamp_lighting_hidden = document.querySelector('.content-select-calc .points-count-calc.focus .cost-lamp-lighting-hidden').innerHTML;
//           	document.getElementById('total-cost-lamp-lighting-hidden').value = total_cost_lamp_lighting_hidden;
//           	//

//           	$('input:checked').prop('checked', false);

//           	$('.all-block-one-of-led').removeClass('focus');
//           	$('.all-block-one-of-led').addClass('focus');

//         });

//         // ///////////////////////////////////////////////////////////////////

// 		// ///////////////////////////////////////////////////////////////////

//         $('.select-registration-calc-two').click(function () {
//         	var total = document.querySelector('#total-calc-two').innerHTML;
//             $('.all-block-option-calc-two').fadeIn(200);
//         });

// 		$('.points-count-calc-two.focus').click(function () {
//             $('.all-block-option-calc-two').fadeOut(200);
//         });

//         $(document).click( function(event){
//           	if( $(event.target).closest('.select-registration-calc-two').length ) 
//             	return;
//           	$('.all-block-option-calc-two').fadeOut(200);
//          	event.stopPropagation();
//         });

//     	$('.content-select-calc-two').find(".points-count-calc-two").click(function () {
// 		  	$('.points-count-calc-two').removeClass('focus');
// 	        $(this).addClass('focus');
// 		});

// 		// ///////////////////////////////////////////////////////////////////

//        	$('.points-count-calc-two.focus').click(function () {
//           	var total = document.querySelector('.content-select-calc-two .points-count-calc-two.focus').innerHTML;
//           	document.getElementById('total-calc-two').innerHTML = total;

//           	// тип светильника
//           	// var type_lamp = document.querySelector('.content-select-calc-two .points-count-calc-two.focus .type-lamp').innerHTML;
//           	// document.getElementById('total-type-lamp').value = type_lamp;
//           	// 

//           	// мощность лампы
//           	var power_lamp = document.querySelector('.content-select-calc-two .points-count-calc-two.focus .power-lamp').innerHTML;
//           	// document.getElementById('total-power-lamp').value = power_lamp;
//           	document.getElementById('power-lamp').innerHTML = power_lamp;
//           	//

//           	// тип светильника скрытая
//           	var total_type_lighting_hidden = document.querySelector('.content-select-calc-two .points-count-calc-two.focus .type-lighting').innerHTML;
//           	document.getElementById('total-type-lighting-hidden').value = total_type_lighting_hidden;
//           	//

//           	// мощность лампы скрытая
//           	var total_power_lamp_hidden = document.querySelector('.content-select-calc-two .points-count-calc-two.focus .power-lamp-hidden').innerHTML;
//           	document.getElementById('total-power-lamp-hidden').value = total_power_lamp_hidden;
//           	//

//           	// количество ламп скрытая
//           	var total_number_lamp_hidden = document.querySelector('.content-select-calc-two .points-count-calc-two.focus .number-lamp-hidden').innerHTML;
//           	document.getElementById('total-number-lamp-hidden').value = total_number_lamp_hidden;
//           	//

//           	// мощность светильника скрытая
//           	// var total_power_lighting_hidden = document.querySelector('.content-select-calc-two .points-count-calc-two.focus .power-lighting-hidden').innerHTML;
//           	// document.getElementById('total-power-lighting-hidden').value = total_power_lighting_hidden;
//           	//

//           	// время работы скрытая
//           	var total_time_job_hidden = document.querySelector('.content-select-calc-two .points-count-calc-two.focus .time-job-hidden').innerHTML;
//           	document.getElementById('total-time-job-hidden').value = total_time_job_hidden;
//           	//

//           	// количество замен скрытая
//           	// var total_number_change_hidden = document.querySelector('.content-select-calc-two .points-count-calc-two.focus .number-change-hidden').innerHTML;
//           	// document.getElementById('total-number-change-hidden').value = total_number_change_hidden;
//           	//

//           	// стоимость лампы скрытая
//           	var total_cost_lamp_lighting_hidden = document.querySelector('.content-select-calc-two .points-count-calc-two.focus .cost-lamp-lighting-hidden').innerHTML;
//           	document.getElementById('total-cost-lamp-lighting-hidden').value = total_cost_lamp_lighting_hidden;
//           	//

//           	$('input:checked').prop('checked', false);

//           	$('.all-block-one-of-led').removeClass('focus');
//           	$('.all-block-one-of-led').addClass('focus');

//         });

//         // ///////////////////////////////////////////////////////////////////

// 		// //////////////////////////////////////////////////////////

// 		$('.select-type-lamp').click(function () {
//             $('.all-block-option-type-lamp').fadeIn(200);
//         });

// 		$('.points-count-type-lamp.focus').click(function () {
//             $('.all-block-option-type-lamp').fadeOut(200);
//         });

//         $(document).click( function(event){
//           	if( $(event.target).closest('.select-type-lamp').length ) 
//             	return;
//           	$('.all-block-option-type-lamp').fadeOut(200);
//          	event.stopPropagation();
//         });

//     	$('.content-select-type-lamp').find(".points-count-type-lamp").click(function () {
// 		  	$('.points-count-type-lamp').removeClass('focus');
// 	        $(this).addClass('focus');
// 		});

//        	$('.points-count-type-lamp.focus').click(function () {
//           	var total_type_lamp = document.querySelector('.content-select-type-lamp .points-count-type-lamp.focus').innerHTML;
//           	document.getElementById('type-lamp').innerHTML = total_type_lamp;

//           	var total_type_lamp_lum = document.querySelector('.content-select-type-lamp .points-count-type-lamp.focus span').innerHTML;
//           	document.getElementById('total-type-lamp').value = total_type_lamp_lum;

//           	$('.hidden-input input').removeAttr("value");

//           	document.getElementById('total-calc').innerHTML = '<span>Выбрать из списка</span>';
//           	document.getElementById('total-calc-two').innerHTML = '<span>Выбрать из списка</span>';
//         });

//         // //////////////////////////////////////////////////////////////////////////////////

//         $('.select-power-lamp').click(function () {
//             $('.all-block-option-power-lamp').fadeIn(200);
//         });

// 		$('.points-count-power-lamp.focus').click(function () {
//             $('.all-block-option-power-lamp').fadeOut(200);
//         });

//         $(document).click( function(event){
//           	if( $(event.target).closest('.select-power-lamp').length ) 
//             	return;
//           	$('.all-block-option-power-lamp').fadeOut(200);
//          	event.stopPropagation();
//         });

//     	$('.content-select-power-lamp').find(".points-count-power-lamp").click(function () {
// 		  	$('.points-count-power-lamp').removeClass('focus');
// 	        $(this).addClass('focus');
// 		});

//        	$('.points-count-power-lamp.focus').click(function () {
//           	var total_type_lamp = document.querySelector('.content-select-power-lamp .points-count-power-lamp.focus').innerHTML;
//           	document.getElementById('power-lamp').innerHTML = total_type_lamp;

//           	var total_type_lamp_lum = document.querySelector('.content-select-power-lamp .points-count-power-lamp.focus span').innerHTML;
//           	// document.getElementById('total-power-lamp').value = total_type_lamp_lum;
//           	document.getElementById('total-power-lamp-hidden').value = total_type_lamp_lum;
//         });

//         // /////////////////////////////////////////////////////////////////////////////////////////////////////////////
//         // /////////////////////////////////////////////////////////////////////////////////////////////////////////////
//         // /////////////////////////////////////////////////////////////////////////////////////////////////////////////
//         // /////////////////////////////////////////////////////////////////////////////////////////////////////////////
//         // /////////////////////////////////////////////////////////////////////////////////////////////////////////////

//         $("#led-line-one").on("click", function() {
//             if ($("#led-line-one").prop("checked"))	{

//             	// $('.all-block-one-of-led.two').removeClass('focus');

//             	// мощность светильника скрытая
// 	          	var total_power_lighting_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.one.focus .power-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-power-lighting-led-hidden').value = total_power_lighting_hidden;
// 	          	//

// 	          	// время работы скрытая
// 	          	var total_time_job_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.one.focus .time-job-led-hidden').innerHTML;
// 	          	document.getElementById('total-time-job-led-hidden').value = total_time_job_hidden;
// 	          	//

// 	          	// стоимость лампы скрытая
// 	          	var total_cost_lamp_lighting_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.one.focus .cost-lamp-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = total_cost_lamp_lighting_hidden;

// 	          	// 
// 			        var input = document.getElementById('number-lightiing').value;
// 			        var input_two = document.getElementById('tariff-for-electro').value;
			        
// 			        if (input =="")		{
// 			           	$('#number-lightiing').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#number-lightiing').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#number-lightiing').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 			        if (input_two =="")		{
// 			            // document.getElementById('err').innerHTML = 'Ошибка, поле пустое';

// 			            $('#tariff-for-electro').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#tariff-for-electro').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#tariff-for-electro').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 	          	// 

//             	$('.all-block-one-of-led.two').removeClass('focus');


// 	          	$('.button-calc').fadeIn(0);

//             }

//             else 	{

// 				$('.all-block-one-of-led.two').addClass('focus');

// 				$('.button-calc, .block-all-results').fadeOut(0);

//             	document.getElementById('total-power-lighting-led-hidden').value = '0';
// 	          	document.getElementById('total-time-job-led-hidden').value = '0';
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = '0';
	          	
//             }

//         });

//         $("#led-line-two").on("click", function() {
//             if ($("#led-line-two").prop("checked"))	{

//             	// $('.all-block-one-of-led.one').removeClass('focus');

//             	// мощность светильника скрытая
// 	          	var total_power_lighting_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.two.focus .power-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-power-lighting-led-hidden').value = total_power_lighting_hidden;
// 	          	//

// 	          	// время работы скрытая
// 	          	var total_time_job_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.two.focus .time-job-led-hidden').innerHTML;
// 	          	document.getElementById('total-time-job-led-hidden').value = total_time_job_hidden;
// 	          	//

// 	          	// стоимость лампы скрытая
// 	          	var total_cost_lamp_lighting_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.two.focus .cost-lamp-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = total_cost_lamp_lighting_hidden;
// 	          	//

// 	          	// 
// 			        var input = document.getElementById('number-lightiing').value;
// 			        var input_two = document.getElementById('tariff-for-electro').value;
			        
// 			        if (input =="")		{
// 			           	$('#number-lightiing').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#number-lightiing').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#number-lightiing').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 			        if (input_two =="")		{
// 			            // document.getElementById('err').innerHTML = 'Ошибка, поле пустое';

// 			            $('#tariff-for-electro').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#tariff-for-electro').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#tariff-for-electro').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 	          	// 

//             	$('.all-block-one-of-led.one').removeClass('focus');

// 	          	$('.button-calc').fadeIn(0); 	

//             }

//             else 	{

// 				$('.all-block-one-of-led.one').addClass('focus');
// 				$('.button-calc, .block-all-results').fadeOut(0);

//             	document.getElementById('total-power-lighting-led-hidden').value = '0';
// 	          	document.getElementById('total-time-job-led-hidden').value = '0';
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = '0';	          	

//             }
//         });

//         // //////////////////////////////////////////////////////////////////////////

//         $("#led-line-three").on("click", function() {
//             if ($("#led-line-three").prop("checked"))	{

//             	// $('.all-block-one-of-led.two').removeClass('focus');

//             	// мощность светильника скрытая
// 	          	var total_power_lighting_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.three.focus .power-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-power-lighting-led-hidden').value = total_power_lighting_hidden;
// 	          	//

// 	          	// время работы скрытая
// 	          	var total_time_job_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.three.focus .time-job-led-hidden').innerHTML;
// 	          	document.getElementById('total-time-job-led-hidden').value = total_time_job_hidden;
// 	          	//

// 	          	// стоимость лампы скрытая
// 	          	var total_cost_lamp_lighting_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.three.focus .cost-lamp-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = total_cost_lamp_lighting_hidden;

// 	          	// 
// 			        var input = document.getElementById('number-lightiing').value;
// 			        var input_two = document.getElementById('tariff-for-electro').value;
			        
// 			        if (input =="")		{
// 			           	$('#number-lightiing').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#number-lightiing').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#number-lightiing').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 			        if (input_two =="")		{
// 			            // document.getElementById('err').innerHTML = 'Ошибка, поле пустое';

// 			            $('#tariff-for-electro').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#tariff-for-electro').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#tariff-for-electro').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 	          	// 

//             	$('.all-block-one-of-led.four').removeClass('focus');


// 	          	$('.button-calc').fadeIn(0);

//             }

//             else 	{

// 				$('.all-block-one-of-led.four').addClass('focus');

// 				$('.button-calc, .block-all-results').fadeOut(0);

//             	document.getElementById('total-power-lighting-led-hidden').value = '0';
// 	          	document.getElementById('total-time-job-led-hidden').value = '0';
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = '0';
	          	
//             }

//         });

//         $("#led-line-four").on("click", function() {
//             if ($("#led-line-four").prop("checked"))	{

//             	// $('.all-block-one-of-led.one').removeClass('focus');

//             	// мощность светильника скрытая
// 	          	var total_power_lighting_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.four.focus .power-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-power-lighting-led-hidden').value = total_power_lighting_hidden;
// 	          	//

// 	          	// время работы скрытая
// 	          	var total_time_job_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.four.focus .time-job-led-hidden').innerHTML;
// 	          	document.getElementById('total-time-job-led-hidden').value = total_time_job_hidden;
// 	          	//

// 	          	// стоимость лампы скрытая
// 	          	var total_cost_lamp_lighting_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.four.focus .cost-lamp-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = total_cost_lamp_lighting_hidden;
// 	          	//

// 	          	// 
// 			        var input = document.getElementById('number-lightiing').value;
// 			        var input_two = document.getElementById('tariff-for-electro').value;
			        
// 			        if (input =="")		{
// 			           	$('#number-lightiing').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#number-lightiing').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#number-lightiing').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 			        if (input_two =="")		{
// 			            // document.getElementById('err').innerHTML = 'Ошибка, поле пустое';

// 			            $('#tariff-for-electro').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#tariff-for-electro').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#tariff-for-electro').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 	          	// 

//             	$('.all-block-one-of-led.three').removeClass('focus');

// 	          	$('.button-calc').fadeIn(0); 	

//             }

//             else 	{

// 				$('.all-block-one-of-led.three').addClass('focus');
// 				$('.button-calc, .block-all-results').fadeOut(0);

//             	document.getElementById('total-power-lighting-led-hidden').value = '0';
// 	          	document.getElementById('total-time-job-led-hidden').value = '0';
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = '0';	          	

//             }
//         });

//         // //////////////////////////////////////////////////////////////////////////

//         $("#led-line-five").on("click", function() {
//             if ($("#led-line-five").prop("checked"))	{

//             	// $('.all-block-one-of-led.two').removeClass('focus');

//             	// мощность светильника скрытая
// 	          	var total_power_lighting_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.five.focus .power-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-power-lighting-led-hidden').value = total_power_lighting_hidden;
// 	          	//

// 	          	// время работы скрытая
// 	          	var total_time_job_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.five.focus .time-job-led-hidden').innerHTML;
// 	          	document.getElementById('total-time-job-led-hidden').value = total_time_job_hidden;
// 	          	//

// 	          	// стоимость лампы скрытая
// 	          	var total_cost_lamp_lighting_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.five.focus .cost-lamp-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = total_cost_lamp_lighting_hidden;

// 	          	// 
// 			        var input = document.getElementById('number-lightiing').value;
// 			        var input_two = document.getElementById('tariff-for-electro').value;
			        
// 			        if (input =="")		{
// 			           	$('#number-lightiing').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#number-lightiing').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#number-lightiing').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 			        if (input_two =="")		{
// 			            // document.getElementById('err').innerHTML = 'Ошибка, поле пустое';

// 			            $('#tariff-for-electro').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#tariff-for-electro').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#tariff-for-electro').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 	          	// 

//             	$('.all-block-one-of-led.six').removeClass('focus');


// 	          	$('.button-calc').fadeIn(0);

//             }

//             else 	{

// 				$('.all-block-one-of-led.six').addClass('focus');

// 				$('.button-calc, .block-all-results').fadeOut(0);

//             	document.getElementById('total-power-lighting-led-hidden').value = '0';
// 	          	document.getElementById('total-time-job-led-hidden').value = '0';
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = '0';
	          	
//             }

//         });

//         $("#led-line-six").on("click", function() {
//             if ($("#led-line-six").prop("checked"))	{

//             	// $('.all-block-one-of-led.one').removeClass('focus');

//             	// мощность светильника скрытая
// 	          	var total_power_lighting_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.six.focus .power-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-power-lighting-led-hidden').value = total_power_lighting_hidden;
// 	          	//

// 	          	// время работы скрытая
// 	          	var total_time_job_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.six.focus .time-job-led-hidden').innerHTML;
// 	          	document.getElementById('total-time-job-led-hidden').value = total_time_job_hidden;
// 	          	//

// 	          	// стоимость лампы скрытая
// 	          	var total_cost_lamp_lighting_hidden = document.querySelector('.right-block-calc .all-block-one-of-led.six.focus .cost-lamp-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = total_cost_lamp_lighting_hidden;
// 	          	//

// 	          	// 
// 			        var input = document.getElementById('number-lightiing').value;
// 			        var input_two = document.getElementById('tariff-for-electro').value;
			        
// 			        if (input =="")		{
// 			           	$('#number-lightiing').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#number-lightiing').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#number-lightiing').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 			        if (input_two =="")		{
// 			            // document.getElementById('err').innerHTML = 'Ошибка, поле пустое';

// 			            $('#tariff-for-electro').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#tariff-for-electro').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#tariff-for-electro').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 	          	// 

//             	$('.all-block-one-of-led.five').removeClass('focus');

// 	          	$('.button-calc').fadeIn(0); 	

//             }

//             else 	{

// 				$('.all-block-one-of-led.five').addClass('focus');
// 				$('.button-calc, .block-all-results').fadeOut(0);

//             	document.getElementById('total-power-lighting-led-hidden').value = '0';
// 	          	document.getElementById('total-time-job-led-hidden').value = '0';
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = '0';	          	

//             }
//         });

//         // //////////////////////////////////////////////////////////////////////////

//         // //////////////////////////////////////////////////////////////////////////

//         $("#led-line-seven").on("click", function() {
//             if ($("#led-line-seven").prop("checked"))	{

//             	// $('.all-block-one-of-led.two').removeClass('focus');

//             	// мощность светильника скрытая
// 	          	var total_power_lighting_hidden = document.querySelector('.right-block-calc-two .all-block-one-of-led.seven.focus .power-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-power-lighting-led-hidden').value = total_power_lighting_hidden;
// 	          	//

// 	          	// время работы скрытая
// 	          	var total_time_job_hidden = document.querySelector('.right-block-calc-two .all-block-one-of-led.seven.focus .time-job-led-hidden').innerHTML;
// 	          	document.getElementById('total-time-job-led-hidden').value = total_time_job_hidden;
// 	          	//

// 	          	// стоимость лампы скрытая
// 	          	var total_cost_lamp_lighting_hidden = document.querySelector('.right-block-calc-two .all-block-one-of-led.seven.focus .cost-lamp-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = total_cost_lamp_lighting_hidden;

// 	          	// 
// 			        var input = document.getElementById('number-lightiing').value;
// 			        var input_two = document.getElementById('tariff-for-electro').value;
			        
// 			        if (input =="")		{
// 			           	$('#number-lightiing').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#number-lightiing').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#number-lightiing').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 			        if (input_two =="")		{
// 			            // document.getElementById('err').innerHTML = 'Ошибка, поле пустое';

// 			            $('#tariff-for-electro').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#tariff-for-electro').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#tariff-for-electro').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 	          	// 

//             	$('.all-block-one-of-led.eight').removeClass('focus');


// 	          	$('.button-calc').fadeIn(0);

//             }

//             else 	{

// 				$('.all-block-one-of-led.eight').addClass('focus');

// 				$('.button-calc, .block-all-results').fadeOut(0);

//             	document.getElementById('total-power-lighting-led-hidden').value = '0';
// 	          	document.getElementById('total-time-job-led-hidden').value = '0';
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = '0';
	          	
//             }

//         });

//         $("#led-line-eight").on("click", function() {
//             if ($("#led-line-eight").prop("checked"))	{

//             	// $('.all-block-one-of-led.one').removeClass('focus');

//             	// мощность светильника скрытая
// 	          	var total_power_lighting_hidden = document.querySelector('.right-block-calc-two .all-block-one-of-led.eight.focus .power-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-power-lighting-led-hidden').value = total_power_lighting_hidden;
// 	          	//

// 	          	// время работы скрытая
// 	          	var total_time_job_hidden = document.querySelector('.right-block-calc-two .all-block-one-of-led.eight.focus .time-job-led-hidden').innerHTML;
// 	          	document.getElementById('total-time-job-led-hidden').value = total_time_job_hidden;
// 	          	//

// 	          	// стоимость лампы скрытая
// 	          	var total_cost_lamp_lighting_hidden = document.querySelector('.right-block-calc-two .all-block-one-of-led.eight.focus .cost-lamp-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = total_cost_lamp_lighting_hidden;
// 	          	//

// 	          	// 
// 			        var input = document.getElementById('number-lightiing').value;
// 			        var input_two = document.getElementById('tariff-for-electro').value;
			        
// 			        if (input =="")		{
// 			           	$('#number-lightiing').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#number-lightiing').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#number-lightiing').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 			        if (input_two =="")		{
// 			            // document.getElementById('err').innerHTML = 'Ошибка, поле пустое';

// 			            $('#tariff-for-electro').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#tariff-for-electro').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#tariff-for-electro').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 	          	// 

//             	$('.all-block-one-of-led.seven').removeClass('focus');

// 	          	$('.button-calc').fadeIn(0); 	

//             }

//             else 	{

// 				$('.all-block-one-of-led.seven').addClass('focus');
// 				$('.button-calc, .block-all-results').fadeOut(0);

//             	document.getElementById('total-power-lighting-led-hidden').value = '0';
// 	          	document.getElementById('total-time-job-led-hidden').value = '0';
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = '0';	          	

//             }
//         });

//         // //////////////////////////////////////////////////////////////////////////

//         $("#led-line-nine").on("click", function() {
//             if ($("#led-line-nine").prop("checked"))	{

//             	// $('.all-block-one-of-led.two').removeClass('focus');

//             	// мощность светильника скрытая
// 	          	var total_power_lighting_hidden = document.querySelector('.right-block-calc-two .all-block-one-of-led.nine.focus .power-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-power-lighting-led-hidden').value = total_power_lighting_hidden;
// 	          	//

// 	          	// время работы скрытая
// 	          	var total_time_job_hidden = document.querySelector('.right-block-calc-two .all-block-one-of-led.nine.focus .time-job-led-hidden').innerHTML;
// 	          	document.getElementById('total-time-job-led-hidden').value = total_time_job_hidden;
// 	          	//

// 	          	// стоимость лампы скрытая
// 	          	var total_cost_lamp_lighting_hidden = document.querySelector('.right-block-calc-two .all-block-one-of-led.nine.focus .cost-lamp-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = total_cost_lamp_lighting_hidden;

// 	          	// 
// 			        var input = document.getElementById('number-lightiing').value;
// 			        var input_two = document.getElementById('tariff-for-electro').value;
			        
// 			        if (input =="")		{
// 			           	$('#number-lightiing').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#number-lightiing').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#number-lightiing').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 			        if (input_two =="")		{
// 			            // document.getElementById('err').innerHTML = 'Ошибка, поле пустое';

// 			            $('#tariff-for-electro').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#tariff-for-electro').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#tariff-for-electro').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 	          	// 

//             	$('.all-block-one-of-led.ten').removeClass('focus');


// 	          	$('.button-calc').fadeIn(0);

//             }

//             else 	{

// 				$('.all-block-one-of-led.ten').addClass('focus');

// 				$('.button-calc, .block-all-results').fadeOut(0);

//             	document.getElementById('total-power-lighting-led-hidden').value = '0';
// 	          	document.getElementById('total-time-job-led-hidden').value = '0';
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = '0';
	          	
//             }

//         });

//         $("#led-line-ten").on("click", function() {
//             if ($("#led-line-ten").prop("checked"))	{

//             	// $('.all-block-one-of-led.one').removeClass('focus');

//             	// мощность светильника скрытая
// 	          	var total_power_lighting_hidden = document.querySelector('.right-block-calc-two .all-block-one-of-led.ten.focus .power-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-power-lighting-led-hidden').value = total_power_lighting_hidden;
// 	          	//

// 	          	// время работы скрытая
// 	          	var total_time_job_hidden = document.querySelector('.right-block-calc-two .all-block-one-of-led.ten.focus .time-job-led-hidden').innerHTML;
// 	          	document.getElementById('total-time-job-led-hidden').value = total_time_job_hidden;
// 	          	//

// 	          	// стоимость лампы скрытая
// 	          	var total_cost_lamp_lighting_hidden = document.querySelector('.right-block-calc-two .all-block-one-of-led.ten.focus .cost-lamp-lighting-led-hidden').innerHTML;
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = total_cost_lamp_lighting_hidden;
// 	          	//

// 	          	// 
// 			        var input = document.getElementById('number-lightiing').value;
// 			        var input_two = document.getElementById('tariff-for-electro').value;
			        
// 			        if (input =="")		{
// 			           	$('#number-lightiing').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#number-lightiing').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#number-lightiing').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 			        if (input_two =="")		{
// 			            // document.getElementById('err').innerHTML = 'Ошибка, поле пустое';

// 			            $('#tariff-for-electro').css({'background' : '#FFB2B2', 'color' : 'black'});
// 			        	$('#tariff-for-electro').focus();
			        
// 			            return false;
// 			        }

// 			        else 	{
// 			        	$('#tariff-for-electro').css({'background' : 'white', 'color' : 'black'});
// 			        }

// 	          	// 

//             	$('.all-block-one-of-led.nine').removeClass('focus');

// 	          	$('.button-calc').fadeIn(0); 	

//             }

//             else 	{

// 				$('.all-block-one-of-led.nine').addClass('focus');
// 				$('.button-calc, .block-all-results').fadeOut(0);

//             	document.getElementById('total-power-lighting-led-hidden').value = '0';
// 	          	document.getElementById('total-time-job-led-hidden').value = '0';
// 	          	document.getElementById('total-cost-lamp-lighting-led-hidden').value = '0';	          	

//             }
//         });

//         $('.block-select-type-lamp, .block-select-one, .block-select-two').click(function () {
//             $('.button-calc, .block-all-results').fadeOut(0);
//         });

//         $('.points-count-power-lamp, #number-lightiing, #tariff-for-electro').click(function () {
//             $('.block-all-results').fadeOut(0);
//         });

//         $('.button-calc').click(function () {
//             $('.block-all-results').fadeIn(0);
//         });

//     function calc(par){
//             var obj_form=document.forms.cl_form;
//             var number_lightiing=obj_form.number_lightiing;

// 		   	var total_number_lamp_hidden = document.cl_form.total_number_lamp_hidden.value;
// 		    var total_power_lamp_hidden = document.cl_form.total_power_lamp_hidden.value;
// 		    var total_power_lighting_hidden = (Number(total_number_lamp_hidden) * Number(total_power_lamp_hidden) * 1.2); /////////////////////////////// 1.2
// 		    document.cl_form.total_power_lighting_hidden.value=total_power_lighting_hidden;

// 		    var total_time_job_led_hidden = document.cl_form.total_time_job_led_hidden.value;
// 		   	var total_time_job_hidden = document.cl_form.total_time_job_hidden.value;
// 		    var total_number_change_hidden = (Number(total_time_job_led_hidden) / Number(total_time_job_hidden));
// 		    document.cl_form.total_number_change_hidden.value=total_number_change_hidden;

// 		   	var tariff_for_electro = document.cl_form.tariff_for_electro.value;
// 		    var tariff_for_all_electro_hidden = (Number(total_power_lighting_hidden) * Number(number_lightiing) * Number(total_time_job_led_hidden) * Number(tariff_for_electro) / 1000);
// 		    document.cl_form.tariff_for_all_electro_hidden.value=tariff_for_all_electro_hidden;

// 		    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////
//             var total_cost_lamp_lighting_hidden = document.querySelector('.right-block-calc-two .all-block-one-of-led.ten.focus .cost-lamp-lighting-led-hidden').innerHTML;
// 		    var total_cost_lamp_lighting_led_hidden = document.cl_form.total_cost_lamp_lighting_led_hidden.value;
// 		    var cost_all_led_hidden = (Number(total_cost_lamp_lighting_led_hidden) * Number(number_lightiing));
// 		    document.cl_form.cost_all_led_hidden.value=cost_all_led_hidden;

// 		    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 		    var total_power_lighting_led_hidden = document.cl_form.total_power_lighting_led_hidden.value;
// 		    var tariff_for_electro_led_hidden = (Number(total_power_lighting_led_hidden) * Number(number_lightiing) * Number(total_time_job_led_hidden) * Number(tariff_for_electro) / 1000);
// 		    document.cl_form.tariff_for_electro_led_hidden.value=tariff_for_electro_led_hidden;

// 		    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 		    var economy_led_hidden = (Number(tariff_for_all_electro_hidden) - Number(tariff_for_electro_led_hidden));
// 		    document.cl_form.economy_led_hidden.value=economy_led_hidden;

// 		    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 		    var all_economy_led_hidden = (Number(economy_led_hidden) + Number(total_cost_lamp_lighting_hidden));
// 		    document.cl_form.all_economy_led_hidden.value=all_economy_led_hidden;

// 		    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 		    var month_job_led_hidden = (Number(total_time_job_led_hidden) * 12 / (365*8));
// 		    month_job_led_hidden = month_job_led_hidden.toFixed(1)
// 		    document.cl_form.month_job_led_hidden.value=month_job_led_hidden;

// 		    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 		    var result_led_hidden = (Number(cost_all_led_hidden) / (Number(all_economy_led_hidden) / Number(month_job_led_hidden)));
// 		    result_led_hidden = Math.ceil(result_led_hidden);
// 		    document.cl_form.result_led_hidden.value=result_led_hidden;

// 		    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 		   	return false; 
// 		}

// 	    function checkValue()	{
// 	        var input = document.getElementById('number-lightiing').value;
// 	        var input_two = document.getElementById('tariff-for-electro').value;
	        
// 	        if (input =="")		{
// 	           	$('#number-lightiing').css({'background' : '#FFB2B2', 'color' : 'black'});
// 	        	$('#number-lightiing').focus();
	        
// 	            return false;
// 	        }

// 	        else 	{
// 	        	$('#number-lightiing').css({'background' : 'white', 'color' : 'black'});
// 	        }

// 	        if (input_two =="")		{
// 	            // document.getElementById('err').innerHTML = 'Ошибка, поле пустое';

// 	            $('#tariff-for-electro').css({'background' : '#FFB2B2', 'color' : 'black'});
// 	        	$('#tariff-for-electro').focus();
	        
// 	            return false;
// 	        }

// 	        else 	{
// 	        	$('#number-lightiing').css({'background' : 'white', 'color' : 'black'});
// 	        }
			
// 			$('#number-lightiing').css({'background' : 'white', 'color' : 'black'});
// 			$('.block-all-results').fadeIn(0);
// 	    }

//         $('.button-calc').on('click', function (e) {
//             e.preventDefault();
//             checkValue();
//             calc(this.value);
//         })