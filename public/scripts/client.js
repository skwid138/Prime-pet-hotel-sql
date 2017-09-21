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
            for (var i = 0; i < vm.pets.length; i++) {
                if (vm.pets[i].checkedin) {
                    vm.pets[i].checkedin = 'Checked In';
                } else {
                    vm.pets[i].checkedin = '<button></button>'
                }
            }
        }); 
    } //end getPets

    vm.addPets = function (){
        $http({
            method: 'POST',
            url: '/pets',
            data: {petname: vm.nameIn, breed: vm.breedIn, color: vm.colorIn}
        }).then( function (response){
            console.log('back from server post', response);
            getPets();
        });
    }

}); //end Myapp.controller