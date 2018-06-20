"use strict";

function PokemonService() {
    let allPokemon = [];
    const addPokemon = (pokemon) => {
        allPokemon = pokemon;
        console.log(allPokemon);
        
    }

    const getPokemon = () => {
        console.log(allPokemon);
        return allPokemon;
    }

    return {
        addPokemon,
        getPokemon
    }
}

angular
  .module("App")
  .factory("PokemonService", PokemonService);