let cityChosen = document.getElementById('cityNameCurrent');
let currentCityDegrees = document.getElementById('currentCityDegrees');
let fiveDaysForcastApi = 'https://api.openweathermap.org/data/2.5/forecast?q=berlin&mode=json&units=metric&appid=ea4d23eda1152635a92fdc97c12e96ea';
let currentWeatherApi = 'https://api.openweathermap.org/data/2.5/weather?q=berlin&mode=json&units=metric&appid=ea4d23eda1152635a92fdc97c12e96ea';
let today = document.getElementById('today');
let input, cityName;

$(document).ready(() => {
    $('#btn-search').on('click', () => {
        fiveDaysForcastApi = 'https://api.openweathermap.org/data/2.5/forecast?q=' + $('#input').val() + '&mode=json&units=metric&appid=ea4d23eda1152635a92fdc97c12e96ea';
        currentWeatherApi = 'https://api.openweathermap.org/data/2.5/weather?q=' + $('#input').val() + '&mode=json&units=metric&appid=ea4d23eda1152635a92fdc97c12e96ea';
        $.getJSON(currentWeatherApi, (data) => {
                today.textContent = ' today';
                input = $('#input').val();
                cityChosen.innerHTML = $('#input').val();
                currentCityDegrees.innerHTML = Math.round(data.main.temp).toString() + ' &#8451';

            })
            .fail(() => {
                currentCityDegrees.innerHTML = '';
                cityChosen.innerHTML = `Invalid search please try again`;
                today.innerHTML = '';
                cityChosen.style.fontSize = '3vh';
            })

        $.getJSON(fiveDaysForcastApi, (data) => {

                firstDayMaxMin = getForecast();

            })
            .fail(() => {
                currentCityDegrees.innerHTML = '';
                cityChosen.innerHTML = `Invalid search please try again`;
                cityChosen.style.fontSize = '3vh';
            })

    })
})


$(document).ready(() => {
    $.getJSON(currentWeatherApi, (data) => {

            today.textContent = ' today';
            cityName = 'berlin';
            cityChosen.innerHTML = cityName.toUpperCase();
            currentCityDegrees.innerHTML = Math.round(data.main.temp).toString() + ' &#8451';

        })
        .fail(() => {
            currentCityDegrees.innerHTML = '';
            cityChosen.innerHTML = `Invalid search please try again`;
            cityChosen.style.fontSize = '3vh';
        })

})