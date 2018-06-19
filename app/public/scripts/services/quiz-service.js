"use strict";

function QuizService ($http) {
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
  .factory("QuizService", QuizService);