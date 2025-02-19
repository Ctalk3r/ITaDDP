import Utils, { openSnackbar } from '../../utils/Utils.js'
import {capitalizeFirstLetter, getAllComments, addStarsListeners, markStarsChecked} from '../../utils/Utils.js'

function renderComment(comment, i) {
  const view = document.createElement('li');
  view.className += 'comment';
  if (i != 0 && document.getElementById("expand_button").innerHTML.trim() === "Show more") view.className += ' hide';
  view.innerHTML = `
            <a href="/#/home/:id=1/:value=${comment.author}"><img id="profile_image" src="/images/profile.svg" alt="Profile image"></a>
            <div>
              <a href="/#/home/:id=1/:value=${comment.author}"><p class="comment_author"><strong>${comment.author}</strong></p></a>  
              <p>${comment.body}</p> 
            </div>
          `
  return view
}

function updateComments(commentsRef) {
  getAllComments(commentsRef).then(function(comments) {
    const comment_block = document.getElementsByClassName("comments")[0];
    const oldSendButton = document.getElementById("send_button");
    const sendButton = oldSendButton.cloneNode(true);
    oldSendButton.parentNode.replaceChild(sendButton, oldSendButton);
    sendButton.addEventListener("click",  e => {
      e.preventDefault();
      const textarea = document.getElementById("comment_text");
      if (textarea.value.length == 0) {
        openSnackbar("Comment can't be empty")
        return;
      }
      commentsRef.child(-comments.length).set({
          author: firebase.auth().currentUser == null ? "Anonym" : firebase.auth().currentUser.email,
          body: textarea.value,
      })
      textarea.value = '';
      while(comment_block.firstChild) {
        comment_block.removeChild(comment_block.firstChild);
      }
      updateComments(commentsRef);
      return;
    });
    if (comments.length == 0) return;
    comments = JSON.parse(JSON.stringify(comments))[0];
    for (let i = 0; i < comments.length; i++) {
      comment_block.appendChild(renderComment(comments[i], i));
    }
    if (comments.length > 1) {
      document.getElementById("expand_button").classList.remove('hide');
    }
  });
}

let Cocktail = {
    render: async () => {
        const requestId = Utils.parseRequestURL().id.slice(4);
        const ref = firebase.app().database().ref();
        ref.child('cocktails/' + requestId).once('value').then(function (snapshot) {
            if (!snapshot.val()) {
                window.location.href = '/#/Error404';
            }
        })
        let view =  /*html*/`
        <main>
        <div class="full_coctail_box">
          <div class="coctail_header2">
            <h2><u id="title"></u></h2>
            <div class="number_circle invisible">1</div>
          </div>
          <div class="coctail_main">
            <div>
              <div class="coctail_image_background">
                <img class="coctail_image" src="/images/very_good_glasses.png" alt="Cocktail">
              </div>
              <div class="score_title score">Cocktail score: </div>
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
              <article id="description">
                <p>&nbsp;</p>
                <a><p>By <strong id="sign"></strong></p></a>
              </article>
            </div>
            <div class="margin top">
              <b class="recipe_title"><i>Recipe:</i></b>
              <ul class="recipe">
              </ul>
            </div>
          </div>
        </div>
        <div class="comments_section">
            <ul class="comments">
            </ul>
        </div>
        <div class="send_section">
          <button id="expand_button" class="hide">
            Show more
          </button>
          <div class="send_area">
            <textarea id="comment_text" maxlength="400" placeholder="Leave a comment..."></textarea>
            <button id="send_button">&#xf04b;</button>
          </div>
        </div>
      </main>
        `
        return view
    },
    after_render: async () => {
        let requestId = Utils.parseRequestURL().id.slice(4);
        const ref = firebase.app().database().ref();
        ref.child('cocktails/' + requestId).once('value').then(function (snapshot) {
            const cocktail = snapshot.val();
            cocktail.id = requestId;
            document.getElementsByClassName("full_coctail_box")[0].id = cocktail.id
            document.getElementById("title").innerHTML = cocktail.name
            document.getElementsByClassName("score_title")[0].innerHTML += cocktail.rating < 0 ? '-' : cocktail.rating
            document.getElementById("description").innerHTML = cocktail.description + document.getElementById("description").innerHTML
            document.getElementById("sign").innerHTML = cocktail.author
            document.getElementById("sign").parentElement.parentElement.href=`/#/home/:id=1/:value=${cocktail.author}`;
            document.getElementsByClassName("coctail_image")[0].style.filter =
              `hue-rotate(${(Number(cocktail.hue_rotate) - 30)}deg) saturate(${cocktail.saturate}%)`;
            const recipe = document.getElementsByClassName("recipe")[0];
            ref.child('cocktails/' + requestId + '/recipe').once('value').then(function (recipeSnapshot) {
              recipeSnapshot.forEach(function (child) {
                const li = document.createElement("li");
                li.appendChild(document.createTextNode(capitalizeFirstLetter(child.ref.getKey()) + " - " + child.val() + "g"));
                recipe.appendChild(li);
              });
            });
            document.getElementById("expand_button").addEventListener ("click",  event => {
              event.preventDefault();
              const comment_block = document.getElementsByClassName("comments")[0];
              if (event.srcElement.innerHTML.trim() === "Show more") {
                for (let i = 1; i < comment_block.children.length; i++) {
                  comment_block.children[i].classList.remove('hide');
                }
                event.srcElement.innerHTML = "Show less"
              } else {
                for (let i = 1; i < comment_block.children.length; i++) {
                  comment_block.children[i].classList.add('hide');
                }
                event.srcElement.innerHTML = "Show more"
              }

              return false;
            });
            markStarsChecked(document, cocktail, ref.child('cocktails/'));
            addStarsListeners(document, cocktail, ref.child('cocktails/'));
            const commentsRef = firebase.app().database().ref().child('cocktails/' + requestId + '/comments')
            updateComments(commentsRef);
          });
     }

}

export default Cocktail;