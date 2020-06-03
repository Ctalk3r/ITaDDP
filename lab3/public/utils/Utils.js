import {getLevenshteinDist} from '../../utils/Levenhstein.js'

const Utils = { 

    parseRequestURL : () => {
        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource            : null,
            id                  : null,
            value               : null
        }
        request.resource        = r[1]
        request.id              = r[2]
        request.value           = r[3]
        return request
    }

    , sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

function isLowerCaseAt(str, index) {
    return str.charAt(index).toLowerCase() === str.charAt(index);
  }
  
function split(str) {
    let res = [];
    let cur = '';
    cur += str[0];
    for (let i = 0; i < str.length - 1; ++i) {
        if (str[i + 1] != '_' && str[i + 1] != ' ' && !(isLowerCaseAt(str, i) && !isLowerCaseAt(str, i + 1))) {
            cur += str[i + 1];
        } else {
            if (cur.length > 2) {
                res.push(cur);
            }
            cur = '';
            if (str[i + 1] != '_' && str[i + 1] != '_') {
                cur += str[i + 1];
            }
        }
    }
    if (cur.length > 2) {
        res.push(cur);
    }
    return res;
}

function checkName(name, value) {
    if (name.length < 3 && value.length < 3) {
        return name.trim().toLowerCase() === value.trim().toLowerCase();
    }
    let res1 = split(name);
    let res2 = split(value);
    for (let i = 0; i < res1.length; i++) {
        for (let j = 0; j < res2.length; j++) {
            if (getLevenshteinDist(res1[i].trim().toLowerCase(), res2[j].trim().toLowerCase()) < 4)
                return true;
        }
    }
    return false;
}

function checkUserName(name, value) {
    let x = name.indexOf('@')
    if (x != -1) name = name.substring(0, x)
    x = value.indexOf('@')
    if (x != -1) value = value.substring(0, x)
    return checkName(name, value);
}

export function getAllCocktails(ref, id, value) {
    let cocktails = [];
    return ref.orderByChild('rating').once('value')
        .then(function (snapshot) {
            let cocktail = [];
            snapshot.forEach(function (child) {
                if ((id == undefined || value == undefined) ||
                     (id == 0 && checkName(child.val().name, value)) ||
                     (id == 1 && checkUserName(child.val().author, value))) {
                    cocktail.push({
                        id: child.ref.getKey(),
                        hue_rotate: child.val().hue_rotate,
                        saturate: child.val().saturate,
                        name: child.val().name,
                        description: child.val().description,
                        author: child.val().author,
                        rating: child.val().rating,
                    });
                } else {
                    cocktail.push(undefined);
                }
            });
            cocktails.push(cocktail);
            return Promise.resolve(cocktails);
        });
}

export function getAllComments(ref) {
    let comments = [];
    return ref.once('value')
        .then(function (snapshot) {
            let comment = [];
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
    const rateMultiplier = 10;
    for (let j = 1; j <= 5; j++) {
        doc.getElementById(`star-${i}${j}`).addEventListener("change",  e => {
            e.preventDefault();
            const newRate = Number(e.srcElement.id.slice(-1))
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    cocktailsRef.child(cocktail.id + '/rated').once('value').then(function (ratedSnapshot) {
                        let addRate = null;
                        ratedSnapshot.forEach(function (child) {
                            name = child.ref.getKey();
                            let x = name.lastIndexOf('*');
                            name = name.slice(0, x) + name.slice(x).replace('*', '.');
                            x = name.lastIndexOf('*');
                            name = name.slice(0, x) + name.slice(x).replace('*', '@');
                            if (name == user.email) {
                                addRate = child.val();
                            }
                        });
                        const ratedLength = ratedSnapshot.numChildren();
                        let rate = cocktail.rating == -99999 ? 0 : cocktail.rating;
                        const prevCoeff = ratedLength < rateMultiplier ? ratedLength / rateMultiplier : 1;
                        if (addRate != null) {
                            rate += prevCoeff * (newRate - 3 - addRate)
                        } else {
                            const coeff = ratedLength + 1 < rateMultiplier ? (ratedLength + 1) / rateMultiplier : 1;
                            if (prevCoeff != 0)
                                rate *= (coeff / prevCoeff)
                            rate += coeff * (newRate - 3)
                        }
                        doc.getElementById(String(cocktail.id)).getElementsByClassName("score")[0].innerHTML =
                            "Cocktail Score: " + Number(rate).toFixed(2);
                        cocktail.rating = rate;
                        cocktailsRef.child(cocktail.id + '/rated/' + user.email.replace('@', '*').replace('.', '*')).set(newRate - 3);
                        cocktailsRef.child(cocktail.id + '/rating').set(Number(Number(rate).toFixed(2)));
                    });
                }
                else {
                    e.srcElement.checked = false;
                    openSnackbar("STOP RIGHT THERE, CRIMINAL SCUM!");
                }
            });
            return false;
        });
    }
}

export function markStarsChecked(doc, cocktail, cocktailsRef, i='') {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if (user.email === cocktail.author) {
                doc.getElementById(`star-${i}5`).checked = true;
                for (let u = 1; u <= 5; u++) {
                    const star = doc.getElementById(`star-${i}${u}`)
                    star.nextSibling.nextSibling.classList.add('off_star')
                    star.disabled = true;
                }
                return;
            }
            cocktailsRef.child(cocktail.id + '/rated').once('value').then(function (ratedSnapshot) {
                ratedSnapshot.forEach(function (child) {
                    name = child.ref.getKey();
                    let x = name.lastIndexOf('*');
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

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16).replace('-', '');
    });
  }

export function openSnackbar(text, timeout=6 * 1000) {
  document.getElementById('sb_name').innerHTML = text;
  document.getElementById('sb').classList.add('mdc-snackbar--open');
  setTimeout(closeSnackBar, timeout);
}

export default Utils;