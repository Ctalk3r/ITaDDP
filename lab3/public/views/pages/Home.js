import {getAllCocktails} from '../../utils/Utils.js'

function renderCocktail(cocktail, i) {
    const view = document.createElement('article');
    view.className += 'coctail_box';
    view.id = cocktail.id;
    var rating = cocktail.rating < 0 ? '-' : cocktail.rating;
    view.innerHTML = `
              <div class="coctail_header">
                <div class="number_circle">${i + 1}</div>
                <div class="coctail_title">
                  <a href="https://coctail-maker.firebaseapp.com/#/cocktail/:id=${cocktail.id}"><h3><u>${cocktail.name}</u></h3></a>
                  <h6 class="half-transparent">By <u>${cocktail.author}</u></h6>
                </div>
              </div>
              <div class="coctail_main">
                <div class="coctail_image_background_in_grid">
                <a href="https://coctail-maker.firebaseapp.com/#/cocktail/:id=${cocktail.id}">
                  <img id="coctail_image${i}" class="coctail_image" src="very_good_glasses.png" alt="Cocktail">
                </a>
                </div>
                <div>
                  <div>Cocktail Score: ${rating}</div>
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
          <h1>Cocktail's Top</h1>
          <div class="grid">
          </div>
        </main>
        `
        return view
    }
    , after_render: async () => {
        var ref = firebase.app().database().ref().child('cocktails/');
        getAllCocktails(ref).then(function(cocktails) {
          var main_grid = document.getElementsByClassName("grid")[0];
          cocktails = JSON.parse(JSON.stringify(cocktails))[0];
          for (var i = 0; i < cocktails.length; i++) {
            main_grid.appendChild(renderCocktail(cocktails[i], i));
            main_grid.lastChild.getElementsByClassName("coctail_image")[0].style.filter =
            `hue-rotate(${(Number(cocktails[i].hue_rotate) - 30)}deg) saturate(${cocktails[i].saturate}%)`;
          }
        });
    }
}

export default Home;