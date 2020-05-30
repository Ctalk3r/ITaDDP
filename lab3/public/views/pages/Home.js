import {getAllCocktails, addStarsListeners, markStarsChecked} from '../../utils/Utils.js'
import Utils from '../../utils/Utils.js'

function renderCocktail(cocktail, i) {
    const view = document.createElement('article');
    view.className += 'coctail_box';
    view.id = cocktail.id;
    var rating = cocktail.rating == -99999 ? '-' : cocktail.rating;
    view.innerHTML = `
              <div class="coctail_header">
                <div class="number_circle">${i + 1}</div>
                <div class="coctail_title">
                  <a href="https://coctail-maker.firebaseapp.com/#/cocktail/:id=${cocktail.id}"><h3><u>${cocktail.name}</u></h3></a>
                  <a href="/#/home/:id=1/:value=${cocktail.author}"><h6 class="half-transparent">By <u>${cocktail.author}</u></h6></a>
                </div>
              </div>
              <div class="coctail_main">
                <div class="coctail_image_background_in_grid">
                <a href="https://coctail-maker.firebaseapp.com/#/cocktail/:id=${cocktail.id}">
                  <img id="coctail_image${i}" class="coctail_image" src="very_good_glasses.png" alt="Cocktail">
                </a>
                </div>
                <div>
                  <div class="score">Cocktail Score: ${rating}</div>
                  <div class="stars">
                    <form action="">
                      <input class="star star-5" id="star-${i}5" type="radio" name="star"/>
                      <label class="star star-5" for="star-${i}5"></label>
                      <input class="star star-4" id="star-${i}4" type="radio" name="star"/>
                      <label class="star star-4" for="star-${i}4"></label>
                      <input class="star star-3" id="star-${i}3" type="radio" name="star"/>
                      <label class="star star-3" for="star-${i}3"></label>
                      <input class="star star-2" id="star-${i}2" type="radio" name="star"/>
                      <label class="star star-2" for="star-${i}2"></label>
                      <input class="star star-1" id="star-${i}1" type="radio" name="star"/>
                      <label class="star star-1" for="star-${i}1"></label>
                    </form>
                  </div>
                </div>
              </div>
            `
    return view
}

let Home = {
    render : async () => {
        let view =  /*html*/`
        <main>
          <h1 id="main_title">Cocktail's Top</h1>
          <div class="grid">
          </div>
        </main>
        `
        return view
    }
    , after_render: async () => {
        var ref = firebase.app().database().ref().child('cocktails/');
        var id = Utils.parseRequestURL().id
        var value = Utils.parseRequestURL().value
        id = id ? id.slice(4) : id
        value = value ? value.slice(7).replace(new RegExp("%20", 'g'), " ") : value
        if (id != undefined && value != undefined) {
            document.getElementById('main_title').innerHTML = (id == 1 ? "Author: " : "Cocktail: ") + value;
        } else {
          document.getElementById('main_title').innerHTML = "Cocktail's Top";
        }
        getAllCocktails(ref, id, value).then(function(cocktails) {
          var main_grid = document.getElementsByClassName("grid")[0];
          if (cocktails.length < 1) return;
          cocktails = JSON.parse(JSON.stringify(cocktails))[0];
          for (var i = cocktails.length - 1; i >= 0; i--) {
            if (cocktails[i] == undefined) continue;
            main_grid.appendChild(renderCocktail(cocktails[i], cocktails.length - i - 1));
            main_grid.lastChild.getElementsByClassName("coctail_image")[0].style.filter =
            `hue-rotate(${(Number(cocktails[i].hue_rotate) - 30)}deg) saturate(${cocktails[i].saturate}%)`;
            markStarsChecked(document, cocktails[i], ref, String(cocktails.length - i - 1));
            addStarsListeners(document, cocktails[i], ref, String(cocktails.length - i - 1));
          }
        });
    }
}

export default Home;