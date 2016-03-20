var app = angular.module('simpleharmonic',['chart.js'])

app.controller('mainController',['$scope',function($scope) {
		
	$scope.xTime = [];
	$scope.yValue = [[],[],[]];
	$scope.series = ['x','v','a'];
	
	//Initial position
	$scope.x = 10;

	//Interval
	$scope.dt = 0.01;
	$scope.int = 1;
	
	//Mess
	$scope.m = 10;

	//spring
	$scope.k = 0.5;
	
	//a,v,x function
	$scope.geta = function(k,x,m)
		{
		var f = -k*x;
		//console.log('f = '+f/m);
		return f/m;
		}
	
	$scope.getv = function(u,a,t)
		{
		//console.log('v ='+u+a*t);
		return u+a*t;
		}
	$scope.getx = function(u,v,t)
		{
		//console.log('x = ',(u+v)*t/2);
		return (u+v)*t/2;
		}

	//Calculation
	$scope.calculate = function(x,m,k,dt,int)
		{
		var xData = [];
		var yData = [[],[],[]];
		
		var a;
		var u = 0;
		var v = 0;
		var t = 0;
		
		var nextPush = int;

		while(xData.length <= 60) 
			{
			a = $scope.geta(k,x,m);
			v = $scope.getv(u,a,dt);
			x += $scope.getx(u,v,dt);

			console.log(a+','+v+','+x);
				
			if(t >= nextPush)
				{
				//console.log(x+' '+y);
				yData[0].push(parseFloat(x.toFixed(2)));
				yData[1].push(parseFloat(v.toFixed(2)));
				yData[2].push(parseFloat(a.toFixed(2)));
				xData.push(t.toFixed(0)); 
				
				nextPush += int;
				}
				
			u = v;
			t += dt;
			}
		
		$scope.xTime = xData;
		$scope.yValue = yData;
		console.log($scope.xTime);
		console.log($scope.yValue);
		}
	$scope.calculate($scope.x,$scope.m,$scope.k,$scope.dt,$scope.int);
	
}]);