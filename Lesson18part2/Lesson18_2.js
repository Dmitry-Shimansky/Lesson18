const dayPart = {
	morning: 'Доброе утро',
	day: 'Добрый день',
	evening: 'Добрый вечер',
	night: 'Доброй ночи'
};

function getTime() {

	const timeNow = new Date().toLocaleTimeString('en'),
		day = new Date().toLocaleString('ru-RU', { weekday: 'long' }),
        hours = Math.floor(new Date().getTime() / 60 / 60 / 1000) % 24 + 3,
        newYear = new Date('01 january 2021').getTime(),
		dateNow = new Date().getTime(),
		timeLeft = (newYear - dateNow) / 1000,
	    dayToNewYear = Math.floor(timeLeft / 60 / 60 / 24);

	return {
		timeNow,
		day,
        hours,
        dayToNewYear
	};

};

function input() {

    const value = getTime();
    
    if (value.hours >= 0 && value.hours < 6){
        document.body.innerHTML = dayPart.night;
    } else if (value.hours >= 6 && value.hours < 12) {
        document.body.innerHTML = dayPart.morning;
    } else if (value.hours >= 12 && value.hours < 18) {
        document.body.innerHTML = dayPart.day;
    } else {
        document.body.innerHTML = dayPart.evening;
    };

    document.body.innerHTML += '<br>Сегодня: ' + value.day;

    document.body.innerHTML += '<br>Текущее время: ' + value.timeNow;

    document.body.innerHTML += '<br>До нового года осталось' + value.dayToNewYear; 
};

input();

console.log(getTime());
