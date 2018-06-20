"use strict";

const quiz = {
  template: `
  <div class="quiz">
    <h1>Welcome Come take our Quiz to see what pokeman you get!!!</h1>
    <form ng-submit="$ctrl.addUser($ctrl.newUser)">
      <h3>Enter a Username..</h3>
      <input type="text" ng-model="$ctrl.newUser.username">
      <h3>Enter your Date of Birth</h3>
      <input type="date" ng-model="$ctrl.newUser.dob">
      <button>Submit</button>
    </form>
    <form class="multichoice" name="questionForm" ng-submit="$ctrl.submitData(questionForm)"> <!-- submit the checked answers -->
      <section ng-repeat="question in $ctrl.quizarr | orderBy : 'id'">

      <h3>{{ question.question }}</h3>
      <div class="answers">
        <label>
        <input type="radio" ng-model="answers"
        ng-value="question.answer_1_value" name="{{question.id}}"> {{question.answer_1}}
        </label>
        <label>
        <input type="radio" ng-model="answers" ng-value="question.answer_2_value" name="{{question.id}}"> {{question.answer_2}}
        </label>
        <label>
        <input type="radio" ng-model="answers" ng-value="question.answer_3_value" name="{{question.id}}"> {{question.answer_3}}
        </label>
        <label>
        <input type="radio" ng-model="answers" ng-value="question.answer_4_value" name="{{question.id}}"> {{question.answer_4}}
        </label>
      </div>

      
     </section>
      <button>Submit</button>
    </form>
  </div>
  `,

  controller: ["quizService", function(quizService) {
    const vm = this;
    vm.quizarr = [];

    quizService.getQuiz().then((response) => {
      console.log("should work");
      vm.quizarr = response.data;
      console.log(vm.quizarr);
    });

    vm.addUser = (newUser) => {
      console.log(newUser);
    }

    vm.clicked = (answer, id) => {
      console.log(answer);
      console.log(id);
      
      
    }

    vm.submitData = (answers, index) => {
      // let stuff = document.querySelector("input:checked").value;
      // console.log(stuff);
      console.log(index);
      console.log(answers);
      const answersRCool = [];
      for (let i = 3; i <= 17; i++) {
        answersRCool.push(answers[i]);
      }
      console.log(answersRCool);
      
    }
  }]

}

angular
  .module("App")
  .component("quiz", quiz);