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
                if (vm.pets[i].check_in) {
                    vm.pets[i].check_in = 'Checked In';
                } else if (vm.pets[i].check_in === null) {
                    vm.pets[i].check_in = 'Pending';

                }else {
                    vm.pets[i].check_in = 'Checked Out';
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

    // updates status
    vm.checkInPet = function(id, status){
        var petId = id;
        console.log('checkInPet pet ', id);
        var petStatus = {
            check_in: status
        };
        
        $http({
            method: 'PUT',
            url: '/pets/' + petId,
            data: petStatus
        }).then(function(response) {
            console.log('back from server PUT' , response);
            getPets();
        }); // end then
    }//end update function
}); //end Myapp.controller
