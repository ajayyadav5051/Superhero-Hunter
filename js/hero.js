// import heroDetails  from "./index.js";
let public_key = "feb0cde62295caf63935ea99cc93963b";
let private_key = "6c4aa04c14d7849fe4996daff37e4d4e2cde2d66";
const ts = 1;
const hash = md5(1 + private_key + public_key)
let heroData = localStorage.getItem("heroData")
console.log("hero.js--->", heroData)

async function fetchList() {
    if(heroData) {
        var result = await fetch(`https://gateway.marvel.com/v1/public/characters/${heroData}?ts=1&apikey=feb0cde62295caf63935ea99cc93963b&hash=${hash}`)
    }
    return result;
}

fetchList()
    .then((response) => {
        return response.json();
    }).then((data) => {
        let result = data.data.results[0]
        console.log(result); 
        document.querySelector(".wrapper").innerText = result.name;
        document.querySelector("#heroImg").src = result.thumbnail.path + "/portrait_medium."
        + result.thumbnail.extension;
        document.querySelector("#description").innerText = result.description;

        let comics = document.querySelector(".comicList")
        result.comics.items.forEach(element => {
            let el = document.createElement('li');
            el.innerText = element.name;
            comics.appendChild(el);
        });


        let series = document.querySelector(".seriesList")
        result.series.items.forEach(element => {
            let el = document.createElement('li');
            el.innerText = element.name;
            series.appendChild(el);
        });

        let stories = document.querySelector(".storiesList")
        result.stories.items.forEach(element => {
            let el = document.createElement('li');
            el.innerText = element.name;
            stories.appendChild(el);
        });
        
 });
