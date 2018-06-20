"use strict";

function TrainerService($http) {
  const getTrainers = () => {
    return $http({
      method: "GET",
      url:"/portal/trainer"
    })
  }
  const addUser = (trainer) => {
    return $http({
      method: "POST",
      url:"/portal/trainer",
      data: trainer
    })
  }



 return {
  getTrainers,
  addUser
}

 }



angular
  .module("App")
  .factory("TrainerService", TrainerService);

