"use strict";

const quiz = {
  template: `
  <div class="quiz">
    <h1>Welcome Come take our Quiz to see what pokeman you get!!!</h1>
    <form ng-show="$ctrl.hide" ng-submit="$ctrl.addUser($ctrl.newUser)">
      <h3>Enter a Username..</h3>
      <input type="text" ng-model="$ctrl.newUser.username">
      <h3>Enter your Date of Birth</h3>

      <div>
        <select id='gMonth2' ng-model="$ctrl.newUser.dob">
          <option value=''>--Select Month--</option>
          <option value='1'>Janaury</option>
          <option value='2'>February</option>
          <option value='3'>March</option>
          <option value='4'>April</option>
          <option value='5'>May</option>
          <option value='6'>June</option>
          <option value='7'>July</option>
          <option value='8'>August</option>
          <option value='9'>September</option>
          <option value='10'>October</option>
          <option value='11'>November</option>
          <option value='12'>December</option>
        </select> 
      </div>
      <button>Submit</button>
    </form>
    <form ng-show="$ctrl.show" class="multichoice" name="questionForm" ng-submit="$ctrl.submitData($ctrl.answers)"> <!-- submit the checked answers -->
  
      <h3> {{ $ctrl.quizarr[$ctrl.counter].question }}</h3>
      <div class="answers">
        <label>
        <input type="radio" ng-model="$ctrl.answers" ng-value="$ctrl.quizarr[$ctrl.counter].answer_1_value" name="{{$ctrl.quizarr[$ctrl.counter].id}}" clicked> {{$ctrl.quizarr[$ctrl.counter].answer_1}}
        </label>
        <label>
        <input type="radio" ng-model="$ctrl.answers" ng-value="$ctrl.quizarr[$ctrl.counter].answer_2_value" name="{{$ctrl.quizarr[$ctrl.counter].id}}"> {{$ctrl.quizarr[$ctrl.counter].answer_2}}
        </label>
        <label>
        <input type="radio" ng-model="$ctrl.answers" ng-value="$ctrl.quizarr[$ctrl.counter].answer_3_value" name="{{$ctrl.quizarr[$ctrl.counter].id}}"> {{$ctrl.quizarr[$ctrl.counter].answer_3}}
        </label>
        <label>
        <input type="radio" ng-model="$ctrl.answers" ng-value="$ctrl.quizarr[$ctrl.counter].answer_4_value" name="{{$ctrl.quizarr[$ctrl.counter].id}}"> {{$ctrl.quizarr[$ctrl.counter].answer_4}}
        </label>
      </div>

      
     </section>
      <button>Submit</button>
    </form>
  </div>
  `,

  controller: ["quizService", "$location", function(quizService, $location) {
    const vm = this;
    vm.quizarr = [];
    vm.counter = 0;
    vm.answersRCool = [];
    vm.answers="";
    vm.show = false;
    vm.hide = true;
    vm.kind = 0;
    vm.char = 0;
    vm.orig = 0;
    vm.cool = 0;
    vm.adv = 0;
    vm.username = "";
    vm.dob = "";
    
    quizService.getQuiz().then((response) => {
      vm.quizarr = response.data;
    });

    vm.addUser = (newUser) => {
      vm.username = newUser.username;
      vm.dob = newUser.dob;
      if(vm.dob==1 || vm.dob==2 ||vm.dob==3){
        vm.kind+=2;
      } else if(vm.dob==4 || vm.dob==5 ||vm.dob==6){
        vm.adv+=2;
      } else if(vm.dob==7 || vm.dob==8 ||vm.dob==9){
        vm.char+=2;
      } else if(vm.dob==10 || vm.dob==11 ||vm.dob==12){
        vm.cool+=2;
      }

      // console.log(vm.username);
      // console.log(vm.dob);
      vm.show = true;
      vm.hide = false;
    }

    vm.submitData = () => {
      vm.counter++
      switch(vm.answers){
        case "cool":
        vm.cool++;
        console.log(vm.cool);
        break;
        case "kind":
        vm.kind++;
        console.log(vm.kind);
        break;
        case "adventurous":
        vm.adv++;
        console.log(vm.adv);
        break;
        case "charismatic":
        vm.char++;
        console.log(vm.char);
        break;
        case "original":
        vm.orig++;
        console.log(vm.orig);
        break;
      }
      vm.answers = "";

      if(vm.counter===10){
        console.log("cool");
        console.log(vm.cool);
        console.log("kind");
        console.log(vm.kind);
        console.log("adv");
        console.log(vm.adv);
        console.log("char");
        console.log(vm.char);
        console.log("orig");
        console.log(vm.orig);


        $location.path('/pokedex');
      }
      
    }
  }]

}

angular
  .module("App")
  .component("quiz", quiz);