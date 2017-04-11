var pokemonList=[
{
  "id": 1,
  "name": "Bulbasaur",
  "type": [ "grass", "posion" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
},
{
  "id": 5,
  "name": "Charmeleon",
  "type": [ "fire" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
},
{
  "id": 15,
  "name": "Beedrill",
  "type": [ "bug", "posion" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png"
},
{
  "id": 193,
  "name": "Yanma",
  "type": [ "bug", "flying" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/193.png"
},
{
  "id": 152,
  "name": "Chikorita",
  "type": [ "grass" ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png"
},
];

function start(){
 console.log('start');
 var container= document.querySelector(".pokelist-container");
 pokemonList.forEach(function(item){
    var pokeDiv = document.createElement("div");
    var pokeImg = document.createElement("img");
    var pokeName = document.createElement("p");

    pokeDiv.setAttribute("class", "pokeflex-item")
    pokeImg.setAttribute("src", item.sprite);
    
    pokeName.innerHTML = item.name;
    
    pokeDiv.appendChild(pokeImg);
    pokeDiv.appendChild(pokeName);
    container.appendChild(pokeDiv);
 });
 /*console.log(container);
 var newDiv = document.createElement("div");
 var newContent = document.createTextNode("<div></div>"); 
 newDiv.appendChild(newContent); //add the text node to the newly created div. */
 container.innerHTML('<div class="pokeflex-item"> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png" alt="hegomon">    <p>Hegomon</p>   </div>');
}
start();