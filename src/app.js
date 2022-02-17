const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')



const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,'../src/templates/views')
const partialsPath = path.join(__dirname,'../src/templates/partials')

//set up handlebars & paths for views directory
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
console.log(partialsPath)

//set up static directory to serve. Images and others assets are sent to the user thorugh this and linked later
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Kifilshah'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Kifil S'
    })
})



app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        message: 'go to help@super.com to get crazy helpp stuff',
        name: 'Kifil'
    })

})

// app.get('/about',(req,res)=>{
//     res.send('<h1>Our app is the best app ever</h1>>')

// })

app.get('/weather',(req,res)=>{
    const address = req.query.address

    
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }else {
        geocode(address,(error,{latitude,longitude,location}={})=>{
            if (error) {
                return res.send({
                    error: 'Cannot find address'
                })
            } else {
                forecast(latitude,longitude,(error,data)=>{
                    if (error) {
                        return res.send({
                            error: error
                        })                    
                    } else {
                        return res.send({
                            forecast: data,
                            location,
                            address
                        })     
                    }
                })
            }
        
        }) 
    }    
})

app.get('/products',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search'
        })
    }
    
    
    res.send({
        products: []
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 404,
        name: 'Md Kifilshah',
        errorMessage: 'Cannot find help article'})

})

app.get('*',(req,res)=>{
    res.render('404',{
        title: 404,
        name: 'Md Kifilshah',
        errorMessage: '404: Page not found'})

})


app.listen(3000,()=>{
    console.log('Server is listening')
})