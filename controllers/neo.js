const request = require('request')

const neo = (startDate, callback) => {
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&${startDate}=2015-09-08&api_key=ydKbMkIDwgiPjP2ehOR6OO5z6Be7ZgzaNkGrK8BE`

    request({url, json:true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to NeoW services', undefined);    
        } else {
            asteroids = []
            body.near_earth_objects[startDate].forEach(element => {
                neo_name = element.name
                hazardous = element.is_potentially_hazardous_asteroid
                asteroids.push({neo_name, hazardous})          
            }) 

            info = {
                list: asteroids,
                count: body.near_earth_objects[startDate].length,
            }
            callback(undefined, info)
        }
    })
}

module.exports = neo