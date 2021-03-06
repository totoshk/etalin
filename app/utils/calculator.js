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
			name: "ЛПО 0,6м 2*18",
			bulbPower: 18,
			bulbQty: 2,
			lampPower: 36,
			article: "",
			type: "Люминисцентная",
			lifeTime: 2000,
			lampCost: 300,
			imgSrc: require("../images/calculator/lpo-two-small.jpg"),
			ledAnalogs: [
					{
						type: "led",
						name: "L-420-Line-0,6M-16-5K",
						lampPower: 16,
						lifeTime: 30000,
						lampCost: 1260,
						imgSrc: require("../images/calculator/led-line-one.jpg")
					},
					{
						type: "led",
						name: "L-422-TRI-P-0,6-18-5K",
						lampPower: 18,
						lifeTime: 30000,
						lampCost: 2700,
						imgSrc: require("../images/calculator/led-line-two.jpg")
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
			imgSrc: require("../images/calculator/lpo-two-big.jpg"),
			ledAnalogs: [
					{
						type: "led",
						name: "L-421-Line-1,2M-32-5K",
						lampPower: 32,
						lifeTime: 30000,
						lampCost: 2100,
						imgSrc: require("../images/calculator/led-line-one-2.jpg")
					},
					{
						type: "led",
						name: "L-424-TRI-P-1,2-36-5K",
						lampPower: 36,
						lifeTime: 30000,
						lampCost: 4000,
						imgSrc: require("../images/calculator/led-line-two-big.jpg")
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
			imgSrc: require("../images/calculator/lpo-four-small.png"),
			ledAnalogs: [
					{
						type: "led",
						name: "L-419-SPL6060-36-5K",
						lampPower: 36,
						lifeTime: 30000,
						lampCost: 5700,
						imgSrc: require("../images/calculator/L-419-SPL6060-36-5K.png")
					},
					{
						type: "led",
						name: "L-418-RPL6060-36-5K",
						lampPower: 36,
						lifeTime: 30000,
						lampCost: 3700,
						imgSrc: require("../images/calculator/led-block-two.png")
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
			imgSrc: require("../images/calculator/npp-small.jpg"),
			ledAnalogs: [
					{
						type: "led",
						name: "410-LED-OCL-15-6K",
						lampPower: 15,
						lifeTime: 30000,
						lampCost: 2700,
						imgSrc: require("../images/calculator/led-ocl.png")
					},
					{
						type: "led",
						name: "409-LED-OLL-15-6K",
						lampPower: 15,
						lifeTime: 30000,
						lampCost: 2700,
						imgSrc: require("../images/calculator/409-LED-OLL-15-6K.png")
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
			imgSrc: require("../images/calculator/npp-small.jpg"),
			ledAnalogs: [
					{
						type: "led",
						name: "412-LED-OCL-20-6K",
						lampPower: 20,
						lifeTime: 30000,
						lampCost: 3800,
						imgSrc: require("../images/calculator/led-ocl.png")
					},
					{
						type: "led",
						name: "411-LED-OLL-20-6K",
						lampPower: 20,
						lifeTime: 30000,
						lampCost: 3800,
						imgSrc: require("../images/calculator/409-LED-OLL-15-6K.png")
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