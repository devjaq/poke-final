"use strict";

function PokemonService() {
    let allPokemon = [];
    let trainer = {};
    const addPokemon = (pokemon) => {
        allPokemon = pokemon;
    }

    const getPokemon = () => {
        return allPokemon;
    }

    const addTrainer = (trainerInfo) => {
        trainer = trainerInfo
    }

    const getTrainer = () => {
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