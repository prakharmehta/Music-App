const request = require('request')

const neo = (startDate, callback) => {
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=ydKbMkIDwgiPjP2ehOR6OO5z6Be7ZgzaNkGrK8BE`

    request({url, json:true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to NeoW services', undefined);    
        } else {
            asteroids = []
            body.near_earth_objects[startDate].forEach(element => {
                neoName = element.name
                hazardous = element.is_potentially_hazardous_asteroid
                nasaJplUrl = element.nasa_jpl_url
                diameter = element.estimated_diameter.meters
                closeApproachDate = element.close_approach_data[0].close_approach_date_full
                velocity = element.close_approach_data[0].relative_velocity
                asteroids.push({neoName, hazardous, nasaJplUrl, diameter, closeApproachDate, velocity})          
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