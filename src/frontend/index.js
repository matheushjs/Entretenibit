const path = require('path');
const app = require('express')();
const request = require('request');

app.get('/', (req, res) => {
	request('https://www.google.com', function (Nerror, Nresponse, body) {
		res.send('Hello World!<br><br>' + body);
	});
})

// Begin serving
app.listen(80);
console.log(`Server listening on 80`);
