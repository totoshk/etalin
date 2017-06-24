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
			name: "Прожектор МГЛ, 100Вт",
			bulbPower: 100,
			bulbQty: 1,
			lampPower: 120,
			article: "",
			type: "Металлогалогенная",
			lifeTime: 8000,
			lampCost: 2300,
			imgSrc: require("../images/calculator/mgl.jpg"),
			ledAnalogs: [
					{
						type: "led",
						name: "441-LED-FL-20-6K",
						lampPower: 20,
						lifeTime: 30000,
						lampCost: 3300,
						imgSrc: require("../images/calculator/441-LED-FL-20-6K.png")
					}
				]
		},
		{
			name: "Прожектор МГЛ, 150Вт",
			bulbPower: 150,
			bulbQty: 1,
			lampPower: 180,
			article: "",
			type: "Металлогалогенная",
			lifeTime: 8000,
			lampCost: 2500,
			imgSrc: require("../images/calculator/mgl.jpg"),
			ledAnalogs: [
					{
						type: "led",
						name: "443-LED-FL-30-6K",
						lampPower: 30,
						lifeTime: 30000,
						lampCost: 4700,
						imgSrc: require("../images/calculator/441-LED-FL-20-6K.png")
					}
				]
		},
		{
			name: "Прожектор МГЛ, 250Вт",
			bulbPower: 250,
			bulbQty: 1,
			lampPower: 300,
			article: "",
			type: "Металлогалогенная",
			lifeTime: 8000,
			lampCost: 3500,
			imgSrc: require("../images/calculator/mgl.jpg"),
			ledAnalogs: [
					{
						type: "led",
						name: "445-LED-FL-50-6K",
						lampPower: 50,
						lifeTime: 30000,
						lampCost: 7100,
						imgSrc: require("../images/calculator/441-LED-FL-20-6K.png")
					}
				]
		},
		{
			name: "РКУ, 250Вт",
			bulbPower: 250,
			bulbQty: 1,
			lampPower: 300,
			article: "",
			type: "ДНАТ",
			lifeTime: 12000,
			lampCost: 1000,
			imgSrc: require("../images/calculator/rku.png"),
			ledAnalogs: [
					{
						type: "led",
						name: "LED-STR-100-6K",
						lampPower: 100,
						lifeTime: 30000,
						lampCost: 25920,
						imgSrc: require("../images/calculator/LED-STR-100-6K.png")
					}
				]
		},
		{
			name: "РКУ, 400Вт",
			bulbPower: 400,
			bulbQty: 1,
			lampPower: 480,
			article: "",
			type: "ДНАТ",
			lifeTime: 12000,
			lampCost: 2000,
			imgSrc: require("../images/calculator/rku.png"),
			ledAnalogs: [
					{
						type: "led",
						name: "LED-STR-150-6K",
						lampPower: 150,
						lifeTime: 30000,
						lampCost: 34200,
						imgSrc: require("../images/calculator/LED-STR-150-6K.png")
					},
					{
						type: "led",
						name: "LED-STR-200-6K",
						lampPower: 200,
						lifeTime: 30000,
						lampCost: 41400,
						imgSrc: require("../images/calculator/LED-STR-200-6K.png")
					}
				]
		},
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
		console.log(chosenLamps);
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