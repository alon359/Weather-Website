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
            console.log(data);

        })
        .fail(() => {
            currentCityDegrees.innerHTML = '';
            cityChosen.innerHTML = `Invalid search please try again`;
            todayX.textContent = '';

            cityChosen.style.fontSize = '3vh';
        })
}

function putImages(f, s, t) {

    if (f[0] < 18 && f[0] > 5) img1.src = water;
    else if (f[0] >= 18 && f[0] <= 24) img1.src;
    else if (f[0] >= 25 && f[0] < 30) img1.src = cloudly;
    else if (f[0] >= 30) img1.src = sun;
    else img1.src = '';

    if (s[0] < 18 && s[0] > 5) img2.src = water;
    else if (s[0] >= 18 && s[0] <= 24) img2.src;
    else if (s[0] >= 25 && s[0] < 30) img2.src = cloudly;
    else if (s[0] >= 30) img2.src = sun;

    if (t[0] < 18 && t[0] > 5) img3.src = water;
    else if (t[0] >= 18 && t[0] <= 24) img3.src = cloud;
    else if (t[0] >= 25 && t[0] < 30) img3.src = cloudly;
    else if (t[0] >= 30) img3.src = sun;


}

function searchMinTemp(indexDay, data) {
    let min, max = 0,
        arr = [];

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
        return arr;
    }
}