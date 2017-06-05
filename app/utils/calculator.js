function initSelect ($select) {
	var $this = $select;
	var $styledSelect = $this.find('.select-styled');
	var $list = $this.find('ul.select-options');
	var $listItems = $list.children('li');
	$styledSelect.removeClass('disabled');
	$styledSelect.unbind('click');
	$styledSelect.click(function(e) {
		e.stopPropagation();
		$('div.select-styled.active').not(this).each(function(){
			$(this).removeClass('active').next('ul.select-options').hide();
		});
		$(this).toggleClass('active').next('ul.select-options').toggle();
	});
	$listItems.unbind('click');
	$listItems.click(function(e) {
		e.stopPropagation();
		$styledSelect.html($(this).html()).attr('rel', $(this).attr('rel')).removeClass('active');
		$list.hide();
	});

	$(document).click(function() {
		$styledSelect.removeClass('active');
		$list.hide();
	});
}

function pluralize(format, count) {
	var plural = "", singular = "";
	var units = count % 10;
	var tens = Math.floor((count % 100) / 10);
	var index = 0;

	if (format) {
		format = format.replace(/(:|;|\s)/gi, "").split(/\,/);
			
		} else {
			console.log("Предоставьте формат подписей ко временным промежуткам.");
		}
	index = (count === 1 ? 0 : (units >= 2 && units <= 4 && tens != 1 ? 1 :
			(units === 1 && tens != 1 ? 0 : 2)));
	return format[index];
}

initSelect($('#bulbTypeSelect'));


