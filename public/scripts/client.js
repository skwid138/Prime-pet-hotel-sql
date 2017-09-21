var myApp = angular.module( 'myApp', [] );

myApp.controller( 'PetHotelController', function($http){
    console.log('ng');

    var vm = this;

    getPets();

    function getPets() {
        $http({
            method: 'GET',
            url: '/pets'
        }).then( function ( response ){
            console.log('back from server with:', response);
            vm.pets = response.data;
        }); 
    } //end getPets

}); //end Myapp.controller