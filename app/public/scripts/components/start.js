"use strict";

const start = {
template: `
<section class="start">
<div>
  <p>Hello there! Welcome to the world of Pokémon! My name is Grant Chirpus! People call me the Pokémon Prof! Your very own Pokémon adventure is about to unfold! A world of dreams and adventures with Pokémon awaits! Let’s go!</p>
  <img src="../../styles/lab-ready-grant.png">
  </div>
  <button type="button">Get my First Pokemon!</button>
</section>  
`,

controller: function() {
    const vm = this;
}

}

angular
  .module("App")
  .component("start", start);