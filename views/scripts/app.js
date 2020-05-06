const form = document.getElementById('form1')
        const search = document.getElementById('input1')
        const dateOutput = document.getElementById('date')
        const title = document.getElementById('title')
        const copyright = document.getElementById('copyright')
        const explanation = document.getElementById('explanation')
        const div = document.getElementById('img-container-1')
        const msgOne = document.getElementById('msg1')
        const apodLiteral = document.getElementById('apodLiteral')
        if(form)
        {   
            form.addEventListener('submit', (e) => {
                e.preventDefault()
            
                const date = search.value
            
                msgOne.textContent = 'Loading...'
                
                fetch(`/apod/picture?date=${date}`).then((response) => {
                    response.json().then((data) => {
                        if(data.error) {
                            msgOne.textContent = data.error;
                        } else {
                            dateOutput.textContent = `DATE: ${data.data.date}`;
                            title.textContent = `TITLE: ${data.data.title}`;
                            if(!data.data.copyright)
                            {
                                copyright.textContent = `COPYRIGHT: ${data.data.default.copyright}`;
                            }
                            else
                            {
                                copyright.textContent = `COPYRIGHT: ${data.data.copyright}`;
                            }
                            explanation.textContent = `${data.data.explanation}`;
                            msgOne.textContent = ''
                            apodLiteral.textContent = 'Astronomy Picture of the Day'
                            if(!pic)
                            {
                            var pic = document.createElement("img");
                            pic.setAttribute("src", data.data.src);
                            pic.setAttribute("class", "materialboxed");
                            div.appendChild(pic);
                            form.addEventListener('submit', () => {
                                div.removeChild(pic);
                                dateOutput.textContent=''
                                title.textContent=''
                                explanation.textContent=''
                                copyright.textContent=''
                                apodLiteral.textContent=''
                            })
                            }                
                        }
                    })
                })
            })
        }