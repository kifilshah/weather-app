
const request = require('request')



const geocode = (address,callback)=>{
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2lmaWxzaGFoIiwiYSI6ImNrejR6ZjRjNDBqNTEydm1lZHBuemU4angifQ.r8X88j4BhtZBzf8U8hu4XQ&limit=1'
    request({url,json:true}, (error,{body}={})=>{
        if (error){
            callback('Cannot able to Connect',undefined)
        } else if (!body.features[0]){
            callback('Nothing found',undefined)
        } else {
            const data = body.features[0]
            callback(undefined,{
                latitude: data.center[1],
                longitude: data.center[0],
                location: data.place_name
            })
        }
    })
}

module.exports = geocode