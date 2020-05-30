import {capitalizeFirstLetter} from '../../utils/Utils.js'

let Builder = {
    render: async () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user == null) {
                window.location.href = '/#/error403';
            }
        })
        let view =  /*html*/`
        <main>
            <div class="row">
            <form id="builder_form">
                <img id="coctail_model" class="filtered" src="very_good_glasses.png" alt="Coctail model"></img>
                <div id="choose_block" class="row">
                <div class="fruit_grid">
                    <input type="image" src="tomato.svg" name="tomato"/>
                    <input type="image" src="orange.svg" name="orange"/>
                    <input type="image" src="lemon.svg" name="lemon"/>
                    <input type="image" src="lime.svg" name="lime"/>
                    <input type="image" src="kiwi.svg" name="kiwi"/>
                    <input type="image" src="mint.svg" name="mint"/>
                    <input type="image" src="cyan_java_banana.svg" name="cyan_java_banana"/>
                    <input type="image" src="blueberry.svg" name="blueberry"/>
                    <input type="image" src="blackberry.svg" name="blackberry"/>
                    <input type="image" src="plum.svg" name="plum"/>
                    <input type="image" src="grape.svg" name="grape"/>
                    <input type="image" src="raspberry.svg" name="raspberry"/>
                </div>
                <p class="crossed">&nbsp;</p>
                <div class="column">
                    <button type="submit" id="save_button">Save</button>
                    <label for="amount"><b>Amount, g</b></label>
                    <input type="number" min="1" max="999" id="amount">
                    <button id="add_button">Add</button>
                </div>
                </div>
                <p class="recipe_title"><b><i>Recipe:</i></b></p>
                <ul class="grid_recipe">
                    <li>Milk - 500g</li>
                </ul>
                <div id="review_block" class="column">
                <label for="builder_name"><b>Name</b></label>
                <input id="builder_name" type="text" minlength="1" required>
                <label for="builder_description"><b>Description</b></label>
                <textarea id="builder_description" rows="7" cols="35" minlength="10" maxlength="1000" required></textarea>
                </div>
                <button id="delete_button">
                <img src="delete.svg" alt="Delete button background"/>
                </button>
            </form>
            <img id="fon_image" src="fon_bar.jpg" alt="Background image for bar"></img>
            <img src="very_good_glasses.png" class="filtered" alt="Main cocktail image" id="filtered_image"></p>
            </div>
        </main>
        `
        return view
    },
    after_render: async () => {
        const recipe = new Map();
        recipe.set('Milk', 500);
        var hue_rotate = 0;
        var total_weight = 0;
        var saturate = 0;

        function getIngridientColor(name, ref) {
            return ref.child('ingridients/' + name).once('value').then(function (snapshot) {
                return Promise.resolve(snapshot.val().color);
            })
        }

        var ingridients = document.getElementsByClassName("fruit_grid")[0].children;
        for (var i = 0; i < ingridients.length; i++) {
            ingridients[i].addEventListener ("click",  event => {
                event.preventDefault();
                var curCell = event.srcElement;
                var children = curCell.parentElement.children;
                for (var i = 0; i < children.length; i++) {
                    var curChild = children[i];
                    curChild.style.backgroundColor = "#f4ac9d";
                }
                curCell.style.backgroundColor = "blue";
    
                var oldAddButton = document.getElementById("add_button");
                var addButton = oldAddButton.cloneNode(true);
                oldAddButton.parentNode.replaceChild(addButton, oldAddButton);
                var portion = document.getElementById("amount");
                addButton.addEventListener ("click",  e => {
                    e.preventDefault();
                    var ref = firebase.app().database().ref();
                    var add_weight = Number(portion.value);
                    if (!portion.checkValidity()) {
                        portion.reportValidity();
                        return;
                    }
                    if (curCell == null || portion.value == null || portion.value == '')
                        return;
                    var ul = document.getElementsByClassName("grid_recipe")[0];
                    var cellName = capitalizeFirstLetter(curCell.name)
                    if (recipe.has(curCell.name)) {
                        recipe[curCell.name] += add_weight;
                        for (var i = 0; i < ul.children.length; i++) {
                            var curChild = ul.children[i];
                            var parts = curChild.innerHTML.split('-');
                            if (parts[0].trim() === cellName) {
                                curChild.innerHTML = cellName + " - " + (Number(parts[1].slice(0, -1))  + add_weight) + "g";
                                break;
                            }
                        }
                    } else {
                        recipe.set(curCell.name, add_weight)
                        var li = document.createElement("li");
                        li.appendChild(document.createTextNode(cellName + " - " + portion.value + "g"));
                        ul.appendChild(li);
                    }
                    getIngridientColor(curCell.name, ref).then(function(color_angle) {
                        hue_rotate += (color_angle - hue_rotate) * (add_weight / (add_weight + total_weight));
                        saturate += (2500 - saturate) * (add_weight / (add_weight + total_weight + 500))
                        total_weight += add_weight;
                        var filtered_images = document.getElementsByClassName("filtered")
                        for (var i = 0; i < filtered_images.length; i++) {
                            filtered_images[i].style.filter = "hue-rotate(" + (Number(hue_rotate) - 30)
                                                                            + "deg) saturate(" + saturate + "%)";
                        }
                        curCell.style.backgroundColor = "#f4ac9d";
                        portion.value = null;
                        curCell = null;
                    });
                });
                return false;
            });
        }

        document.getElementById("delete_button").addEventListener("click",  e => {
            event.preventDefault();
            var root = document.getElementsByClassName("grid_recipe")[0];
            recipe.clear();
            recipe.set('Milk', 500);
            hue_rotate = 0;
            total_weight = 0;
            saturate = 0;
            var filtered_images = document.getElementsByClassName("filtered")
            for (var i = 0; i < filtered_images.length; i++) {
                filtered_images[i].style.filter = "saturate(0%)";
            }
            while(root.firstChild) {
                root.removeChild(root.firstChild);
            }
            var li = document.createElement("li");
            li.appendChild(document.createTextNode("Milk - 500g"));
            root.appendChild(li);
            return false;
        })

        function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16).replace('-', '');
            });
          }

        document.getElementById("save_button").addEventListener ("click",  e => {
            event.preventDefault();
            var builder_name = document.getElementById("builder_name");
            var builder_description = document.getElementById("builder_description");
            var name = builder_name.value;
            var description = builder_description.value;
            if (!builder_name.checkValidity() || name.length < 1) {
                alert('Name can not be empty')
                return false;
            }
            if (!builder_description.checkValidity() || description.length < 10 || description.length > 1000) {
                alert('Description must be longer then 10 and shorter then 1001')
                return false;
            }


            var db = firebase.database();
            var cocktailRef = db.ref('cocktails/' + uuidv4());
            cocktailRef.set({
                hue_rotate: hue_rotate,
                saturate: saturate,
                name: name,
                description: description,
                author: firebase.auth().currentUser.email,
                rating: -1,
            })
            recipe.forEach(function(value, key) {
                cocktailRef.child("recipe").child(key).set(value);
            });
            alert(`Coctail ${name} successfully created`)
            window.location.href = '/';
            return true;
        })
    }

}

export default Builder;