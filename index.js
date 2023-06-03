// var hash = md5("value");


let public_key = "feb0cde62295caf63935ea99cc93963b";
let private_key = "6c4aa04c14d7849fe4996daff37e4d4e2cde2d66";
const ts = 1;
const hash = md5(1 + private_key + public_key)
// console.log(hash)

// let heroWrapper = document.querySelector('.heroList')
var heroList = [];

let searcBtn = document.querySelector("#searchBtn");
if (searcBtn) {
    searcBtn.addEventListener("click", searchList)
}
let favouriteBtn = document.querySelector(".favouriteBtn");
if (favouriteBtn) {
    favouriteBtn.addEventListener("click", fetchFavouriteList)
}

let homePageBtn = document.querySelector(".homeBtn");
homePageBtn.addEventListener("click", backToHomePage);
homePageBtn.style.display = 'None';



function searchList() {
    let inputSearch = document.querySelector(".searchBox input").value;
    console.log("input---", inputSearch)
    let searchHero = heroList.filter(el => {
        return el.name.toLowerCase().includes(inputSearch.toLowerCase());
    })
    console.log(searchHero);
    clearList();
    createSuperHeroList(searchHero)
}

async function fetchList() {
    let result = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=feb0cde62295caf63935ea99cc93963b&hash=${hash}`)
    return result;
}

fetchList()
    .then((response) => {
        return response.json();
    }).then((data) => {
        let result = data.data.results
        console.log(result);
        heroList = result; // { "userId": 1, "id": 1, "title": "...", "body": "..." }
        createSuperHeroList(result)
    });
//   });

function createSuperHeroList(list) {
    let heroWrapper = document.querySelector('.heroList')
    list.forEach((element, index) => {
        let nodeWrapper = document.createElement('div');
        nodeWrapper.className = 'heroWrapper'
        let imageNode = document.createElement('img');
        imageNode.src = element.thumbnail.path + "/portrait_incredible."
            + element.thumbnail.extension
        let headingNode = document.createElement('div');
        headingNode.className = 'heroName'
        headingNode.appendChild(document.createTextNode(element.name));
        let favouirate = document.createElement('button');
        if (favouriteBtn.style.display!='none') {
            favouirate.innerText = "Add to favouirate";
            favouirate.addEventListener("click", function () {
                favouirateClick(element);
            });
        }
        if (homePageBtn.style.display!='none') {
            favouirate.innerText = "Delete from favouirate";
            favouirate.addEventListener("click", function () {
                deleteFavouirateClick(element,index);
            });
        }
        favouirate.className = "favouirateBtn"
        nodeWrapper.appendChild(imageNode);
        nodeWrapper.appendChild(headingNode);
        imageNode.addEventListener("click", function () {
            heroDetails(element)
        });
        nodeWrapper.append(favouirate);
        heroWrapper.appendChild(nodeWrapper)
    })
}

function fetchFavouriteList() {
    favouriteBtn.style.display = "None";
    homePageBtn.style.display = 'Unset';
    let searchBox = document.querySelector(".searchBox");
    searchBox.style.display = "None";

    let heroWrapper = document.querySelector('.heroList')
    heroWrapper.innerHTML = '';
    let list = JSON.parse(localStorage.getItem("favouirate"));
    createSuperHeroList(list);

}

function backToHomePage() {
    favouriteBtn.style.display = "Unset";
    homePageBtn.style.display = 'None';
    let searchBox = document.querySelector(".searchBox");
    searchBox.style.display = "Block";

    let heroWrapper = document.querySelector('.heroList')
    heroWrapper.innerHTML = '';
    createSuperHeroList(heroList);
}

function favouirateClick(element) {
    console.log("element-----", element)
    let data = [];
    let favouirateList = localStorage.getItem("favouirate");
    if (favouirateList) {
        data = JSON.parse(favouirateList)
    }
    data.push(element)

    localStorage.setItem("favouirate", JSON.stringify(data))
}

function deleteFavouirateClick(element,index) {
    let favouirateList = JSON.parse(localStorage.getItem("favouirate"));
    favouirateList.splice(index,1);
    localStorage.setItem("favouirate", JSON.stringify(favouirateList));
    let heroWrapper = document.querySelector('.heroList')
    heroWrapper.innerHTML = '';
    createSuperHeroList(favouirateList);

}

function clearList() {
    let heroWrapper = document.querySelector('.heroList')
    heroWrapper.innerHTML = '';
}


function heroDetails(data) {
    console.log("hero data--->", data);
    localStorage.setItem("heroData", data.id)
    window.open("./hero.html", "_self")
    return data;
}





