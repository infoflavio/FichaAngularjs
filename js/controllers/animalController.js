(function(){
	'use strict';
	
	angular
	.module('myapp')
	.controller('animalController', animalController);
	
	animalController.$inject=['fichaAPI','$scope'];
	
	function animalController(fichaAPI,$scope){

		$scope.listaAnimais = [];
		$scope.message = "";
   		$scope.error_message = "";
		
		$scope.listar = function(){
			fichaAPI.listarAnimais().then(
				function (response) {
					$scope.listaAnimais = response.data;
				},
				function (error) {
					$scope.error_message = error.data;
				}
			);
		}
		
		$scope.listar();

		//selecionar animal
		$scope.clickedAnimal = {};
		$scope.selectAnimal = function (animal) {
			$scope.clickedAnimal = animal;
		};

		//editar animal
		$scope.editarAnimal = function () {
			fichaAPI.editarAnimal($scope.clickedAnimal).then(
                function (response) {
                    $scope.message = response.data;
                    $scope.listar();
                },
                function (error) {
                    $scope.error_message = error.data;
                }
        	);
		};

		//deletar animal
		$scope.deletarAnimal = function () {
			fichaAPI.deletarAnimal($scope.clickedAnimal.id).then(
                function (response) {
					$scope.message = response.data;
                    $scope.listar();  
                },
                function (error) {
                    $scope.error_message = error.data;
                }
        	);
		};

		//clear message
		$scope.messageClose = function () {
			$scope.message = "";
			$scope.error_message = "";
		};
	}

})();