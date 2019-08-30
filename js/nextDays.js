let time = new Date();
let forecastData;
const days = ['SUNDAY', 'MONDAY', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let firstDayMaxMin, secondDayMaxMin, thirdDayMaxMIn;
let cloud = 'css/cloud.png';
let sun = 'css/sun.png';
let cloudly = 'css/cloudy.png';
let water = 'css/water.png';
let todayX = document.getElementById('today');
let img1 = document.getElementById('img1');
let dayOneName = document.getElementById('nameOne');
let dayTwo = document.getElementById('nameTwo');
let dayThree = document.getElementById('nameThree');
let dayOneTemps = document.getElementById('dayOneTemps');
let dayTwoTemps = document.getElementById('daytwoTemps');
let dayThreeTemps = document.getElementById('dayThreeTemps')
let dayOneText = document.getElementById('text1');
let dayTwoText = document.getElementById('text2');
let dayThreeText = document.getElementById('text3');


function getUpdateDays() {
    let currentDay = time.getDay();
    let arr = [];


    if (currentDay == 6)
        return [days[0], days[1], days[2]];
    else if (currentDay == 5)
        return [days[6], days[0], days[1]];
    else {
        for (let i = currentDay; i <= currentDay + 2; i++) {
            arr.push(days[i].toUpperCase());
        }
    }
    return arr;
}

$(document).ready(() => {
    getForecast();
    let updatedDaysArr = getUpdateDays();
    let [firstDay, secondDay, thirdDay] = updatedDaysArr;


    dayOneName.innerHTML = firstDay.toUpperCase();
    dayTwo.innerHTML = secondDay.toUpperCase();
    dayThree.innerHTML = thirdDay.toUpperCase();

})





function getForecast() {
    $.getJSON(fiveDaysForcastApi, (data) => {
            firstDayMaxMin = searchMinTemp(1, data);

            secondDayMaxMin = searchMinTemp(2, data);
            thirdDayMaxMIn = searchMinTemp(3, data);
            dayOneTemps.innerHTML = firstDayMaxMin[0] + '&#176' + '/' + firstDayMaxMin[1] + '&#176;';
            dayTwoTemps.innerHTML = secondDayMaxMin[0] + '&#176' + '/' + secondDayMaxMin[1] + '&#176;';
            dayThreeTemps.innerHTML = thirdDayMaxMIn[0] + '&#176' + '/' + thirdDayMaxMIn[1] + '&#176;';
            putImages(firstDayMaxMin, secondDayMaxMin, thirdDayMaxMIn);




            putWeatherText(firstDayMaxMin, 1);
            putWeatherText(secondDayMaxMin, 2);
            putWeatherText(thirdDayMaxMIn, 3);



        })
        .fail(() => {
            currentCityDegrees.innerHTML = '';
            cityChosen.innerHTML = `Invalid search please try again`;
            todayX.textContent = '';

            cityChosen.style.fontSize = '3vh';
        })

}

function putWeatherText(day, index) {
    if (index == 1)
        dayOneText.innerHTML = day[2];
    else if (index == 2)
        dayTwoText.innerHTML = day[2];
    else if (index == 3)
        dayThreeText.innerHTML = day[2];
}

function putImages(f, s, t) {

    if (f[2] == 'Clouds') img1.src = cloud;
    else if (f[2] == 'Clear') img1.src = sun;
    else if (f[2] == 'Rain') img1.src = water;
    else if (f[0] < 18 && f[0] > 5) img1.src = water;
    else if (f[0] >= 18 && f[0] <= 24) img1.src;
    else if (f[0] >= 25 && f[0] < 30) img1.src = cloudly;
    else if (f[0] >= 30) img1.src = sun;
    else img1.src = '';

    if (s[2] == 'Clouds') img2.src = cloud;
    else if (s[2] == 'Clear') img2.src = sun;
    else if (s[2] == 'Rain') img2.src = water;
    else if (s[0] < 18 && s[0] > 5) img2.src = water;
    else if (s[0] >= 18 && s[0] <= 24) img2.src;
    else if (s[0] >= 25 && s[0] < 30) img2.src = cloudly;
    else if (s[0] >= 30) img2.src = sun;

    if (t[2] == 'Clouds') img3.src = cloud;
    else if (t[2] == 'Clear') img3.src = sun;
    else if (t[2] == 'Rain') img3.src = water;
    else if (t[0] < 18 && t[0] > 5) img3.src = water;
    else if (t[0] >= 18 && t[0] <= 24) img3.src = cloud;
    else if (t[0] >= 25 && t[0] < 30) img3.src = cloudly;
    else if (t[0] >= 30) img3.src = sun;


}

function searchMinTemp(indexDay, data) {
    let min, max = 0,
        arr = [];
    console.log(data);

    if (indexDay == 1) {
        min = data.list[5].main.temp_min;
        for (i = 6; i <= 12; i++) {
            if (data.list[i].main.temp_min < min)
                min = data.list[i].main.temp_min;
            if (data.list[i].main.temp_max > max)
                max = data.list[i].main.temp_max;
        }
        arr.push(Math.round(max).toString());
        arr.push(Math.round(min).toString());
        arr.push(data.list[7].weather[0].main);
        return arr;

    } else if (indexDay == 2) {
        min = data.list[13].main.temp_min;
        for (i = 14; i <= 20; i++) {
            if (data.list[i].main.temp_min < min)
                min = data.list[i].main.temp_min;
            if (data.list[i].main.temp_max > max)
                max = data.list[i].main.temp_max;
        }
        arr.push(Math.round(max).toString());
        arr.push(Math.round(min).toString());
        arr.push(data.list[15].weather[0].main);
        return arr;
    } else {
        min = data.list[21].main.temp_min;
        for (i = 22; i <= 28; i++) {
            if (data.list[i].main.temp_min < min)
                min = data.list[i].main.temp_min;
            if (data.list[i].main.temp_max > max)
                max = data.list[i].main.temp_max;
        }

        arr.push(Math.round(max).toString());
        arr.push(Math.round(min).toString());
        arr.push(data.list[24].weather[0].main);



        return arr;
    }


}