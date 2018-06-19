"use strict";

function dbService($http) {
  const getData = () => {
    return $http({
      method: "GET",
      url:"/portal/pokemon"
    })
  }
  const postData = (pokemon) => {
    return $http({
      method: "POST",
      url:"/portal/pokemon",
      data: pokemon
    })
  }
 const searchData = (pokemon) => {
//    return $http ({
//      method: "GET",
//      url: "/portal/pokemon/" + pokemon.id,
//      data: pokemon
//    })
 }


 return {
  getData,
  postData,
  searchData
}

 }



angular
  .module("App")
  .factory("dbService", dbService)