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

	countTimer('20 july 2020');
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

	//Калькулятор

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

});
