console.log('Client side JS is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const successMsg = document.querySelector('#success')
const errorMsg = document.querySelector('#error')

weatherForm.addEventListener('submit',(event)=>{
    errorMsg.textContent = ''
    successMsg.textContent = ''
    event.preventDefault()
    const location = search.value
    console.log(location)
    url = '/weather?address='+location
    fetch(url).then((response)=>{
            response.json().then((data)=>{
                if (data.error) {
                    errorMsg.textContent = data.error
                } else {
                    errorMsg.textContent = data.location +' - '+ data.forecast
                }
            })
    })
})