let Cocktail = {
    render: async () => {
        let view =  /*html*/`
        <main>
        <div class="full_coctail_box">
          <div class="coctail_header2">
            <h2><u>Coctail name 1</u></h2>
            <div class="number_circle">1</div>
          </div>
          <div class="coctail_main">
            <div>
              <div class="coctail_image_background">
                <img id="coctail_image" src="coctail.svg" alt="Cocktail">
              </div>
              <div class="score_title">Average score: 3</div>
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
            <div class="review">
              <article>
                The Bloody Mary cocktail is known for its savory, acidic, and polarizing taste that people tend to either love or hate. The drink, made with tomato juice and vodka, has become a mainstay of bottomless brunches, and based on the popularity of DIY Bloody Mary bars, many people love customizing the beverage with their own salty garnishes. The drink, made with tomato juice and vodka, has become a mainstay of bottomless brunches, and based on the popularity of DIY Bloody Mary bars, many people love customizing the beverage with their own salty garnishes    
                <p>&nbsp;</p>
                <p>By <strong>username</strong></p>
              </article>
            </div>
            <div class="margin top">
              <b><i>Recipe:</i></b>
              <ul class="recipe">
                <li>Cucumber - 200g</li>
                <li>Potato - 250g</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="comments_section">
            <ul class="comments">
              <li class="comment">
                <img id="profile_image" src="profile.svg" alt="Profile image">
                <div>
                  <p class="comment_author"><strong>lol</strong></p>  
                  <p>
                    From the point of view of banal erudition, not every individual who critically metaphysizes abstractions is able to refute the tendencies of paradoxical emotions. From the point of view of banal erudition, not every individual is able to ignore the point of view of the banal tendency, which destroys the point of view of banal erudition.
                  </p> 
                </div>
              </li>
            </ul>
        </div>
        <div class="send_section">
          <button id="expand_button">
            Show more
          </button>
          <div class="send_area" id="send_area">
            <textarea maxlength="400" placeholder="Leave a comment..."></textarea>
            <button id="send_button">&#xf04b;</button>
          </div>
        </div>
      </main>
        `
        return view
    },
    after_render: async () => { }

}

export default Cocktail;