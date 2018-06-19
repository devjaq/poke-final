"use strict";

const quiz = {
  template: `
  <h1>Welcome Come take our Quiz to see what pokeman you get!!!</h1>
  <section ng-repeat="question in $ctrl.quizarr | orderBy : 'id'">
      <h3>{{ question.question }}</h3>
      <ul>
        <li>{{question.answer_1}}</li>
        <li>{{question.answer_2}}</li>
        <li>{{question.answer_3}}</li>
        <li>{{question.answer_4}}</li>
      </ul>
    </section>
  `,

  controller: ["quizService", function(quizService) {
    const vm = this;
    vm.quizarr = [];

    quizService.getQuiz().then((response) => {
      console.log("should work");  
      vm.quizarr = response.data;
    });
  }]

}

angular
  .module("App")
  .component("quiz", quiz);