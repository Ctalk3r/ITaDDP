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

export default Utils;