let Builder = {
    render: async () => {
        // firebase.auth().onAuthStateChanged(function(user) {
        //     if (user == null) {
        //         window.location.href = '/#/Error404';
        //     }
        //   });
        let view =  /*html*/`
        <main>
            <div class="row">
            <form id="builder_form">
                <img id="coctail_model" class="filtered" src="very_good_glasses.png" alt="Coctail model"></img>
                <div id="choose_block" class="row">
                <div class="fruit_grid">
                    <input type="image" src="tomato.svg" name="tomato" onclick="chooseIngridient();"/>
                    <input type="image" src="orange.svg" name="orange" onclick="chooseIngridient();"/>
                    <input type="image" src="lemon.svg" name="lemon" onclick="chooseIngridient();"/>
                    <input type="image" src="lime.svg" name="lime" onclick="chooseIngridient();"/>
                    <input type="image" src="kiwi.svg" name="kiwi" onclick="chooseIngridient();"/>
                    <input type="image" src="mint.svg" name="mint" onclick="chooseIngridient();"/>
                    <input type="image" src="cyan_java_banana.svg" name="cyan_java_banana" onclick="chooseIngridient();"/>
                    <input type="image" src="blueberry.svg" name="blueberry" onclick="chooseIngridient();"/>
                    <input type="image" src="blackberry.svg" name="blackberry" onclick="chooseIngridient();"/>
                    <input type="image" src="plum.svg" name="plum" onclick="chooseIngridient();"/>
                    <input type="image" src="grape.svg" name="grape" onclick="chooseIngridient();"/>
                    <input type="image" src="raspberry.svg" name="raspberry" onclick="chooseIngridient();"/>
                </div>
                <p class="crossed">&nbsp;</p>
                <div class="column">
                    <button id="save_button">Save</button>
                    <label for="amount"><b>Amount, g</b></label>
                    <input type="number" min="1" max="999" id="amount">
                    <button id="add_button">Add</button>
                </div>
                </div>
                <p class="recipe_title"><b><i>Recipe:</i></b></p>
                <ul class="grid_recipe">
                </ul>
                <div id="review_block" class="column">
                <label for="builder_name"><b>Name</b></label>
                <input id="builder_name" type="text" required>
                <label for="builder_description"><b>Description</b></label>
                <textarea id="builder_description" rows="7" cols="35" required></textarea>
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
        document.getElementById("delete_button").addEventListener ("click",  e => {
            event.preventDefault();
            var root = document.getElementsByClassName("grid_recipe")[0];
            recipe.clear();
            document.getElementById("filtered_image").style.filter = "saturate(100%)";
            while(root.firstChild) {
                root.removeChild(root.firstChild);
            }
            return false;
        })
    }

}

export default Builder;