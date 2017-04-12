var typeColor = {
    "Normal": "A8A77A",
    "Fire": "EE8130",
    "Water": "6390F0",
    "Electric": "F7D02C",
    "Grass": "7AC74C",
    "Ice": "96D9D6",
    "Fighting": "C22E28",
    "Poison": "A33EA1",
    "Ground": "E2BF65",
    "Flying": "A98FF3",
    "Psychic": "F95587",
    "Bug": "A6B91A",
    "Rock": "B6A136",
    "Ghost": "735797",
    "Dragon": "6F35FC",
    "Dark": "705746",
    "Steel": "B7B7CE",
    "Fairy": "D685AD"
};

function start() {
    console.log('start');
    var container = document.querySelector(".pokelist-container");
    //console.log(typeof container);
    pokemonList.forEach(function(item) {
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
}

function startFetch() {

    //var myList = document.querySelector('ul');
    var container = document.querySelector(".pokelist-container");
    var containerLoader = document.querySelector("#loaderContainer");
    //var loderImg = document.createElement("img");
    //loderImg.setAttribute("src", "loading.gif");
    //containerLoader.appendChild(loderImg);

    //http://pokeapi.co/api/v2/type/

    fetch('//pokeapi.co/api/v2/pokemon/?limit=10')
        .then(function(response) { return response.json(); })
        .then(function(json) {
            jsonResponse = json.results;
            containerLoader.setAttribute("style", "display:none");
            for (var i = 0; i < json.results.length; i++) {
                var splitArray = json.results[i].url.split("/");
                var splitArrayLength = splitArray.length;
                var pokeId = splitArray[splitArrayLength - 2];

                var pokeDiv = document.createElement("div");
                var pokeImg = document.createElement("img");
                var pokeName = document.createElement("label");

                pokeDiv.setAttribute("class", "pokeflex-item");
                pokeDiv.setAttribute("id", pokeId);
                var pokemonArrayWithId = [];
                pokemonArrayWithId[pokeId] = json.results[i];
                console.log(pokemonArrayWithId);
                //pokeDiv.onclick = clickHandler;
                //console.log(splitArray);

                var imgUrl = `//raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`;
                pokeImg.setAttribute("src", imgUrl);

                pokeName.innerHTML = json.results[i].name;

                pokeDiv.appendChild(pokeImg);
                pokeDiv.appendChild(pokeName);
                container.appendChild(pokeDiv);

                pokeDiv.addEventListener("click", clickHandler);
                pokeImg.addEventListener("click", function() { return false; });
                pokeName.addEventListener("click", function() { return false; });
            }
        });

}

var map = new Map();

function getTypes(){

    fetch('http://pokeapi.co/api/v2/type/')
        .then(function(response){return response.json()})
        .then(function(json){

            var typeArray = json.results;
            var promises = [];

            for(var i = 0; i < typeArray.length; i++){

                
                var element = typeArray[i];
                map.set(element.name, element);

                promises.push(
                    
                    fetch(element.url)
                            .then(function(response){return response.json()})
                            .then(function(json){

                                var pokemons = json.pokemon;
                                var object = map.get(json.name);
                                
                                if(object){
                                    object.pokemons = (!pokemons) ? [] : pokemons;
                                }

                }));

            }

            Promise.all(promises).then(function(values){
                console.log("hello!!");
                console.log(map);
            }).catch(function(error){
                console.log(error);
            });


        });

}

function clickHandler(e) {
    //console.log(e.target);
    console.log(this.id);
    getDetails(this.id);
}

function getDetails(id) {
    //var myList = document.querySelector('ul');
    //var container = document.querySelector(".pokelist-container");
    //var containerLoader = document.querySelector("#loaderContainer");
    //var loderImg = document.createElement("img");
    //loderImg.setAttribute("src", "loading.gif");
    //containerLoader.appendChild(loderImg);

    fetch('//pokeapi.co/api/v2/pokemon/' + id)
        .then(function(response) { return response.json(); })
        .then(function(json) {
            console.log(json);
            /*containerLoader.setAttribute("style", "display:none");
            for (var i = 0; i < json.results.length; i++) {
                var pokeDiv = document.createElement("div");
                var pokeImg = document.createElement("img");
                var pokeName = document.createElement("label");

                pokeDiv.setAttribute("class", "pokeflex-item");
                var splitArray = json.results[i].url.split("/");
                var splitArrayLength = splitArray.length;
                //console.log(splitArray);
                var imgUrl = `//raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${splitArray[splitArrayLength-2]}.png`;
                pokeImg.setAttribute("src", imgUrl);

                pokeName.innerHTML = json.results[i].name;

                pokeDiv.appendChild(pokeImg);
                pokeDiv.appendChild(pokeName);
                container.appendChild(pokeDiv);
            }*/
        });
}

function renderingPokeContainer(searchStr) {

    var container = document.querySelector(".pokelist-container");
    var containerLoader = document.querySelector("#loaderContainer");

    containerLoader.setAttribute("style", "display:none");
    container.innerHTML = '';
    for (var i = 0; i < jsonResponse.length; i++) {

        if (checkName(jsonResponse[i].name, searchStr)) {

            var pokeDiv = document.createElement("div");
            var pokeImg = document.createElement("img");
            var pokeName = document.createElement("label");

            pokeDiv.setAttribute("class", "pokeflex-item");
            var splitArray = jsonResponse[i].url.split("/");
            var splitArrayLength = splitArray.length;
            //console.log(splitArray);
            var imgUrl = '//raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${splitArray[splitArrayLength-2]}.png';
            pokeImg.setAttribute("src", imgUrl);

            pokeName.innerHTML = jsonResponse[i].name;

            pokeDiv.appendChild(pokeImg);
            pokeDiv.appendChild(pokeName);
            container.appendChild(pokeDiv);
        }
    }
}

function checkName(name, searchStr) {
    searchStr = searchStr.toLowerCase();
    if (name.indexOf(searchStr) >= 0) {
        return true;
    }
    return false;
}

function addSearchListener() {
    var container = document.querySelector("#input_search");
    container.addEventListener('change', searchHandler);
}

function searchHandler(e) {
    console.log(e.target.value);
    console.log(jsonResponse);
    renderingPokeContainer(e.target.value);
}

startFetch();
getTypes();
addSearchListener();
