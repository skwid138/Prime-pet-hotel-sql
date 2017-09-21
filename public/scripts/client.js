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

    vm.addPets = function (){
        $http({
            method: 'POST',
            url: '/pets',
            data: {petname: vm.nameIn, breed: vm.breedIn, color: vm.colorIn, checkedin: vm.checkedIn }
        }).then( function (response){
            console.log('back from server post', response);
            getPets();
        });
    }

}); //end Myapp.controller