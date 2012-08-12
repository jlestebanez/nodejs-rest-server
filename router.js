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
	//default
	this.root.bind( function ( req, res ) {
		res.send("200", {}, "Hello world");
	});
	//GET posts
	this.get(/^\/([a-zA-Z_]+$)/).bind( function ( req, res, model) {
		res.send( "200", {}, dbm.setModel(model).getData() );
	});
	//GET posts id
	this.get(/^([a-zA-Z_]+)\/(\d+)$/).bind( function ( req, res, model, id) {
		res.send( "200", {}, dbm.setModel(model).getData({"id": id}) );
	});
	//DELETE posts id
	this.del(/^([a-zA-Z_]+)\/(\d+)$/).bind( function ( req, res, model, id) {
		res.send( "200", {}, dbm.setModel(model).delData(id) );
	});
	//PUT posts id
	this.put(/^([a-zA-Z_]+)\/(\d+)$/).bind( function ( req, res, model, id, data) {
		res.send( "200", {}, dbm.setModel(model).saveData(id, data));
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