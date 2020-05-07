const express = require('express');
const neo = require('./controllers/neo.js')
const apod = require('./controllers/apod')

const app = express();
const port = process.env.PORT || 3000

app.set('view engine', 'ejs');

app.use(express.static('./views'))

app.get('', (req, res) => {
    res.render('space', {
        title: 'Space'
    })
})

app.get('/apod', (req, res) => {
    if(!req.query.date)
    {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        apod(date, (err, data) => {
            if(err) {
                return res.send(err)
            }
            res.send({
                data
            })
        })
    }
    else
    {
        apod(req.query.date, (err, data) => {
            if(err) {
                return res.send(err)
            }
            res.send({
                data
            })
            
        })
    }
})

    

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About'

    })
})

app.get('/neo', (req, res) => {
    if(!req.query.start_date)
    {          
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        today = new Date(date);
        req.query.start_date = today.toISOString().slice(0,10)
        neo(req.query.start_date, (err, data) => {
            if(err) {
                return res.send(err)
            }
            res.send({
                data
            })
        })
    }
    else
    {
        neo(req.query.start_date, (err, data) => {
            if(err) {
                return res.send(err)
            }
            res.send({
                data
            })
        })
    }
})

app.listen(port, () => {
    console.log(`Server is up and running on ${port}`);
});