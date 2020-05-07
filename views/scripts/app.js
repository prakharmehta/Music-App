const apodForm = document.getElementById('form1')
const apodSearch = document.getElementById('input1')
const dateOutput = document.getElementById('date')
const title = document.getElementById('title')
const copyright = document.getElementById('copyright')
const explanation = document.getElementById('explanation')
const div = document.getElementById('img-container-1')
const msgOne = document.getElementById('msg1')
const apodLiteral = document.getElementById('apodLiteral')
if(apodForm)
{   
    apodForm.addEventListener('submit', (e) => {
        e.preventDefault()
    
        const date = apodSearch.value
        
        msgOne.textContent = 'Loading...'
        
        fetch(`/apod?date=${date}`).then((response) => {
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
                    apodForm.addEventListener('submit', () => {
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
const neoForm = document.getElementById('form2')
const neoSearch = document.getElementById('input2')
const msgTwo = document.getElementById('msg2')
const neoDiv = document.getElementsByClassName('neo-info')
if(neoForm)
{   
    neoForm.addEventListener('submit', (e) => {
        e.preventDefault()
    
        const startDate = neoSearch.value        
        
        // msgOne.textContent = 'Loading...'
        
        fetch(`/neo?start_date=${startDate}&end_date=${startDate}`).then((response) => {
            response.json().then((data) => {
                if(data.error)
                {
                    msgTwo.textContent = data.error
                } else {
                    neoUL = document.createElement("ul");
                    neoUL.setAttribute("class","collapsible popout");
                    neoDiv.appendChild(neoUL);
                    neoLI = document.createElement("li");
                    neoHeader = document.createElement("div");
                    neoHeader.setAttribute("class","collapsible-header");
                    neoLIBody = document.createElement("div");
                    neoLIBody.setAttribute("class", "collapsible-body");
                    data.data.list.forEach(neo => {
                        neoUL.appendChild(neoLI);


                    });
                }               
            })
        })
    })
}