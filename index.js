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
    res.render('apod', {
        title: 'APOD',
    })
})

app.get('/apod/picture', (req, res) => {
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
    if(!req.query.startDate)
    {
        return res.send({
            err: 'You must provide a date!'
        })
    }

    neo(req.query.startDate, (err, data) => {
        if(err) {
            return res.send(err)
        }
        res.send({
            data
        })
    })
})

app.listen(port, (port) => {
    console.log(`Server is up and running on ${port}`);
});