{

let tisLamps = [
		{
			name: "Галогенная лампа, 35 Вт",
			bulbPower: 25,
			bulbQty: 1,
			lampPower: 25,
			article: "",
			type: "Галогенная",
			lifeTime: 1500,
			lampCost: 200,
			imgSrc: require("../images/calculator/galogen.png"),
			ledAnalogs: [
					{
						type: "led",
						name: "LED MR16",
						lampPower: 4,
						lifeTime: 25000,
						lampCost: 600,
						imgSrc: require("../images/calculator/MR16.png")
					}
				]
		},
		{
			name: "Галогенная лампа, 50 Вт",
			bulbPower: 50,
			bulbQty: 1,
			lampPower: 50,
			article: "",
			type: "Галогенная",
			lifeTime: 1500,
			lampCost: 250,
			imgSrc: require("../images/calculator/galogen.png"),
			ledAnalogs: [
					{
						type: "led",
						name: "LED MR16",
						lampPower: 6,
						lifeTime: 25000,
						lampCost: 600,
						imgSrc: require("../images/calculator/MR16.png")
					}
				]
		},
		{
			name: "Экономка 9 Вт",
			bulbPower: 9,
			bulbQty: 1,
			lampPower: 9,
			article: "",
			type: "Экономка",
			lifeTime: 8000,
			lampCost: 580,
			imgSrc: require("../images/calculator/econom.png"),
			ledAnalogs: [
					{
						type: "led",
						name: "LED C37, G45",
						lampPower: 6,
						lifeTime: 25000,
						lampCost: 600,
						imgSrc: require("../images/calculator/6wt.jpg")
					}
				]
		},
		{
			name: "Экономка 11 Вт",
			bulbPower: 11,
			bulbQty: 1,
			lampPower: 11,
			article: "",
			type: "Экономка",
			lifeTime: 8000,
			lampCost: 600,
			imgSrc: require("../images/calculator/econom.png"),
			ledAnalogs: [
					{
						type: "led",
						name: "LED C37, G45",
						lampPower: 6,
						lifeTime: 25000,
						lampCost: 600,
						imgSrc: require("../images/calculator/6wt.jpg")
					}
				]
		},
		{
			name: "Экономка 15 Вт",
			bulbPower: 15,
			bulbQty: 1,
			lampPower: 15,
			article: "",
			type: "Экономка",
			lifeTime: 8000,
			lampCost: 630,
			imgSrc: require("../images/calculator/econom.png"),
			ledAnalogs: [
					{
						type: "led",
						name: "LED A60 9 Вт",
						lampPower: 9,
						lifeTime: 25000,
						lampCost: 700,
						imgSrc: require("../images/calculator/A60.png")
					}
				]
		},
		{
			name: "Экономка 20 Вт",
			bulbPower: 20,
			bulbQty: 1,
			lampPower: 20,
			article: "",
			type: "Экономка",
			lifeTime: 8000,
			lampCost: 680,
			imgSrc: require("../images/calculator/econom.png"),
			ledAnalogs: [
					{
						type: "led",
						name: "LED A60 9 Вт",
						lampPower: 9,
						lifeTime: 25000,
						lampCost: 700,
						imgSrc: require("../images/calculator/A60.png")
					}
				]
		},
		{
			name: "Экономка 26 Вт",
			bulbPower: 26,
			bulbQty: 1,
			lampPower: 26,
			article: "",
			type: "Экономка",
			lifeTime: 8000,
			lampCost: 800,
			imgSrc: require("../images/calculator/econom.png"),
			ledAnalogs: [
					{
						type: "led",
						name: "LED A60 12 Вт",
						lampPower: 12,
						lifeTime: 25000,
						lampCost: 1000,
						imgSrc: require("../images/calculator/A60.png")
					}
				]
		},
		{
			name: "Экономка 32 Вт",
			bulbPower: 32,
			bulbQty: 1,
			lampPower: 32,
			article: "",
			type: "Экономка",
			lifeTime: 8000,
			lampCost: 950,
			imgSrc: require("../images/calculator/econom.png"),
			ledAnalogs: [
					{
						type: "led",
						name: "LED G95 15 Вт",
						lampPower: 15,
						lifeTime: 25000,
						lampCost: 1875,
						imgSrc: require("../images/calculator/G95.png")
					}
				]
		},
		{
			name: "Лампа накаливания 40 Вт",
			bulbPower: 40,
			bulbQty: 1,
			lampPower: 40,
			article: "",
			type: "Накаливания",
			lifeTime: 1000,
			lampCost: 80,
			imgSrc: require("../images/calculator/nakal.png"),
			ledAnalogs: [
					{
						type: "led",
						name: "LED C37, G45",
						lampPower: 6,
						lifeTime: 25000,
						lampCost: 600,
						imgSrc: require("../images/calculator/6wt.jpg")
					}
				]
		},
		{
			name: "Лампа накаливания 60 Вт",
			bulbPower: 60,
			bulbQty: 1,
			lampPower: 60,
			article: "",
			type: "Накаливания",
			lifeTime: 1000,
			lampCost: 100,
			imgSrc: require("../images/calculator/nakal.png"),
			ledAnalogs: [
					{
						type: "led",
						name: "LED C37, G45",
						lampPower: 6,
						lifeTime: 25000,
						lampCost: 600,
						imgSrc: require("../images/calculator/6wt.jpg")
					}
				]
		},
		{
			name: "Лампа накаливания 75 Вт",
			bulbPower: 75,
			bulbQty: 1,
			lampPower: 75,
			article: "",
			type: "Накаливания",
			lifeTime: 1000,
			lampCost: 120,
			imgSrc: require("../images/calculator/nakal.png"),
			ledAnalogs: [
					{
						type: "led",
						name: "LED A60 9 Вт",
						lampPower: 9,
						lifeTime: 25000,
						lampCost: 700,
						imgSrc: require("../images/calculator/A60.png")
					}
				]
		},
		{
			name: "Лампа накаливания 100 Вт",
			bulbPower: 100,
			bulbQty: 1,
			lampPower: 100,
			article: "",
			type: "Накаливания",
			lifeTime: 1000,
			lampCost: 150,
			imgSrc: require("../images/calculator/nakal.png"),
			ledAnalogs: [
					{
						type: "led",
						name: "LED A60 12 Вт",
						lampPower: 12,
						lifeTime: 25000,
						lampCost: 1000,
						imgSrc: require("../images/calculator/A60.png")
					}
				]
		},
		{
			name: "Лампа накаливания 150 Вт",
			bulbPower: 150,
			bulbQty: 1,
			lampPower: 150,
			article: "",
			type: "Накаливания",
			lifeTime: 1000,
			lampCost: 200,
			imgSrc: require("../images/calculator/nakal.png"),
			ledAnalogs: [
					{
						type: "led",
						name: "LED G95 15 Вт",
						lampPower: 15,
						lifeTime: 25000,
						lampCost: 1875,
						imgSrc: require("../images/calculator/G95.png")
					}
				]
		}
	];

	const chosenLamps = {
		tisLamp: null,
		ledLamp: null
	};

	// Элементы формы
	let calcFormLampPower = $('.calculator__form-group--power'); // Блок мощности лампы
	let resultsBlock = $('.calculator__results'); // блок вывода результатов
	let economyResultsBlock = resultsBlock.find('.calculator__results-economy'); // вывод экономии
	let recoupmentResultsBlock = resultsBlock.find('.calculator__results-month'); // вывод окупаемости

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
// Расчет экономии
	function electricityEconomy (ledLamp, tisLamp, tisLampQty, electricityTariff) {
		let replacementNumber = ledLamp.lifeTime / tisLamp.lifeTime;
		let replacementCost = tisLampQty * tisLamp.bulbQty * tisLamp.lampCost * replacementNumber;
		let tisElectricityCost = tisLampQty * tisLamp.lampPower * ledLamp.lifeTime * electricityTariff / 1000;
		let ledElectricityCost = tisLampQty * ledLamp.lampPower * ledLamp.lifeTime * electricityTariff / 1000;
		let electricityEconomy = tisElectricityCost - ledElectricityCost;

		return electricityEconomy;
	}
// Расчет окупаемости
	function recoupment (ledLamp, tisLamp, tisLampQty, electricityTariff) {
		let replacementCost = tisLampQty * tisLamp.bulbQty * tisLamp.lampCost * (ledLamp.lifeTime / tisLamp.lifeTime);
		let tisToLedReplacementCost = tisLampQty * ledLamp.lampCost;
		let ledLampLifeTimeMonths = (ledLamp.lifeTime*12)/(365 * 8);
		let totalEconomy = electricityEconomy(ledLamp, tisLamp, tisLampQty, electricityTariff) + replacementCost;
		let recoupment = tisToLedReplacementCost / (totalEconomy / ledLampLifeTimeMonths);

		return Math.ceil(recoupment);
	}

	// Подтягиваем список ламп люминисцентных или накаливания в зависимости от выбора пользователя
	$('#tisBulbType li').on('click', function (e) {
		resetCalculator();
		var selectedTisLampType = $(this).attr('rel');
		let chosenLamps = tisLamps.filter(filterFunc(selectedTisLampType));
		updateLampsOptions(chosenLamps);
	});

	// Формируется список вариантов ламп
	function updateLampsOptions (lampsArr) {
		let tisLampTypeSelect = $('#tisLampsOptions');
		let html = '';
		lampsArr.forEach(function (lamp, index) {
			html += `<li data-lamp='${JSON.stringify(lamp)}' rel='${lamp.name}'>
						<p class="select-options__name">${lamp.name}</p>
						<div class="select-options__image">
							<img src="${lamp.imgSrc}" alt="${lamp.name}">
						</div>
					</li>`;
		});

		tisLampTypeSelect.html(html);

		initSelect($('#tisLampSelect'));

		tisLampTypeSelect.children('li').on('click', function (e) {
			let lamp = JSON.parse(this.dataset.lamp);
			updateLedLampsOptions(lamp);
			chosenLamps.tisLamp = lamp;
			console.log('here 2');
		});
	}
	// Формируетс список аналогов ламп LED, на основе выбора не лед лампы
	function updateLedLampsOptions (tisLamp) {
		let ledLampTypeSelect = $('#ledLampsOptions');
		let html = '';
		tisLamp.ledAnalogs.forEach(function (lamp, index) {
			html += `<li data-lamp='${JSON.stringify(lamp)}' rel='${lamp.name}'>
						<div class="select-options__image">
							<img src="${lamp.imgSrc}" alt="${lamp.name}">
						</div>
						<div class="select-options__price">${lamp.lampCost} тг</div>
					</li>`;
		});

		ledLampTypeSelect.html(html);
		initSelect($('#ledLampSelect'));
		calcFormLampPower.find('.calculator-form__field').html(tisLamp.bulbPower);
		calcFormLampPower.slideDown();

		ledLampTypeSelect.children('li').on('click', function (e) {
			let lamp = JSON.parse(this.dataset.lamp);
			chosenLamps.ledLamp = lamp;
			let $articleBlock = 	$('.calculator__form-group--article');
			$articleBlock.find('#ledLampName').html(lamp.name);
			$articleBlock.slideDown();
		});
	}

	// Вывод результатов по нажатия на кнопку РАССЧИТАТЬ (т.е. подтверждение формы)
	$('.calculator-form').on('submit', function(e) {
		if (!chosenLamps.tisLamp || !chosenLamps.ledLamp) {
			alert('Выберите тип ламп');
			return false;
		}
		let ledLamp = chosenLamps.ledLamp;
		let tisLamp = chosenLamps.tisLamp;
		let electricityTariff = Number($('#electricityTariff').val());
		let tisLampQty = Number($('#tisLampQty').val());
		let resultedRecoupment = recoupment(ledLamp, tisLamp, tisLampQty, electricityTariff);
		
		economyResultsBlock.html((''+electricityEconomy(ledLamp, tisLamp, tisLampQty, electricityTariff)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&thinsp;') + ' тг');
		recoupmentResultsBlock.html(resultedRecoupment + ' ' + pluralize('месяц, месяца, месяцев', resultedRecoupment));
		resultsBlock.removeClass('u-hidden');
		return false;
	});

	function resetCalculator() {
		resultsBlock.addClass('u-hidden');
		recoupmentResultsBlock.html('');
		economyResultsBlock.html('');
		calcFormLampPower.slideUp();
		$('.calculator__form-group--article').slideUp();
		// calcFormLampPower.find('.calculator-form__field').html('');
		$('#ledLampsOptions').html('');
		resetSelect($('#ledLampSelect'));
		resetSelect($('#tisLampSelect'));
	}

	function resetSelect ($select) {
		var $this = $select;
		var $styledSelect = $this.find('.select-styled');
		var $list = $this.find('ul.select-options');

		$styledSelect.html('Выбрать из списка').addClass('disabled');
		$list.html('');
	}
}