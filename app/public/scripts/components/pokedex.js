"use strict";
const pokedex = {
  template: `
  <p>{{$ctrl.pokearr[$ctrl.trainer.pokemon_1 - 1].type}}</p>
  <form ng-submit="$ctrl.search($ctrl.pokemon)">
    <input type="text" class="input" ng-model="search">
    <button>Search</button>
  </form>
  <div id="pokedex">
    <section class="pokemon" ng-repeat="pokemon in $ctrl.pokearr | filter: {name: search}|orderBy : 'id'">
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
        <img class="catch" src="/styles/icons/pokeball-pixel2.png" alt="pokeball" ng-click="$ctrl.newCrew(pokemon)">
      </div>
    </section>
    </div>
    `,
  controller: ["PokeService", "dbService", "PokemonService", function (PokeService, dbService, PokemonService) {
    const vm = this;
    vm.pokearr = [];
    vm.populateArr = [];
    // dbService.getData().then((response) => {
    //   vm.pokearr = response.data;
    //   PokemonService.addPokemon(vm.pokearr);
    // });

    vm.pokearr = PokemonService.getPokemon();
    vm.trainer = PokemonService.getTrainer();
    // vm.search = (pokemon) => {
    //   vm.pokearr = [];
    //   dbService.getData(pokemon).then((response) => {
    //     vm.pokemondata = response.data;
    //     vm.pokearr.push(vm.pokemondata);
    //     console.log(response.data)
    //   });
    //   vm.pokemon = {};
    // };

    vm.myType = vm.pokearr[vm.trainer.pokemon_1 - 1].type;

    vm.fireCompatibility = (pokemon) => {
      // console.log(pokemon);
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
      // console.log(pokemon);
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
      // console.log(pokemon);
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
      // console.log(pokemon);
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
      // console.log(pokemon);
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
      console.log(`Caught ${pokemon.name}!`);
      
    }

    vm.populate = () => {
      console.log("clicked populate");
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
          console.log(vm.pokemonInfo);
          console.log(vm.populateArr.length);
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