function start() {
    console.log('start');
    var container = document.querySelector(".pokelist-container");
    console.log(typeof container);
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

    fetch('http://pokeapi.co/api/v2/pokemon/?limit=50')
        .then(function(response) { return response.json(); })
        .then(function(json) {
            containerLoader.setAttribute("style", "display:none");
            for (var i = 0; i < json.results.length; i++) {
                var pokeDiv = document.createElement("div");
                var pokeImg = document.createElement("img");
                var pokeName = document.createElement("p");

                pokeDiv.setAttribute("class", "pokeflex-item");
                var splitArray = json.results[i].url.split("/");
                var splitArrayLength = splitArray.length;
                console.log(splitArray);
                var imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${splitArray[splitArrayLength-2]}.png`;
                pokeImg.setAttribute("src", imgUrl);

                pokeName.innerHTML = json.results[i].name;

                pokeDiv.appendChild(pokeImg);
                pokeDiv.appendChild(pokeName);
                container.appendChild(pokeDiv);
            }
        });
}

startFetch();