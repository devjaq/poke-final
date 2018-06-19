"use strict";

function quizService ($http) {
  const getQuiz = () => {
    return $http ({
      method: "GET",
      url: "/portal/quiz"
    })
  }

  return {
    getQuiz
  }
  
}

angular
  .module("App")
  .factory("quizService", quizService);