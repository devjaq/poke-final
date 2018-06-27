"use strict";
const pokedex = {
  template: `
  <topbar></topbar>
  <section class="top-bar">
    <form>
      <input type="text" class="input" ng-model="$ctrl.search" placeholder="Search">
      <select name="type-selector" ng-model="$ctrl.typeSelector" id="type-selector">
        <option default value="">Select a Pokemon Type</option>
        <option value="bug">Bug</option>
        <option value="dragon">Dragon</option>
        <option value="ice">Ice</option>
        <option value="fighting">Fighting</option>
        <option value="fire">Fire</option>
        <option value="flying">Flying</option>
        <option value="grass">Grass</option>
        <option value="ghost">Ghost</option>
        <option value="ground">Ground</option>
        <option value="electric">Electric</option>
        <option value="normal">Normal</option>
        <option value="poison">Poison</option>
        <option value="psychic">Psychic</option>
        <option value="rock">Rock</option>
        <option value="water">Water</option>
      </select>
      <button class="animated pulse" type="button" ng-click="$ctrl.clearSearch()">Clear Search</button>

    </form>

    <section class="myPokemon">
    <div>
      <div>
        <img class="caughtSprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{$ctrl.pokearr[$ctrl.trainer.pokemon_1-1].id}}.png" alt="">
        <img class="caughtPokemon" src="/styles/icons/pokeball-pixel2.png" alt="pokeball">
      </div>
      <div>
        <img class="caughtSprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{$ctrl.pokearr[$ctrl.trainer.pokemon_2-1].id}}.png" alt="">
        <img class="caughtPokemon" src="/styles/icons/pokeball-pixel2.png" alt="pokeball">
      </div>
      <div>
        <img class="caughtSprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{$ctrl.pokearr[$ctrl.trainer.pokemon_3-1].id}}.png" alt="">
        <img class="caughtPokemon" src="/styles/icons/pokeball-pixel2.png" alt="pokeball">
      </div>
      <div>
        <img class="caughtSprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{$ctrl.pokearr[$ctrl.trainer.pokemon_4-1].id}}.png" alt="">
        <img class="caughtPokemon" src="/styles/icons/pokeball-pixel2.png" alt="pokeball">
      </div>
      <div>
        <img class="caughtSprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{$ctrl.pokearr[$ctrl.trainer.pokemon_5-1].id}}.png" alt="">
        <img class="caughtPokemon" src="/styles/icons/pokeball-pixel2.png" alt="pokeball">
      </div>
      <div>
        <img class="caughtSprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{$ctrl.pokearr[$ctrl.trainer.pokemon_6-1].id}}.png" alt="">
        <img class="caughtPokemon" src="/styles/icons/pokeball-pixel2.png" alt="pokeball">
      </div>
    </div>
  </section>
  </section>
  <div id="pokedex">
    <section class="pokemon" ng-repeat="pokemon in $ctrl.pokearr | filter: {name: $ctrl.search, type: $ctrl.typeSelector} |orderBy : 'id' | limitTo: 150">
      <div class="top">
        <p>{{ pokemon.id }}</p>
        <h3>{{ pokemon.name | uppercase }}</h3>
        <p>{{$ctrl.compatibility(pokemon)}}%</p>
        <div class="icon-box">
          <img class="type-icon" src="styles/icons/{{pokemon.type}}.png">
        </div>
      </div>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{pokemon.id}}.png" alt="">
      <div class="bottom">
        <ul>
          <li>{{pokemon.move_1}}</li>
          <li>{{pokemon.move_2}}</li>
          <li>{{pokemon.move_3}}</li>
          <li>{{pokemon.move_4}}</li>
        </ul>
        <img class="catch animate tada" src="/styles/icons/pokeball-pixel2.png" alt="pokeball" ng-click="$ctrl.newCrew(pokemon)">
      </div>
    </section>
    </div>

    `,
  controller: ["PokeService", "dbService", "PokemonService", "TrainerService", "$location", function (PokeService, dbService, PokemonService, TrainerService, $location) {
    const vm = this;
    vm.pokearr = [];
    vm.populateArr = [];
    vm.pokearr = PokemonService.getPokemon();
    vm.trainer = PokemonService.getTrainer();
    vm.myType = vm.pokearr[vm.trainer.pokemon_1 - 1].type;
    vm.caught = false;
    vm.search = "";
    vm.typeSelector = "";
  
    vm.clearSearch = () => {
      vm.search = "";
      vm.typeSelector = "";
    }

    vm.fireCompatibility = (pokemon) => {
      if (pokemon.type === vm.myType) {
        return 75;
      } else if (pokemon.type === "ground" || pokemon.type === "rock" || pokemon.type === "water") {
        return 50;
      } else if (pokemon.type === "bug" || pokemon.type === "grass" || pokemon.type === "ice") {
        return 100;
      }  else {
        return 75;
      }
    }

    vm.waterCompatibility = (pokemon) => {
      if (pokemon.type === vm.myType) {
        return 75;
      } else if (pokemon.type === "grass" || pokemon.type === "electric") {
        return 50;
      } else if (pokemon.type === "fire" || pokemon.type === "water" || pokemon.type === "ice") {
        return 100;
      }  else {
        return 75;
      }
    }

    vm.grassCompatibility = (pokemon) => {
      if (pokemon.type === vm.myType) {
        return 75;
      } else if (pokemon.type === "flying" || pokemon.type === "poison" || pokemon.type === "bug" || pokemon.type === "fire" || pokemon.type === "ice") {
        return 50;
      } else if (pokemon.type === "ground" || pokemon.type === "water" || pokemon.type === "grass" || pokemon.type === "electric") {
        return 100;
      }  else {
        return 75;
      }
    }

    vm.electricCompatibility = (pokemon) => {
      if (pokemon.type === vm.myType) {
        return 75;
      } else if (pokemon.type === "ground") {
        return 50;
      } else if (pokemon.type === "flying" || pokemon.type === "electric") {
        return 100;
      }  else {
        return 75;
      }
    }

    vm.psychicCompatibility = (pokemon) => {
      if (pokemon.type === vm.myType) {
        return 75;
      } else if (pokemon.type === "bug" || pokemon.type === "ghost") {
        return 50;
      } else if (pokemon.type === "fighting" || pokemon.type === "psychic") {
        return 100;
      }  else {
        return 75;
      }
    }

    vm.compatibility = (pokemon) => {
      if (vm.myType === "fire") {
       return vm.fireCompatibility(pokemon);
      } else if (vm.myType === "water") {
        return vm.waterCompatibility(pokemon);
      } else if (vm.myType === "grass") {
      return vm.grassCompatibility(pokemon);
      } else if (vm.myType === "electric") {
      return vm.electricCompatibility(pokemon);
      } else if (vm.myType === "psychic") {
      return vm.psychicCompatibility(pokemon);
      } 
    }

    vm.newCrew = (pokemon) => {
      // add bounce, remove bounce, add tada, remove tada
      // pop up that says "you've caught pokemon!"

        if (vm.trainer.pokemon_2 === null){
          vm.trainer.pokemon_2 = pokemon.id;
          TrainerService.updateTrainer(vm.trainer);
          if(vm.trainer.pokemon_6 !== null){
            $location.path('/trainer');
          }
        } else if (vm.trainer.pokemon_3 === null) {
          vm.trainer.pokemon_3 = pokemon.id;
          TrainerService.updateTrainer(vm.trainer);
          if(vm.trainer.pokemon_6 !== null){
            $location.path('/trainer');
          }
        } else if (vm.trainer.pokemon_4 === null) {
          vm.trainer.pokemon_4 = pokemon.id;
          TrainerService.updateTrainer(vm.trainer);
          if(vm.trainer.pokemon_6 !== null){
            $location.path('/trainer');
          }
        } else if (vm.trainer.pokemon_5 === null) {
          vm.trainer.pokemon_5 = pokemon.id;
          TrainerService.updateTrainer(vm.trainer);
          if(vm.trainer.pokemon_6 !== null){
            $location.path('/trainer');
          }
        } else if (vm.trainer.pokemon_6 === null) {
          vm.trainer.pokemon_6 = pokemon.id;
          TrainerService.updateTrainer(vm.trainer);
          $location.path('/trainer');
        } else {
          $location.path('/trainer');
        }

    } 

    vm.populate = () => {
      for (let i = 133; i <= 151; i++) {
        PokeService.getData(i).then((response) => {
          vm.pokemon = response.data;
          vm.pokemonInfo = {
            id: vm.pokemon.id,
            name: vm.pokemon.name,
            type: vm.pokemon.types[0].type.name,
            hp: vm.pokemon.stats[5].base_stat,
            attack: vm.pokemon.stats[4].base_stat,
            defense: vm.pokemon.stats[3].base_stat,
            speed: vm.pokemon.stats[0].base_stat,
            move_1: vm.pokemon.moves[0].move.name,
            move_2: vm.pokemon.moves[1].move.name,
            move_3: vm.pokemon.moves[2].move.name,
            move_4: vm.pokemon.moves[3].move.name
          }
          vm.populateArr.push(vm.pokemonInfo);
        });
      }
    };
    
    vm.sendToDb = () => {
      let counter = 133;
      while(vm.populateArr.length > 0){
        for (let j = 0; j < vm.populateArr.length; j++) {
          if(counter===vm.populateArr[j].id){
            dbService.postData(vm.populateArr[j]);
            counter++;
            vm.populateArr.splice(j, 1);
          };
        }

      }
    } // end vm.sendToDb
  }]
};


angular
  .module("App")
  .component("pokedex", pokedex);