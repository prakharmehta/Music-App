const form = document.querySelector("form")
const search = document.querySelector("input")
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const date = search.value
    fetch(`/neo?startDate=${date}`).then((response) => {
        response.json().then((data) => {
            if(data.err)
        {   
            msgOne.textContent = `${data.err}`
        }
        else 
        {   
             msgOne.textContent = `${data.data}`
             msgTwo.textContent = `${data.date}`
        }
        })
    })


})