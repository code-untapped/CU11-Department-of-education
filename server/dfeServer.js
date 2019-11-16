const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');

app.set('port', process.env.PORT || 8840);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    // TODO: Check for NODE_ENV development
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/getDfeJobs', function(req, res, next) {
    TimeNow = new Date();
    msg = '\n Get Dfe jobs request received at: ' + TimeNow + '\n';

    axios.get('https://teaching-vacancies.service.gov.uk/api/v1/jobs.json')
    .then((response) => {
        if ( response.status === 200 ) {
            console.log(response.data);
            res.writeHead(200, {'Content-Type': 'JSON'});
            res.end(JSON.stringify(response.data));
        } 
    });
});


app.listen(app.get('port'), () => {
    console.log('Dfe webServer listening on : http://localhost:%s', app.get('port'));
});

module.exports = app;