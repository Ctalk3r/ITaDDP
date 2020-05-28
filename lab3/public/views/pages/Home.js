// --------------------------------
//  Define Data Sources
// --------------------------------

let getPostsList = async () => {
     const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`https://5bb634f6695f8d001496c082.mockapi.io/api/posts`, options)
        const json = await response.json();
        // console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let Home = {
    render : async () => {
        // let posts = await getPostsList()
        let view =  /*html*/`
        <main>
        <h1>Cocktail's Top</h1>
        <div class="grid">
          <article class="coctail_box">
            <div class="coctail_header">
              <div class="number_circle">1</div>
              <div class="coctail_title">
                <h3><u>Coctail name 1</u></h3>
                <h6 class="half-transparent">By <u>username</u></h6>
              </div>
            </div>
            <div class="coctail_main">
              <div class="coctail_image_background_in_grid">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div>
                <div>Average score: 3</div>
                <div class="stars">
                  <form action="">
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>
              </div>
            </div>
          </article>
          <article class="coctail_box">
            <div class="coctail_header">
              <div class="number_circle">1</div>
              <div class="coctail_title">
                <h3><u>Coctail name 1</u></h3>
                <h6 class="half-transparent">By <u>username</u></h6>
              </div>
            </div>
            <div class="coctail_main">
              <div class="coctail_image_background_in_grid">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div>
                <div>Average score: 3</div>
                <div class="stars">
                  <form action="">
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>
              </div>
            </div>
          </article>
          <article class="coctail_box">
            <div class="coctail_header">
              <div class="number_circle">1</div>
              <div class="coctail_title">
                <h3><u>Coctail name 1</u></h3>
                <h6 class="half-transparent">By <u>username</u></h6>
              </div>
            </div>
            <div class="coctail_main">
              <div class="coctail_image_background_in_grid">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div>
                <div>Average score: 3</div>
                <div class="stars">
                  <form action="">
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>
              </div>
            </div>
          </article>
          <article class="coctail_box">
            <div class="coctail_header">
              <div class="number_circle">1</div>
              <div class="coctail_title">
                <h3><u>Coctail name 1</u></h3>
                <h6 class="half-transparent">By <u>username</u></h6>
              </div>
            </div>
            <div class="coctail_main">
              <div class="coctail_image_background_in_grid">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div>
                <div>Average score: 3</div>
                <div class="stars">
                  <form action="">
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>
              </div>
            </div>
          </article>
          <article class="coctail_box">
            <div class="coctail_header">
              <div class="number_circle">1</div>
              <div class="coctail_title">
                <h3><u>Coctail name 1</u></h3>
                <h6 class="half-transparent">By <u>username</u></h6>
              </div>
            </div>
            <div class="coctail_main">
              <div class="coctail_image_background_in_grid">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div>
                <div>Average score: 3</div>
                <div class="stars">
                  <form action="">
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>
              </div>
            </div>
          </article>
          <article class="coctail_box">
            <div class="coctail_header">
              <div class="number_circle">1</div>
              <div class="coctail_title">
                <h3><u>Coctail name 1</u></h3>
                <h6 class="half-transparent">By <u>username</u></h6>
              </div>
            </div>
            <div class="coctail_main">
              <div class="coctail_image_background_in_grid">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div>
                <div>Average score: 3</div>
                <div class="stars">
                  <form action="">
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>
              </div>
            </div>
          </article>
          <article class="coctail_box">
            <div class="coctail_header">
              <div class="number_circle">1</div>
              <div class="coctail_title">
                <h3><u>Coctail name 1</u></h3>
                <h6 class="half-transparent">By <u>username</u></h6>
              </div>
            </div>
            <div class="coctail_main">
              <div class="coctail_image_background_in_grid">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div>
                <div>Average score: 3</div>
                <div class="stars">
                  <form action="">
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>
              </div>
            </div>
          </article>
          <article class="coctail_box">
            <div class="coctail_header">
              <div class="number_circle">1</div>
              <div class="coctail_title">
                <h3><u>Coctail name 1</u></h3>
                <h6 class="half-transparent">By <u>username</u></h6>
              </div>
            </div>
            <div class="coctail_main">
              <div class="coctail_image_background_in_grid">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div>
                <div>Average score: 3</div>
                <div class="stars">
                  <form action="">
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>
              </div>
            </div>
          </article>
          <article class="coctail_box">
            <div class="coctail_header">
              <div class="number_circle">1</div>
              <div class="coctail_title">
                <h3><u>Coctail name 1</u></h3>
                <h6 class="half-transparent">By <u>username</u></h6>
              </div>
            </div>
            <div class="coctail_main">
              <div class="coctail_image_background_in_grid">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div>
                <div>Average score: 3</div>
                <div class="stars">
                  <form action="">
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>
              </div>
            </div>
          </article>
          <article class="coctail_box">
            <div class="coctail_header">
              <div class="number_circle">1</div>
              <div class="coctail_title">
                <h3><u>Coctail name 1</u></h3>
                <h6 class="half-transparent">By <u>username</u></h6>
              </div>
            </div>
            <div class="coctail_main">
              <div class="coctail_image_background_in_grid">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div>
                <div>Average score: 3</div>
                <div class="stars">
                  <form action="">
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>
              </div>
            </div>
          </article>
          <article class="coctail_box">
            <div class="coctail_header">
              <div class="number_circle">1</div>
              <div class="coctail_title">
                <h3><u>Coctail name 1</u></h3>
                <h6 class="half-transparent">By <u>username</u></h6>
              </div>
            </div>
            <div class="coctail_main">
              <div class="coctail_image_background_in_grid">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div>
                <div>Average score: 3</div>
                <div class="stars">
                  <form action="">
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>
              </div>
            </div>
          </article>
          <article class="coctail_box">
            <div class="coctail_header">
              <div class="number_circle">1</div>
              <div class="coctail_title">
                <h3><u>Coctail name 1</u></h3>
                <h6 class="half-transparent">By <u>username</u></h6>
              </div>
            </div>
            <div class="coctail_main">
              <div class="coctail_image_background_in_grid">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div>
                <div>Average score: 3</div>
                <div class="stars">
                  <form action="">
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>
              </div>
            </div>
          </article>
          <article class="coctail_box">
            <div class="coctail_header">
              <div class="number_circle">1</div>
              <div class="coctail_title">
                <h3><u>Coctail name 1</u></h3>
                <h6 class="half-transparent">By <u>username</u></h6>
              </div>
            </div>
            <div class="coctail_main">
              <div class="coctail_image_background_in_grid">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div>
                <div>Average score: 3</div>
                <div class="stars">
                  <form action="">
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>
              </div>
            </div>
          </article>
          <article class="coctail_box">
            <div class="coctail_header">
              <div class="number_circle">1</div>
              <div class="coctail_title">
                <h3><u>Coctail name 1</u></h3>
                <h6 class="half-transparent">By <u>username</u></h6>
              </div>
            </div>
            <div class="coctail_main">
              <div class="coctail_image_background_in_grid">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div>
                <div>Average score: 3</div>
                <div class="stars">
                  <form action="">
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>
              </div>
            </div>
          </article>
          <article class="coctail_box">
            <div class="coctail_header">
              <div class="number_circle">1</div>
              <div class="coctail_title">
                <h3><u>Coctail name 1</u></h3>
                <h6 class="half-transparent">By <u>username</u></h6>
              </div>
            </div>
            <div class="coctail_main">
              <div class="coctail_image_background_in_grid">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div>
                <div>Average score: 3</div>
                <div class="stars">
                  <form action="">
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>
              </div>
            </div>
          </article>
          <article class="coctail_box">
            <div class="coctail_header">
              <div class="number_circle">1</div>
              <div class="coctail_title">
                <h3><u>Coctail name 1</u></h3>
                <h6 class="half-transparent">By <u>username</u></h6>
              </div>
            </div>
            <div class="coctail_main">
              <div class="coctail_image_background_in_grid">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div>
                <div>Average score: 3</div>
                <div class="stars">
                  <form action="">
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>
              </div>
            </div>
          </article>
          <article class="coctail_box">
            <div class="coctail_header">
              <div class="number_circle">1</div>
              <div class="coctail_title">
                <h3><u>Coctail name 1</u></h3>
                <h6 class="half-transparent">By <u>username</u></h6>
              </div>
            </div>
            <div class="coctail_main">
              <div class="coctail_image_background_in_grid">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div>
                <div>Average score: 3</div>
                <div class="stars">
                  <form action="">
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>
              </div>
            </div>
          </article>
          <article class="coctail_box">
            <div class="coctail_header">
              <div class="number_circle">1</div>
              <div class="coctail_title">
                <h3><u>Coctail name 1</u></h3>
                <h6 class="half-transparent">By <u>username</u></h6>
              </div>
            </div>
            <div class="coctail_main">
              <div class="coctail_image_background_in_grid">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div>
                <div>Average score: 3</div>
                <div class="stars">
                  <form action="">
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                  </form>
                </div>
              </div>
            </div>
          </article>
        </div>
    </main>
        `
        return view
    }
    , after_render: async () => {
    }

}

export default Home;