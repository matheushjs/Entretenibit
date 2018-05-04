const path = require('path');
const app = require('express')();
const request = require('request');

app.get('/', (req, res) => {
	request('http://172.18.0.21:5000', function (Nerror, Nresponse, body) {
		console.log(Nerror, Nresponse, body, '\n')
		res.send('Hello World!<br><br>' + body);
	});
})

// Begin serving
app.listen(80);
console.log(`Server listening on 80`);
