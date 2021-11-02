function renderCardFiveDay (response) {
    const arr = response.list
    const current = new Date().getTime()
    const date = '2021-10-29 24:00:00'
    const next = Date.parse(date)


   const filtered = arr.filter((n) => {
        const a = Date.parse(n.dt_txt)
       return a >= current
   })
    const newArr = [...filtered]
    newArr.forEach(item => {

        const card = document.createElement('div')
        card.innerHTML = `
    <div>${Math.floor(item.main.temp - 273)}</div>
    `
        document.body.insertAdjacentElement('afterend', card)
        console.log(next, current, filtered)
    })

}
connect(`https://api.openweathermap.org/data/2.5/forecast?id=524901&cnt=6&appid=${_ApiKey}`)
    .then(data => {
        renderCardFiveDay(data)
    })
