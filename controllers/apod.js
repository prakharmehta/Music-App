const request = require('request')

const apod = (date, hd, callback) => {
    const url = `https://api.nasa.gov/planetary/apod?api_key=ydKbMkIDwgiPjP2ehOR6OO5z6Be7ZgzaNkGrK8BE&date=${date}&hd=${hd}`
    request({url, json:true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the space service', undefined)
        } else if (body.code=='400') {
            callback('Invalid Date', undefined)
        } else {
            info = {
                copyright: "Mario Konang",
                date,
                explanation: "What happens if you keep going north? The direction north on the Earth, the place on your horizon below the northern spin pole of the Earth -- around which other stars appear to slowly swirl, will remain the same. This spin-pole-of-the-north will never move from its fixed location on the sky -- night or day -- and its height will always match your latitude.  The further north you go, the higher the north spin pole will appear.  Eventually, if you can reach the Earth's North Pole, the stars will circle a point directly over your head.  Pictured, a four-hour long stack of images shows stars trailing in circles around this north celestial pole.  The bright star near the north celestial pole is Polaris, known as the North Star.  The bright path was created by the astrophotographer's headlamp as he zigzagged up a hill just over a week ago in Lower Saxony, Germany. The astrophotographer can be seen, at times, in shadow. Actually, the Earth has two spin poles -- and much the same would happen if you started below the Earth's equator and went south.",
                "hdurl": "https://apod.nasa.gov/apod/image/2004/PathNorth_Konang_2500.jpg",
                "title": "A Path North",
            }

            callback(undefined, info)

        }

    })
}

module.exports = apod