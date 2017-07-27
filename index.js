const express = require('express')
const app = express()
const fs = require('fs');
const testPath = "./test.js";

function zeroPad(value, length) {
    var result = value.toString();
    while (result.length < length) {
        result = "0" + result;
    }
    return result;
}

function getLastModifiedDate() {
    var now = new Date();
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dayOfWeek = days[now.getUTCDay()];
    var date = now.getUTCDate();
    var month = months[now.getUTCMonth()];
    var hours = zeroPad(now.getUTCHours(), 2);
    var minutes = zeroPad(now.getUTCMinutes(), 2);
    console.log('minutes', minutes);
    return [dayOfWeek, ", ", date, " ", month, " ", now.getFullYear(), " ",  hours, ":", minutes, ":00 GMT"].join('');
}

app.get('/', function (req, res) {
    var lastModifiedDate = getLastModifiedDate();
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.setHeader('Last-Modified', lastModifiedDate);
    if (!req.stale) {
        res.sendStatus(304);
        return;
    }
    const buffer = fs.readFileSync(testPath);
    res.end(buffer);
  //res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})