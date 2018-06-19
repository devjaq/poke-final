"use strict";

const quiz = {
  template: `
  <h1>{{ 5 + 5 }}</h1>
  `,

  controller: ["QuizService", function(QuizService) {
    const vm = this;
    vm.quizarr = [];
    QuizService.getQuiz().then((response) => {
      vm.quizarr = response.data;
      console.log(vm.quizarr);  
    });
  }]

}

angular
  .module("App")
  .component("quiz", quiz);