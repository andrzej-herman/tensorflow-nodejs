// importuję moduł komunikacyjny express z node
let express = require('express');
// tworzę aplikacje modułu express
// mam w niej dostęp do obiektów http request i http response dzieki node express
let app = express();

// loguję w konsoli przychodzące requesty (data, metoda, adres url requestu)
app.use(function(req, res, next) {
	console.log(`${new Date()} - ${req.method} request for ${req.url}`);
	next();
});

// wskazuję serwer plików z których korzysta aplikacja (w katalogiu: static)
app.use(express.static('../static'));

// ustawiam port nasłuchiwania na numer 1973 i loguję start servera express node
app.listen(1973, function() {
	console.log('Serving static on port: 1973 started ...');
});
