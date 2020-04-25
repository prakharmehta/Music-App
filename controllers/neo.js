const request = require('request')

const neo = (startDate, callback) => {
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&${startDate}=2015-09-08&api_key=ydKbMkIDwgiPjP2ehOR6OO5z6Be7ZgzaNkGrK8BE`

    request({url, json:true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to NeoW services', undefined);    
        } else {
            info = {
                list: body.near_earth_objects[0],
                count: body.element_count,
            }
            callback(undefined, info)
        }
    })
}

module.exports = neo