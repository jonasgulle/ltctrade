'use strict';

/*
1. Skriv in summan i SEK som dom vill handla för.
2. Räkna ut antalet Litecoins beroende på valutan
3. Speca ut det i dollar
4. Dra av 10% och räkna ut antalet Litecoins som köparen ska få
så borde de bli va?
*/

angular.module('ltctradeApp')
	.controller('MainCtrl', function ($scope, $http) {
		$scope.gettingPrices = false;
		$scope.havePrices = false;
		$scope.ask = undefined;
		$scope.bid = undefined;
		$scope.sekToUsd = 6.70;
		$scope.advance = 10.0;

		$scope.getPrice = function() {
			var url = 'http://localhost:31337/price/ltc_usd';
			$scope.havePrices = false;
			$scope.gettingPrices = true;
			$http.get(url).success(function (response) {
				$scope.gettingPrices = false;
				$scope.havePrices = true;
				$scope.ask = response[0];
				$scope.bid = response[1];

				$scope.usd = $scope.sek / $scope.sekToUsd;
				$scope.numLtc = ($scope.usd / $scope.ask.price).toFixed(3);
				$scope.numLtcOut = ($scope.numLtc * (1.0 - ($scope.advance / 100.0))).toFixed(3);

			});
		};

	});
