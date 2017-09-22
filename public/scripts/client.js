var myApp = angular.module( 'myApp', [] ); //sets NG to myApp

myApp.controller( 'PetHotelController', function($http){ //creates PetHotelController
    console.log('ng');

    var vm = this; //sets vm to this

    getPets();  //calls getPets

    function getPets() { //GETs the pets and puts them on DOM
        $http({
            method: 'GET',
            url: '/pets'
        }).then( function ( response ){
            console.log('back from server with:', response);
            vm.pets = response.data;  //sets response equal to pets
        }); 
    } //end getPets

    vm.addPets = function (){ //pets POST
        $http({
            method: 'POST',
            url: '/pets',
            data: {petname: vm.nameIn, breed: vm.breedIn, color: vm.colorIn} //sets data to input 
        }).then( function (response){ //gets new list of pets and clears input fields
            console.log('back from server post', response);
            getPets();
            vm.nameIn = '';
            vm.breedIn = '';
            vm.colorIn = '';
        });
    };

    // updates check_in value
    vm.checkInPet = function(id, status){ //
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
    };//end update function

    vm.checkOutPet = function (id, status) { //
        var petId = id;
        console.log('checkOutPet pet ', id);
        var petStatus = {
            check_out: status
        };
        $http({
            method: 'PUT',
            url: '/checkoutpet/' + petId,
            data: petStatus
        }).then(function (response) {
            console.log('back from server PUT', response);
            getPets();
        }); // end then
    };//end update function

    vm.deletePet = function (id) { //
        var petId = id;
        console.log('delete pet ', id);
        
        $http({
            method: 'DELETE',
            url: '/pets/' + petId
            
        }).then(function (response) {
            console.log('back from server PUT', response);
            getPets();
        }); // end then
    };//end update function

}); //end Myapp.controller

