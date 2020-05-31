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
        div.innerHTML=""
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
                    // msgOne.textContent = ''
                    apodLiteral.textContent = 'Astronomy Picture of the Day'    
                    div.innerHTML = `<img src = "${data.data.src}">`           
                }
            })
        })
    })
}

const neoForm = document.getElementById('form2')
const neoSearch = document.getElementById('input2')
const msgTwo = document.getElementById('msg2')
const neoUL = document.getElementById('neo-info')

if(neoForm)
{   
    neoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const startDate = neoSearch.value        
        
        msgTwo.textContent = 'Loading...'
        
        fetch(`/neo?start_date=${startDate}&end_date=${startDate}`).then((response) => {
            response.json().then((data) => {
                if(data.error)
                {
                    msgTwo.textContent = data.error
                } else {
                    msgTwo.textContent = 'This page shows the Near Earth Objects by Date'
                    neoUL.innerHTML = ""
                    data.data.list.forEach(neo => {
                    neoLI = document.createElement("li");

                    neoHeader = document.createElement("div");
                    neoHeader.setAttribute("class","collapsible-header");

                    neoIcon = document.createElement("i");
                    neoIcon.setAttribute("class", "material-icons");

                    neoHeader.appendChild(neoIcon)
                    neoIcon.appendChild(document.createTextNode("whatshot"));

                    neoLIBody = document.createElement("div");
                    neoLIBody.setAttribute("class", "collapsible-body");

                        neoHeader.appendChild(document.createTextNode(`Asteroid Name: ${neo.neoName.replace('(','').replace(')','')}`));
                        neoLI.appendChild(neoHeader);
                        neoSpanUL = document.createElement("ul");
                        neoSpanLI = document.createElement("li");
                        neoSpanLI.appendChild(document.createTextNode(`Potentially Hazardous: ${neo.hazardous}`))
                        neoSpanUL.appendChild(neoSpanLI)

                        neoSpanLI = document.createElement("li");
                        neoSpanLI.appendChild(document.createTextNode(`Diameter: ${Math.round(neo.diameter.estimated_diameter_min)} to ${Math.round(neo.diameter.estimated_diameter_max)} meters (approx.)`))
                        neoSpanUL.appendChild(neoSpanLI)

                        neoSpanLI = document.createElement("li");
                        neoSpanLI.appendChild(document.createTextNode(`Date of Closest Approach: ${neo.closeApproachDate}`))
                        neoSpanUL.appendChild(neoSpanLI)

                        neoSpanLI = document.createElement("li");
                        neoSpanLI.appendChild(document.createTextNode(`Relative Velocity: ${Math.round(neo.velocity.kilometers_per_hour)} km/h (approx.)`))
                        neoSpanUL.appendChild(neoSpanLI)

                        neoSpanLI = document.createElement("li");
                        neoSpanLI.appendChild(document.createTextNode(`NASA - JPL URL: `))
                        var link = document.createElement("a")
                        link.setAttribute("src", neo.nasaJplUrl)
                        link.appendChild(document.createTextNode(`${neo.nasaJplUrl}`))
                        neoSpanLI.appendChild(link)
                        neoSpanUL.appendChild(neoSpanLI)
                        
                        neoLIBody.appendChild(neoSpanUL);
                        neoLI.appendChild(neoLIBody);
                        neoUL.appendChild(neoLI);
                    });
                    msgTwo.textContent = `Number of Near Earth Objects: ${data.data.count}`
                }               
            })
        })
    })
}
