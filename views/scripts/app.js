console.log('Client side js');

fetch('http://localhost:3000/apod?date=2020-05-03').then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error);
        } else {
            console.log(data.data);
               
        }
    })
})
