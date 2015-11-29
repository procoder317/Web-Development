/* tracing app for getting JSON format data from the web using http*/
var app = angular.module('tracingApp', []);


app.controller('orderCtrl', function($scope, $http) {
    var parcelitem =$http.get("https://zoomcar-ui.0x10.info/api/courier?type=json&query=list_parcel");
    parcelitem.success(function(response) {$scope.items = response.parcels;});
    var hitscouter = $http.get("https://zoomcar-ui.0x10.info/api/courier?type=json&query=api_hits");
    hitscouter.success(function(response) {$scope.hitcount = response.api_hits;});
    
    $scope.filtername = 'name'; //default orderby of items
    
    $scope.dataselect = function(item) {
        $scope.iteminfo = {
            location: item.live_location,
            image: item.image,
            type: item.type,
            weight: item.weight,
            price: item.price,
            quantity: item.quantity,
            phone: item.phone,
            colour: item.color,
            name: item.name,
            date: item.date +100
        };
        
        $scope.initialize = function() {
        $scope.mapProp = {
           center:new google.maps.LatLng($scope.iteminfo.location.latitude,
                                        $scope.iteminfo.location.longitude),
           zoom:5,
           mapTypeId:google.maps.MapTypeId.ROADMAP
      };
       $scope.map = new google.maps.Map(document.getElementById("googleMap"),$scope.mapProp);
        $scope.marker=new google.maps.Marker({
            position: $scope.mapProp.center,
        });

        $scope.marker.setMap($scope.map);
        };
        google.maps.event.addDomListener(window, 'load', $scope.initialize());
        $scope.infoshowit = {visibility: 'visible'};
        
    };
    
    $scope.filterby = function() {
      $scope.buttonshowit = {visibility: 'visible'};  
    };
    
    /*on click on button order by price or by weight  for the items*/
    $scope.orderbyprice = function() {
        $scope.filtername = 'price';  
    }
    $scope.orderbyweight = function() {
        $scope.filtername = 'weight';  
    }
    
});