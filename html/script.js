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

    fetch('//pokeapi.co/api/v2/pokemon/?limit=50')
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
addSearchListener();