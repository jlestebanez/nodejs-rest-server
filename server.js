/**
* HTTP SERVER
*/
var http 	= require("http"),
	router 	= require("./router.js");
/*
* Manejador de requests
*/
var onRequest = function( req, res ) {
	console.log("-HTTPSERVER: Requesting " + req.method + " " + req.url);
	var body = "",
		headers = {};
	//Cabeceras para el CORS
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = true;
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";

	if(req.method == "OPTIONS") {
		res.writeHeader( 200, headers );
		res.end();
	} else {
		req.addListener("data", function( data ) {
			body += data;
		});
		req.addListener("end", function () {
			if( isAuthorizated( req.headers.authorization ) ) {
				router.handle( req, body, function ( result ) {
					res.writeHeader( result.status, headers );
					res.end( result.body );
				});
			} else {
				res.writeHeader("401",{});
				res.end("<html><body>Auth required !!!</body></html>");
			}
		});
	}
};
/*
* Comprueba la cabecera de authorization para ver si coincide
*/
var isAuthorizated = function( authorizationHeader ) {
	console.log("-HTTPSERVER: Checkin auth ...");
	//Usuario y contraseña fake, implemtnar esto en algun lugar seguro
	var USER = "user",
		PASS = "1234";
	if (! authorizationHeader) return false;
	var tmp = authorizationHeader.split(" ");
	var buffer = new Buffer(tmp[1], "Base64");
	tmp = buffer.toString().split(":");
	return (tmp[0] === USER && tmp[1] === PASS);
};
/*
* Arranca el servidor http
*/
function start(  ) {
	console.log("-HTTPSERVER: Starting HTTP server ...");
	router = router.createRouter();
	var server = http.createServer( onRequest );
	server.listen(8080);
}
/*
* EXPORTS
*/
exports.start = start;