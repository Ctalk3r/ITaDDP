const Utils = { 

    parseRequestURL : () => {
        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
        }
        request.resource    = r[1]
        request.id          = r[2]

        return request
    }

    , sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export function getAllCocktails(ref, needComments=false) {
    var cocktails = [];
    return ref.orderByChild('rating').once('value')
        .then(function (snapshot) {
            var cocktail = [];
            snapshot.forEach(function (child) {
                cocktail.push({
                    id: child.ref.getKey(),
                    hue_rotate: child.val().hue_rotate,
                    saturate: child.val().saturate,
                    name: child.val().name,
                    description: child.val().description,
                    author: child.val().author,
                    rating: child.val().rating,
                    recipe: child.val().recipe,
                });
                if (needComments) {
                    cocktail.comments = child.val().comments;
                }
            });
            cocktails.push(cocktail);
            return Promise.resolve(cocktails);
        });
}

export function getAllComments(ref) {
    var comments = [];
    return ref.once('value')
        .then(function (snapshot) {
            var comment = [];
            if (snapshot.val() != null) {
                snapshot.forEach(function (child) {
                    comment.push({
                        author: child.val().author,
                        body: child.val().body
                    });
                });
                comments.push(comment);
            }
            return Promise.resolve(comments);
        });
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function addStarsListeners(doc, cocktail, cocktailsRef, i='') {
    for (var j = 1; j <= 5; j++) {
        doc.getElementById(`star-${i}${j}`).addEventListener("change",  e => {
            e.preventDefault();
            var newRate = Number(e.srcElement.id.slice(-1))
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    cocktailsRef.child(cocktail.id + '/rated').once('value').then(function (ratedSnapshot) {
                        var addRate = null;
                        ratedSnapshot.forEach(function (child) {
                            name = child.ref.getKey();
                            var x = name.lastIndexOf('*');
                            name = name.slice(0, x) + name.slice(x).replace('*', '.');
                            x = name.lastIndexOf('*');
                            name = name.slice(0, x) + name.slice(x).replace('*', '@');
                            if (name == user.email) {
                                addRate = child.val();
                            }
                        });
                        var ratedLength = ratedSnapshot.numChildren();
                        var rate = cocktail.rating == -99999 ? 0 : cocktail.rating;
                        var prevCoeff = ratedLength < 10 ? ratedLength / 10 : 1;
                        if (addRate != null) {
                            rate += prevCoeff * (newRate - 3 - addRate)
                        } else {
                            var coeff = ratedLength + 1 < 10 ? (ratedLength + 1) / 10 : 1;
                            if (prevCoeff != 0)
                                rate *= (coeff / prevCoeff)
                            rate += coeff * (newRate - 3)
                        }
                        doc.getElementById(String(cocktail.id)).getElementsByClassName("score")[0].innerHTML =
                            "Cocktail Score: " + String(Number(rate).toFixed(2));
                        cocktail.rating = rate;
                        cocktailsRef.child(cocktail.id + '/rated/' + user.email.replace('@', '*').replace('.', '*')).set(newRate - 3);
                        cocktailsRef.child(cocktail.id + '/rating').set(rate);
                    });
                }
                else {
                    e.srcElement.checked = false;
                    alert("STOP RIGHT THERE, CRIMINAL SCUM!");
                }
            });
            return false;
        });
    }
}

export function markStarsChecked(doc, cocktail, cocktailsRef, i='') {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if (name == cocktail.author) {
                doc.getElementById(`star-${i}5`).checked = true;
                for (var u = 1; u <= 5; u++) {
                    var styleElem = document.head.appendChild(document.createElement("style"));
                    styleElem.innerHTML = `input#star-${i}${u}:checked ~ label.star:before {color: #e5e4e2;}`;
                    doc.getElementById(`star-${i}${u}`).disabled = true;
                }
                return;
            }
            cocktailsRef.child(cocktail.id + '/rated').once('value').then(function (ratedSnapshot) {
                ratedSnapshot.forEach(function (child) {
                    name = child.ref.getKey();
                    var x = name.lastIndexOf('*');
                    name = name.slice(0, x) + name.slice(x).replace('*', '.');
                    x = name.lastIndexOf('*');
                    name = name.slice(0, x) + name.slice(x).replace('*', '@');
                    if (name == user.email) {
                        doc.getElementById(`star-${i}${child.val() + 3}`).checked = true;
                    }
                });
              })
            }
          });
}

export default Utils;