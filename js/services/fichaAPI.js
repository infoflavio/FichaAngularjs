(function(){
	'use strict';
	
	angular
	.module('myapp')
	.factory('fichaAPI',fichaAPI);
	
	fichaAPI.$inject = ['$http'];

	function StringBuilder(value) {
		this.strings = new Array();
		this.append(value);
	}
	
	StringBuilder.prototype.append = function (value) {
		if (value) {
			this.strings.push(value);
		}
	}
	
	StringBuilder.prototype.clear = function () {
		this.strings.length = 0;
	}
	
	StringBuilder.prototype.toString = function () {
		return this.strings.join("");
	}
	
	function fichaAPI($http){

		var _listar  = function(id, dataInicio, dataFim){
			var parametros = new StringBuilder();	
			parametros.clear();
			
			if (id != null && id != 0 && id != "") {
				parametros.append("?id=" + id);
			}
		
			if (dataInicio != null) {
				if (parametros.toString().length > 0) {
					parametros.append("&");
				} else {
					parametros.append("?");
				}
				parametros.append("dataInicio=" + (dataInicio.getMonth() + 1) + '/' + dataInicio.getDate() + '/' +  dataInicio.getFullYear());

			}
			if (dataFim != null) {
				if (parametros.toString().length > 0) {
					parametros.append("&");
				} else {
					parametros.append("?");
				}
				parametros.append("dataFim=" + (dataFim.getMonth() + 1) + '/' + dataFim.getDate() + '/' +  dataFim.getFullYear());
			}
			var myString = parametros.toString();
			var url = "http://localhost:8080/FichaRestful/apirest/ficha/listarFichas" + myString;
			return $http.get(url);

		};

		//Buscar ficha
		var _buscarFicha  = function(id){
			var parametros = new StringBuilder();	
			parametros.clear();
			
			if (id != null && id != 0 && id != "") {
				parametros.append("?id=" + id);
			}
			
			var myString = parametros.toString();
			var url = "http://localhost:8080/FichaRestful/apirest/ficha/buscarFicha" + myString;
			return $http.get(url);
		};

		//listar animais sem ficha cadastrada
		var _listarAnimaisSemFicha  = function(){
			var url = "http://localhost:8080/FichaRestful/apirest/animal/listarAnimaisSemFicha";
			return $http.get(url);
		};

		//listar todos animais
		var _listarAnimais  = function(){
			var url = "http://localhost:8080/FichaRestful/apirest/animal/listarAnimais";
			return $http.get(url);

		};

		//cadastrar ficha
		var _cadastrarFicha  = function(ficha){
			return $http({
				method: 'POST',
				url: 'http://localhost:8080/FichaRestful/apirest/ficha/cadastrarFicha',
				data: angular.toJson(ficha),
				headers: {'Content-Type': 'application/json'}
			});
		};

		//Editar ficha
		var _editarFicha  = function(ficha){
			//var url = "http://localhost:8080/FichaRestful/apirest/ficha/atualizarFicha"
			//return $http.put(url, angular.toJson(ficha));
			return $http({
				method: 'PUT',
				url: 'http://localhost:8080/FichaRestful/apirest/ficha/atualizarFicha',
				data: angular.toJson(ficha),
				headers: {'Content-Type': 'application/json'}
			});
		};

		//Deletar ficha
		var _deletarFicha  = function(id){
			return $http({
				method: 'DELETE',
				url: 'http://localhost:8080/FichaRestful/apirest/ficha/deletarFicha/' + id
			});
		};

		//Editar animal
		var _editarAnimal  = function(animal){
			return $http({
				method: 'PUT',
				url: 'http://localhost:8080/FichaRestful/apirest/animal/atualizarAnimal',
				data: angular.toJson(animal),
				headers: {'Content-Type': 'application/json'}
			});
		};

		//Deletar animal
		var _deletarAnimal  = function(id){
			return $http({
				method: 'DELETE',
				url: 'http://localhost:8080/FichaRestful/apirest/animal/deletarAnimal/' + id
			});
		};
		
		return{
			listar:_listar,
			buscarFicha:_buscarFicha,
			editarFicha:_editarFicha,
			deletarFicha:_deletarFicha,
			listarAnimaisSemFicha:_listarAnimaisSemFicha,
			listarAnimais:_listarAnimais,
			deletarAnimal:_deletarAnimal,
			editarAnimal:_editarAnimal,
			cadastrarFicha:_cadastrarFicha
		}
	}
})()