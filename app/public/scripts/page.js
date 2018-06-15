"use strict";

const page = {
  template: `
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png" alt=""> 
  <img src="$ctrl.data.sprites.back_default" alt=""> 
  <p>{{ $ctrl.data.name | uppercase}}</p>
  <div ng-repeat="type in $ctrl.data.types">
    <p>Type: {{ type.type.name }}</p>
  </div>
  <div ng-repeat="move in $ctrl.data.moves | limitTo: 4">
    <p>{{ move.move.name }}</p>
  </div>
  <div ng-repeat="stat in $ctrl.data.stats">
    <p>{{ stat.stat.name }}: {{ stat.base_stat }}</p>
  </div>
  <!--  <p>{{ $ctrl.data || "none"}}</p>-->

  `,
  controller: ["PageService", function(PageService){
    const vm = this;    
    PageService.getData().then((response) => {
      vm.data = response.data;
      // vm.img = response.data;
      console.log(response);
      
      console.log(vm.data);
      
    })
  }]
}

angular
  .module("App")
  .component("page", page);