"use strict";

function PokemonService() {
    let allPokemon = [];
    let trainer = {};
    const addPokemon = (pokemon) => {
        allPokemon = pokemon;
        console.log(allPokemon);
        
    }

    const getPokemon = () => {
        console.log(allPokemon);
        return allPokemon;
    }

    const addTrainer = (trainerInfo) => {
        trainer = trainerInfo;
        // console.log(trainer);
        
    }

    const getTrainer = () => {
        console.log(trainer);
        return trainer;
    }

    return {
        addPokemon,
        getPokemon,
        addTrainer,
        getTrainer
    }
}

angular
  .module("App")
  .factory("PokemonService", PokemonService);