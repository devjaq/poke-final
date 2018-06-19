"use strict";

const quiz = {
  template: `
  <h1>Welcome Come take our Quiz to see what pokeman you get!!!</h1>
  <form ng-submit="$ctrl.addUser($ctrl.newUser)">
    <h3>Enter a Username..</h3>
    <input type="text" ng-model="$ctrl.newUser.username">
    <h3>Enter your Date of Birth</h3>
    <input type="date" ng-model="$ctrl.newUser.dob">
    <section ng-repeat="question in $ctrl.quizarr | orderBy : 'id'">
      <form>
        <h3>{{ question.question }}</h3>
        <input type="radio" ng-model="$ctrl.newUser" name="{{question.id}}" value="{{question.answer_1_value}}"> {{question.answer_1}}
        <input type="radio" ng-model="" name="{{question.id}}" value="{{question.answer_2_value}}"> {{question.answer_2}}
        <input type="radio" ng-model="" name="{{question.id}}" value="{{question.answer_3_value}}"> {{question.answer_3}}
        <input type="radio" ng-model="" name="{{question.id}}" value="{{question.answer_4_value}}"> {{question.answer_4}}
      </form>
    </section>
    <button>Submit</button>
  </form>
  `,

  controller: ["quizService", function (quizService) {
    const vm = this;
    vm.quizarr = [];

    quizService.getQuiz().then((response) => {
      console.log("should work");
      vm.quizarr = response.data;
    });

    vm.addUser = (newUser) => {
      console.log(newUser);
    }
  }]

}

angular
  .module("App")
  .component("quiz", quiz);