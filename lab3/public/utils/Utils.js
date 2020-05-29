const Utils = { 
    // --------------------------------
    //  Parse a url and break it into resource, id and verb
    // --------------------------------
    parseRequestURL : () => {

        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        }
        request.resource    = r[1]
        request.id          = r[2]
        request.verb        = r[3]

        return request
    }

    // --------------------------------
    //  Simple sleep implementation
    // --------------------------------
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


export default Utils;