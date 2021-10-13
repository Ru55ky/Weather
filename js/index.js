const _ApiKey = '22a0dc92d7fd75d721a65fa88ee9e98d'
const _Url = 'api.openweathermap.org/data/2.5/weather?'

const container = document.querySelector('.container'),
preloaderWeather = ['css/storm.gif', 'css/sunny.gif', 'css/snowflake.gif'],
preloader = document.querySelector('.container-preloader'),
preloaderImg = document.querySelector('.preloader-active'),
today = document.querySelector('.today'),
nextDay = document.querySelector('.nextDay')


const containerError = document.createElement('div')
containerError.classList.add('containerErr')
containerError.innerHTML = `
<span>Что-то пошло не так</span>
`


preloaderImg.style.backgroundImage = `url(${randomPreloader()})`

const connect = async function (url) {
    const res = await fetch(url, {
        method: 'GET'
    })
    return await res.json()
}
// карточка погоды на сегодня
 function weatherTodayFunction (response) {
    const {city} = response

    const newArr = response.list
    const weatherToday = newArr.slice(0, 4)
    weatherToday.forEach((element) => {
        
    const item = document.createElement('ul')
    item.classList.add('container-weather')
    item.innerHTML = `
    <li class="item-weather">${city.name}</li>
    <li class="item-weather">${element.dt_txt}
    <img src="http://openweathermap.org/img/wn/${element.weather[0]['icon']}@2x.png" 
    alt="${element.weather[0]['description']}">
    </li>
    <li class="item-weather">
                <div>
                    <span>Температура: ${Math.floor(element.main.temp - 273)}°</span>   
                </div>
            </li>

            <li class="item-weather">
            <div>
                <span>Максимальная темпуратура: ${Math.floor(element.main.temp_max - 273)}°</span>
                </div>
            </li>

            <li class="item-weather">
            <div>
                <span>Минимальная темпуратура: ${Math.floor(element.main.temp_min - 273)}°</span>
                </div>
            </li>

            <li class="item-weather">
                <span>Ощущается как: ${Math.floor(element.main.feels_like - 273)}°</span>
            </li>

            <li class="item-weather">Ветер: ${element.wind.speed} м/с</li>
            <li class="item-weather">Давление: ${element.main.pressure} мм рт. ст.</li>
            
    `

    container.append(item)
    })    
}

getResource()
//ввод в поисковой инпут через кнопку и enter
const btnSearch = document.querySelector('.btn-submit')
const inputSearch = document.querySelector('.inputSearch')
btnSearch.addEventListener('click', (e) => {
    e.preventDefault()

    const value = inputSearch.value
    searchCity(value)
})

inputSearch.addEventListener('keydown', (e) => {

    if(e.keyCode === 13) {
        const value = inputSearch.value
        searchCity(value)
    }
})
//поиск города через Api
function searchCity (city) {
    document.body.append(preloader)
    connect(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${_ApiKey}`)
    .then(data => {
        container.innerHTML = ''
        weatherTodayFunction(data)

        nextDay.addEventListener('click', () => {
            container.innerHTML = ''
            getWeatherNextDayFunction(data)
        })
        today.addEventListener('click',() => {
            container.innerHTML = ''
            weatherTodayFunction(data)
        })
        inputSearch.value = ''
    })
    .catch((err) => {
        console.error(err)
        document.body.append(containerError) 
    })
    .finally(() => {
        preloader.remove()
    })
}

//выдает рандомный прелоадер
function randomPreloader () {
    const item = Math.floor(Math.random() * preloaderWeather.length)
    return preloaderWeather[item]
}
console.log(randomPreloader())
//функция выдачи дефолтного города(тест)
function getResource () {
    document.body.append(preloader)
    connect(`https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${_ApiKey}`)
    .then(data => {
        container.innerHTML = ''
        weatherTodayFunction(data)
        document.body.append(preloader)
    })
    .finally(() => {
        preloader.remove()
    })
}
//функция прогноза погоды на завтра(если в инпуте был задан город)
function getWeatherNextDayFunction (response) {
    const {city} = response
    const newArr = response.list

    const nextDay = newArr.slice(4, 12)
    nextDay.forEach((element) => {
        
        const item = document.createElement('ul')
        item.classList.add('container-weather')
        item.innerHTML = `
        <li class="item-weather">${city.name}</li>
        <li class="item-weather">${element.dt_txt}
        <img src="http://openweathermap.org/img/wn/${element.weather[0]['icon']}@2x.png" 
        alt="${element.weather[0]['description']}">
        </li>
        <li class="item-weather">
                    <div>
                        <span>Температура: ${Math.floor(element.main.temp - 273)}°</span>   
                    </div>
                </li>
    
                <li class="item-weather">
                <div>
                    <span>Максимальная темпуратура: ${Math.floor(element.main.temp_max - 273)}°</span>
                    </div>
                </li>
    
                <li class="item-weather">
                <div>
                    <span>Минимальная темпуратура: ${Math.floor(element.main.temp_min - 273)}°</span>
                    </div>
                </li>
    
                <li class="item-weather">
                    <span>Ощущается как: ${Math.floor(element.main.feels_like - 273)}°</span>
                </li>
    
                <li class="item-weather">Ветер: ${element.wind.speed} м/с</li>
                <li class="item-weather">Давление: ${element.main.pressure} мм рт. ст.</li>
        `
        container.append(item)
        })  
}

/*темная тема */
let changeThemeButtons = document.querySelectorAll('.changeTheme');

changeThemeButtons.forEach(button => {
    button.addEventListener('click', function () { 
        let theme = this.dataset.theme; 
        applyTheme(theme); 
    });
});

function applyTheme(themeName) {
    document.querySelector('[title="theme"]').setAttribute('href', `css/theme-${themeName}.css`); 
    changeThemeButtons.forEach(button => {
        button.style.display = 'block'; // Показываем все кнопки смены темы
    });
    document.querySelector(`[data-theme="${themeName}"]`).style.display = 'none'; 
}


