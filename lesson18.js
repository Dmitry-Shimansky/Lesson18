window.addEventListener('DOMContentLoaded', () => {
'use strict';

	//Timer
	function countTimer(deadLine) {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		function getTimeRemaining() {
			const dateStop = new Date(deadLine).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60); //% 24,
			//day = Math.floor(timeRemaining / 60 / 60 / 24);
			return {
				timeRemaining,
				hours,
				minutes,
				seconds
			};
		}

		let interval = setInterval (function() {
			const timer = getTimeRemaining();

			if (timer.hours < 10) {
				timerHours.textContent = '0' + timer.hours;
			} else {
				timerHours.textContent = timer.hours;
			}
			if (timer.minutes < 10) {
				timerMinutes.textContent = '0' + timer.minutes;
			} else {
				timerMinutes.textContent = timer.minutes;
			}
			if (timer.seconds < 10) {
				timerSeconds.textContent = '0' + timer.seconds;
			} else {
				timerSeconds.textContent = timer.seconds;
			}
			
			if (timer.timeRemaining <= 0) {
				clearInterval(interval);
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
			}
		}, 1000);

	};

	countTimer('25 july 2020');
	//setInterval(countTimer, 1000, '20 july 2020');

	//Меню
	const toggleMenu = () => {

		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu');
			//closeBtn = document.querySelector('.close-btn'),
			//menuItems = menu.querySelectorAll('ul>li');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');

			/*if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
				menu.style.transform = `translate(0)`;
			} else {
				menu.style.transform = `translate(-100%)`;
			}*/
		};

		menu.addEventListener('click', (event) => {
			const target = event.target;
			if (target.tagName === 'A') {
				handlerMenu();
			}
		});

		btnMenu.addEventListener('click', handlerMenu);
		//closeBtn.addEventListener('click', handlerMenu);
		//menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

		/*for (let i = 0; i < menuItems.length; i++) {
			menuItems[i].addEventListener('click', handlerMenu);
		}*/
	};

	toggleMenu();

	//popup
	const togglePopup = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popUp = document.querySelector('.popup-content'),
			width = document.documentElement.clientWidth;
		let	count = 0;

		let flyingPopUp = function () {

			count++;
			if (width < 768) {
				return;
			} else {
				popUp.style.top = count + 'px';
				if (count < 250) {
					setTimeout(flyingPopUp, 10);
				}
			}
		};

		popupBtn.forEach((elem) => {
			elem.addEventListener('click', () => {
				popup.style.display = 'block';
				flyingPopUp();
			});
		});

		/*popUpClose.addEventListener('click', () => {
			popup.style.display = 'none';
			popUp.style.top = '0px';
			count = 0;
		});*/

		popup.addEventListener('click', (event) => {
			let target = event.target;

			if (target.classList.contains('popup-close')) {
				popup.style.display = 'none';
				popUp.style.top = '0px';
				count = 0;
			} else {
				target = target.closest('.popup-content');

				if (!target) {
					popup.style.display = 'none';
					popUp.style.top = '0px';
					count = 0;
				}
			}
		})
	};

	togglePopup();

	//Табы

	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = (index) => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};

		tabHeader.addEventListener('click', (event) => {
			let target = event.target;

			target = target.closest('.service-header-tab');

			if (target) {
				tab.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}
				});
			}
		});
	};

	tabs();

	//Слайдер

	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			//btn = document.querySelectorAll('.portfolio-btn'),
			slider = document.querySelector('.portfolio-content');

		let currentSlide = 0,
			interval;

		const dotAdding = () => {
			const ul = document.querySelector('.portfolio-dots');

			for (let i = 0; i < slide.length; i++) {

				const li = document.createElement('li');
				li.classList.add('dot');
				if (i === 0) {
					li.classList.add('dot-active');
				}
				ul.append(li);
			}
		};

		dotAdding();

		const dot = document.querySelectorAll('.dot');

		const prevSlide = (elem, index, strClass) => {

			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {

			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};

		const startSlide = (time = 1500) => {

			interval = setInterval(autoPlaySlide, time);

		};

		const stopSlide = () => {

			clearInterval(interval);
		};

		slider.addEventListener('click', (event) => {
			event.preventDefault();

			const target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dot.forEach((elem, index) => {
					if (elem === target) {
						currentSlide = index;
					}
				});
			}

			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}

			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		});

		slider.addEventListener('mouseover', (event) => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', (event) => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				startSlide();
			}
		});

		startSlide(1500);

	};

	slider();

	//Наша команда

	const photoSwitcher = () => {

		const row = document.getElementsByClassName('row')[8];

		row.addEventListener('mouseover', (event) => {

			if (event.target.className !== 'command__photo') {
				return;
			}
			const src = event.target.src;

			event.target.src = event.target.dataset.img;

			row.addEventListener('mouseout', (event) => {

				if (event.target.className !== 'command__photo') {
					return;
				}
				event.target.src = src;
			});

		});

	};

	photoSwitcher();

	//RegExp

	const calculator = () => {

		const calcBlock = document.querySelector('.calc-block');

		calcBlock.addEventListener('input', (event) => {

			if (event.target.tagName === 'SELECT') {
				return;
			}

			event.target.value = event.target.value.replace(/\D/g, '');
		});

	};

	calculator();

	//Калькулятор

	const calc = (price = 100) => {

		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcDay = document.querySelector('.calc-day'),
			calcCount = document.querySelector('.calc-count'),
			totalValue = document.getElementById('total');

		const countSum = () => {
			let total = 0,
				countValue = 1,
				dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = +calcSquare.value;

			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}

			if (calcDay.value && calcDay.value < 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value < 10) {
				dayValue *= 1.5;
			}

			if (typeValue && squareValue) {
				total = Math.round(price * typeValue * squareValue * countValue * dayValue);
			}
			totalValue.textContent = total;
		};

		calcBlock.addEventListener('change', (event) => {
			const target = event.target;
			/*if (terget.match('.calc-type') || target.matches('.calc-square') || target.matches('.calc-day') || target.matches('.calc-count')) {

			}
			if (target === clacType || target === calcSquare || terget === calcDay || target === calcCount) {

			}*/
			if (target.matches('select') || target.matches('input')) {
				countSum();
			}
		});
	};

	calc(100);

	//send ajax form

	const sendForm = () => {
		const errorMessage = 'Что то пошло не так...',
			loadMessage = 'Загрузка...',
			successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

		const form = document.getElementById('form1');
		const form2 = document.getElementById('form2');

		const statusMessage = document.createElement('div');
		statusMessage.style.cssText = 'font-size: 2rem;';

		const resetInputs = () => {
			const name2 = document.querySelector('#form2-name'),
				email2 = document.querySelector('#form2-email'),
				phone2 = document.querySelector('#form2-phone'),
				message2 = document.querySelector('#form2-message');

			name2.value = '';
			email2.value = '';
			phone2.value = '';
			message2.value = '';

			const name1 = document.querySelector('#form1-name'),
				email1 = document.querySelector('#form1-email'),
				phone1 = document.querySelector('#form1-phone');

			name1.value = '';
			email1.value = '';
			phone1.value = '';
		};

		const inputValidation = () => {
			const phone1 = document.querySelector('#form1-phone'),
				phone2 = document.querySelector('#form2-phone'),
				name1 = document.querySelector('#form1-name'),
				name2 = document.querySelector('#form2-name'),
				message2 = document.querySelector('#form2-message');

			phone1.addEventListener('input', maskPhone('#form1-phone'));
			phone2.addEventListener('input', maskPhone('#form2-phone'));
			name1.addEventListener('input', () => {
				name1.value = name1.value.replace(/[a-zA-Z0-9!@#$%^&*.,?/=()_+{}]/g, '');
			});	
			name2.addEventListener('input', () => {
				name2.value = name2.value.replace(/[a-zA-Z0-9!@#$%^&*.,?/=()_+{}]/g, '');
			});
			message2.addEventListener('input', () => {
				message2.value = message2.value.replace(/[a-zA-Z0-9!@#$%^&*.,?/=()_+{}]/g, '');
			});

		};

		inputValidation();

		const postData = (body, outputData, errorData) => {
			const request = new XMLHttpRequest();

			request.addEventListener('readystatechange', () => {
				if (request.readyState !== 4) {
					return;
				}
				if (request.status === 200) {
					outputData();
					resetInputs();
				} else {
					errorData(request.status);
				}
			});

			request.open('POST', './server.php');
			request.setRequestHeader('Content-type', 'application/json');
			request.send(JSON.stringify(body));
		};

		form.addEventListener('submit', () => {
			event.preventDefault();
			form.appendChild(statusMessage);
			statusMessage.textContent = loadMessage;
			const formData = new FormData(form);
			const body = {};

			formData.forEach((val, key) => {
				body[key] = val;
			});

			postData(body, () => {
				statusMessage.textContent = successMessage;
			}, (error) => {
				statusMessage.textContent = errorMessage;
				console.error(error);
			});
		});

		form2.addEventListener('submit', () => {
			event.preventDefault();
			form2.appendChild(statusMessage);
			statusMessage.textContent = loadMessage;
			const formData = new FormData(form2);
			const body = {};

			for (let val of formData.entries()) {
				body[val[0]] = val[1];
			} 

			postData(body, () => {
				statusMessage.textContent = successMessage;
			}, (error) => {
				statusMessage.textContent = errorMessage;
				console.error(error);
			});
		});

	};

	sendForm();



});
