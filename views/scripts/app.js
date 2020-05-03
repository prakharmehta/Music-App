const form = document.getElementById('form1')
        const search = document.getElementById('input1')
        const msgOne = document.getElementById('msg1')
        const msgTwo = document.getElementById('msg2')
        // const pic = document.getElementById('apod')
        const div = document.getElementById('container')
        if(form)
        {   
            form.addEventListener('submit', (e) => {
                e.preventDefault()
            
                const date = search.value
            
                msgOne.textContent = 'Loading...'
                msgTwo.textContent = ''
                
                fetch(`/apod/picture?date=${date}`).then((response) => {
                    response.json().then((data) => {
                        if(data.error) {
                            msgOne.textContent = data.error;
                        } else {
                            msgOne.textContent = data.data.date;
                            if(!pic)
                            {
                            var pic = document.createElement("img");
                            pic.setAttribute("src", data.data.src);
                            div.appendChild(pic);
                            console.log(pic);
                            form.addEventListener('submit', () => {
                                div.removeChild(pic);
                            })
                            }                
                        }
                    })
                })
            })
        }