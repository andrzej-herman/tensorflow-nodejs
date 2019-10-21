// importuję moduł komunikacyjny express z node
let express = require('express');
// tworzę aplikacje modułu express
// mam w niej dostęp do obiektów http request i http response dzieki node express
let app = express();

// loguję w konsoli przychodzące requesty (data, metoda, adres url requestu)
app.use(function(req, res, next) {
	// loguję w konsoli przychodzące requesty (data, metoda, adres url requestu)
	console.log(`${new Date()} - ${req.method} request for ${req.url}`);
	// ustawiam CORS => zezwalam na dostęp do modelu z zewnętrznych adresów
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

// wskazuję serwer plików z których korzysta aplikacja (w katalogiu: static)
app.use(express.static('../static'));

// ustawiam port nasłuchiwania na numer 3001 i loguję start servera express node
app.listen(3001, function() {
	console.log('Serving static on port: 3001 started ...');
});
