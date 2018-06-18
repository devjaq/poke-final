"use strict";

function PokeService($http) {
  const getData = (pokemon) => {
    return $http({
      method: "GET",
      url:"/portal/pokedex/" + pokemon.num,
      data: pokemon
    })
  }
  return {
    getData
  }
}

angular
  .module("App")
  .factory("PokeService", PokeService)