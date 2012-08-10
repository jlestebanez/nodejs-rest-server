/**
* ROUTER DE REQUEST
*/
var journey = require('journey'),
	dbm = require('./db_dummy.js'),
	router = new journey.Router;
/*
* Manejador de peticiones
*/
var requestHandler = function() {
	//defauly
	this.root.bind( function ( req, res ) {
		res.send("200", {}, "Hello world");
	});
	//GET posts
	this.get("/posts").bind( function ( req, res) {
		res.send( "200", {}, dbm.getData() );
	});
	//GET posts id
	this.get(/^posts\/(\d+)$/).bind( function ( req, res, id) {
		res.send( "200", {}, dbm.getData({"id": id}) );
	});
	//DELETE posts id
	this.del(/^posts\/(\d+)$/).bind( function ( req, res, id) {
		res.send( "200", {}, dbm.delData({"id": id}) );
	});
	//PUT posts id
	this.put(/^posts\/(\d+)$/).bind( function ( req, res, id, model) {
		res.send( "200", {}, dbm.saveData(id, model));
	});
};
/*
* Creador de router
*/
var createRouter = function () {
	var router = new journey.Router;
	router.map( requestHandler );
	return router;
};
/*
* EXPORTS
*/
exports.createRouter = createRouter;