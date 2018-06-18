"use strict";

function PokeService($http) {
  const getData = (num) => {
    return $http({
      method: "GET",
      url:"/portal/pokedex/" + num,

    })
  }
  return {
    getData
  }
}

angular
  .module("App")
  .factory("PokeService", PokeService)