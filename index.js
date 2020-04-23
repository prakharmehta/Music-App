const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('./views'))

app.get('/', (req, res) => {
    res.render('music')
})

console.log('Server is up');

app.listen(3000);