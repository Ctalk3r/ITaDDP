import {capitalizeFirstLetter, uuidv4, openSnackbar} from '../../utils/Utils.js'

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
                <img id="coctail_model" class="filtered" src="/images/very_good_glasses.png" alt="Coctail model"></img>
                <div id="choose_block" class="row">
                <div class="fruit_grid">
                    <input type="image" src="/images/tomato.svg" name="tomato"/>
                    <input type="image" src="/images/orange.svg" name="orange"/>
                    <input type="image" src="/images/lemon.svg" name="lemon"/>
                    <input type="image" src="/images/lime.svg" name="lime"/>
                    <input type="image" src="/images/kiwi.svg" name="kiwi"/>
                    <input type="image" src="/images/mint.svg" name="mint"/>
                    <input type="image" src="/images/cyan_java_banana.svg" name="cyan_java_banana"/>
                    <input type="image" src="/images/blueberry.svg" name="blueberry"/>
                    <input type="image" src="/images/blackberry.svg" name="blackberry"/>
                    <input type="image" src="/images/plum.svg" name="plum"/>
                    <input type="image" src="/images/grape.svg" name="grape"/>
                    <input type="image" src="/images/raspberry.svg" name="raspberry"/>
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
                <img src="/images/delete.svg" alt="Delete button background"/>
                </button>
            </form>
            <img id="fon_image" src="/images/fon_bar.jpg" alt="Background image for bar"></img>
            <img src="/images/very_good_glasses.png" class="filtered" alt="Main cocktail image" id="filtered_image"></p>
            </div>
        </main>
        `
        return view
    },
    after_render: async () => {
        const recipe = new Map();
        recipe.set('Milk', 500);
        let hue_rotate = 0;
        let total_weight = 0;
        let saturate = 0;

        function getIngridientColor(name, ref) {
            return ref.child('ingridients/' + name).once('value').then(function (snapshot) {
                return Promise.resolve(snapshot.val().color);
            })
        }

        const ingridients = document.getElementsByClassName("fruit_grid")[0].children;
        for (let i = 0; i < ingridients.length; i++) {
            ingridients[i].addEventListener ("click",  event => {
                event.preventDefault();
                let curCell = event.srcElement;
                const children = curCell.parentElement.children;
                for (let i = 0; i < children.length; i++) {
                    const curChild = children[i];
                    curChild.classList.remove('selected')
                }
                curCell.classList.add('selected')
    
                const oldAddButton = document.getElementById("add_button");
                const addButton = oldAddButton.cloneNode(true);
                oldAddButton.parentNode.replaceChild(addButton, oldAddButton);
                const portion = document.getElementById("amount");
                addButton.addEventListener ("click",  e => {
                    e.preventDefault();
                    const ref = firebase.app().database().ref();
                    const add_weight = Number(portion.value);
                    if (!portion.checkValidity()) {
                        portion.reportValidity();
                        return;
                    }
                    if (curCell == null || portion.value == null || portion.value == '')
                        return;
                    const ul = document.getElementsByClassName("grid_recipe")[0];
                    const cellName = capitalizeFirstLetter(curCell.name)
                    if (recipe.has(curCell.name)) {
                        recipe[curCell.name] += add_weight;
                        for (let i = 0; i < ul.children.length; i++) {
                            const curChild = ul.children[i];
                            const parts = curChild.innerHTML.split('-');
                            if (parts[0].trim() === cellName) {
                                curChild.innerHTML = cellName + " - " + (Number(parts[1].slice(0, -1))  + add_weight) + "g";
                                break;
                            }
                        }
                    } else {
                        recipe.set(curCell.name, add_weight)
                        const li = document.createElement("li");
                        li.appendChild(document.createTextNode(cellName + " - " + portion.value + "g"));
                        ul.appendChild(li);
                    }
                    getIngridientColor(curCell.name, ref).then(function(color_angle) {
                        hue_rotate += (color_angle - hue_rotate) * (add_weight / (add_weight + total_weight));
                        saturate += (2500 - saturate) * (add_weight / (add_weight + total_weight + 500))
                        total_weight += add_weight;
                        const filtered_images = document.getElementsByClassName("filtered")
                        for (let i = 0; i < filtered_images.length; i++) {
                            filtered_images[i].style.filter = "hue-rotate(" + (Number(hue_rotate) - 30)
                                                                            + "deg) saturate(" + saturate + "%)";
                        }
                        curCell.classList.remove('selected')
                        portion.value = null;
                        curCell = null;
                    });
                });
                return false;
            });
        }

        document.getElementById("delete_button").addEventListener("click",  e => {
            event.preventDefault();
            const root = document.getElementsByClassName("grid_recipe")[0];
            recipe.clear();
            recipe.set('Milk', 500);
            hue_rotate = 0;
            total_weight = 0;
            saturate = 0;
            const filtered_images = document.getElementsByClassName("filtered")
            for (let i = 0; i < filtered_images.length; i++) {
                filtered_images[i].style.filter = "saturate(0%)";
            }
            while(root.firstChild) {
                root.removeChild(root.firstChild);
            }
            const li = document.createElement("li");
            li.appendChild(document.createTextNode("Milk - 500g"));
            root.appendChild(li);
            return false;
        })

        document.getElementById("save_button").addEventListener ("click",  e => {
            event.preventDefault();
            const builder_name = document.getElementById("builder_name");
            const builder_description = document.getElementById("builder_description");
            const name = builder_name.value;
            const description = builder_description.value;
            if (!builder_name.checkValidity() || name.length < 1) {
                openSnackbar('Name can not be empty')
                return false;
            }
            if (!builder_description.checkValidity() || description.length < 10 || description.length > 1000) {
                openSnackbar('Description must be longer then 10 and shorter then 1001')
                return false;
            }


            const db = firebase.database();
            const cocktailRef = db.ref('cocktails/' + uuidv4());
            cocktailRef.set({
                hue_rotate: hue_rotate,
                saturate: saturate,
                name: name,
                description: description,
                author: firebase.auth().currentUser.email,
                rating: -99999,
            })
            recipe.forEach(function(value, key) {
                cocktailRef.child("recipe").child(key).set(value);
            });
            window.location.href = '/';
            return true;
        })
    }

}

export default Builder;