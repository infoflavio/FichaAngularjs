(function(){
	'use strict';
	
	angular
	.module('myapp')
	.controller('fichaController', fichaController);
	
	fichaController.$inject=['fichaAPI','$scope'];
	
	function fichaController(fichaAPI,$scope){
		$scope.fichas = [];
		$scope.message = "";
   		$scope.error_message = "";
		
		$scope.listar = function(){
			if ($scope.dataInicioFiltro !== undefined && $scope.dataFimFiltro == undefined
				&& $scope.dataInicioFiltro !== null && $scope.dataFimFiltro == null){
				$scope.error_message = "Data Fim é obrigatório para o filtro";

			} else if ($scope.dataFimFiltro !== undefined && $scope.dataInicioFiltro == undefined
			           && $scope.dataFimFiltro !== null && $scope.dataInicioFiltro == null) {
			 	$scope.error_message = "Data Início é obrigatório para o filtro";
			} else {
				$scope.error_message = "";
				fichaAPI.listar($scope.idFiltro, $scope.dataInicioFiltro, $scope.dataFimFiltro).then(
					function (response) {
						$scope.fichas = response.data;
					},
					function (error) {
						$scope.error_message = error.data;
					}
				);
			}
		}

		$scope.listarSemFiltro = function(){			
			fichaAPI.listar($scope.idFiltro, $scope.dataInicioFiltro, $scope.dataFimFiltro).then(
                function (response) {
					$scope.fichas = response.data;
                },
                function (error) {
                    $scope.error_message = error.data;
                }
        	);
		};

		$scope.newFicha = {};
		$scope.carregarCadFichas = function(){	
			$scope.newFicha = {};
			$scope.newFicha.status = "ativa";
			fichaAPI.listarAnimaisSemFicha().then(
                function (response) {
					$scope.listaAnimaisSemFicha = response.data;
                },
                function (error) {
                    $scope.error_message = error.data;
                }
        	);
		};

		$scope.listarSemFiltro();

		//buscar ficha
		$scope.selectFicha = function (ficha) {
			fichaAPI.buscarFicha(ficha.id).then(
                function (response) {
                    response.data.dataCadastro = new Date(response.data.dataCadastro);
					$scope.clickedFicha = response.data;
					$scope.listaAnimaisEditFicha = response.data.animais;
                },
                function (error) {
                    $scope.error_message = error.data;
                }
        	);
		};

		//editar
		$scope.clickedFicha = {};
		$scope.editarFicha = function () {
			fichaAPI.editarFicha($scope.clickedFicha).then(
                function (response) {
                    $scope.message = response.data;
                    $scope.listarSemFiltro();
                },
                function (error) {
                    $scope.error_message = error.data;
                }
        	);
		};

		//cadastrar ficha
		$scope.cadastrarFicha = function () {	
			// if($scope.newFicha.status == null) {
			// 	alert("Campos status é obrigatório.");
			// } else {
				
			// }

			var animaisSelecionados = [];
			var data = $scope.listaAnimaisSemFicha;
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				if (item.selecionado) {
					animaisSelecionados.push(data[i]);
				}
			}
			$scope.newFicha.animais = animaisSelecionados;
			fichaAPI.cadastrarFicha($scope.newFicha).then(
                function (response) {
                    $scope.message = response.data;
                    $scope.listarSemFiltro();
                },
                function (error) {
                    $scope.error_message = error.data;
                }
        	);
		};

		//select product by click
		$scope.idFichaDelete = {};
		$scope.selectFichaDelete = function (ficha) {
			$scope.idFichaDelete = ficha.id;
		};

		//deletar ficha
		$scope.deletarFicha = function () {
			fichaAPI.deletarFicha($scope.idFichaDelete).then(
                function (response) {
					$scope.message = response.data;
                    $scope.listarSemFiltro();  
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