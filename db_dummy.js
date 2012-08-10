/**
* DUMMY DATA
*/
var data = [
			{ "id": 1 , "titulo": "titulo 1", "contenido": "contenido del post numero 1"},
			{ "id": 2 , "titulo": "titulo 2", "contenido": "contenido del post numero 2"},
			{ "id": 3 , "titulo": "titulo 3", "contenido": "contenido del post numero 3"},
			{ "id": 4 , "titulo": "titulo 4", "contenido": "contenido del post numero 4"}
		],
	dataset;
var resetDateset = function () {
		dataset = data;
};
var getData = function( filter ) {
	if(!filter )return dataset;
	var i, prop, length = 0, result = [], pass;
	length = dataset.length;
	for( i = 0; i < length; i++) {
		pass = true;
		for(prop in filter) {
			pass = (dataset[i][prop] == filter[prop]);
		}
		if( pass ) result.push(dataset[i]);
	}
	return result.length > 1 ? result : result[0];
};
var delData = function( filter ) {
	var i, prop, length = 0, result = [], pass;
	length = dataset.length;
	for( i = 0; i < length; i++) {
		pass = false;
		for(prop in filter) {
			pass = (dataset[i][prop] == filter[prop]);
		}
		if( ! pass ) result.push(dataset[i]);
	}
	dataset = result;
};
var saveData = function( id, model ) {
	var i, length = 0;
	length = dataset.length;
	for( i = 0; i < length; i++) {
		if( dataset[i].id === id ) {
			dataset[i] = model;
		}
	}
	return model;
}
resetDateset();

exports.resetDateset 	= resetDateset;
exports.getData 		= getData;
exports.delData 		= delData;
exports.saveData 		= saveData;