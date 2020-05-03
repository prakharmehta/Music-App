const request = require('request')

const apod = (date, callback) => {
    const url = `https://api.nasa.gov/planetary/apod?api_key=ydKbMkIDwgiPjP2ehOR6OO5z6Be7ZgzaNkGrK8BE&date=${date}`
    request({url, json:true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the space service', undefined)
        } else if (body.code=='400') {
            callback('Invalid Date', undefined)
        } else {
            info = {
                copyright: body.copyright,
                "default": {"copyright": "A Space Geek"},
                date: body.date,
                explanation: body.explanation,
                src: body.url,
                title: body.title
            }
            callback(undefined, info)
        }
    })
}


module.exports = apod