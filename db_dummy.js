/**
* DUMMY DATA
*/
var data = {};
//Init
data["posts"] = [
	{ "id": 1 , "titulo": "titulo 1", "contenido": "contenido del post numero 1"},
	{ "id": 2 , "titulo": "titulo 2", "contenido": "contenido del post numero 2"},
	{ "id": 3 , "titulo": "titulo 3", "contenido": "contenido del post numero 3"},
	{ "id": 4 , "titulo": "titulo 4", "contenido": "contenido del post numero 4"}
];
/*
* Establece el model base
*/
var setModel = function ( model_name ) {
		console.log("-DB: Setting model " + model_name + " ...");
		this.model_name = model_name;
		this.dataset = data[model_name];
		return this;
};
/*
* Devuelve los datos filtrados o no
*/
var getData = function( filter ) {
	console.log("-DB: getData ...");
	if(!filter )return this.dataset;
	var i, prop, length = 0, result = [], pass;
	length = this.dataset.length;
	for( i = 0; i < length; i++) {
		pass = true;
		for(prop in filter) {
			pass = (this.dataset[i][prop] == filter[prop]);
		}
		if( pass ) result.push(this.dataset[i]);
	}
	return result.length > 1 ? result : result[0];
};
/*
* Elimina un elemento filtrado por el id
*/
var delData = function( id ) {
	console.log("-DB: delData " + id + " ...");
	var i, prop, length = 0, result = [];
	length = this.dataset.length;
	for( i = 0; i < length; i++) {
		if( this.dataset[i].id != id ) result.push(this.dataset[i]);
	}
	this.dataset = result;
	syncDataset.call(this);
};
/*
* Guarda un modelo identificado por un id
*/
var saveData = function( id, model ) {
	console.log("-DB: saveData " + id + " ...");
	var i, length = 0;
	length = this.dataset.length;
	for( i = 0; i < length; i++) {
		if( this.dataset[i].id === id ) {
			this.dataset[i] = model;
		}
	}
	syncDataset();
	return model;
}
/*
* Guarda el dataset a data para simular persistencia
*/
var syncDataset = function() {
	data[this.model_name] = this.dataset;
	console.log(this.dataset);
}
/*
* EXPORTS
*/
exports.setModel 		= setModel;
exports.getData 		= getData;
exports.delData 		= delData;
exports.saveData 		= saveData;