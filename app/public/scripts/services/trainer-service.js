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

  const updateTrainer = (trainer) => {
    return $http({
      method: "PUT",
      url:"/portal/trainer/" + trainer.id,
      data: trainer
    })
    
  }



 return {
  getTrainers,
  addUser,
  updateTrainer
}

 }



angular
  .module("App")
  .factory("TrainerService", TrainerService);

