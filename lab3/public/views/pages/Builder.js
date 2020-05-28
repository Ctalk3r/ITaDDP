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
                <img id="coctail_model" src="coctail_model.jpg" alt="Coctail model"></img>
                <div id="choose_block" class="row">
                <div class="fruit_grid">
                    <input type="image" src="peach.svg" id="first" onclick="chooseFruit();"/>
                    <input type="image" src="apple.svg" />
                    <input type="image" src="melon.svg" />
                    <input type="image" src="peach.svg" />
                    <input type="image" src="apple.svg" />
                    <input type="image" src="melon.svg" />
                    <input type="image" src="peach.svg" />
                    <input type="image" src="apple.svg" />
                    <input type="image" src="melon.svg" />
                    <input type="image" src="peach.svg" />
                    <input type="image" src="apple.svg" />
                    <input type="image" src="melon.svg" />
                </div>
                <p class="crossed">&nbsp;</p>
                <div class="column">
                    <button id="save_button">Save</button>
                    <label for="amount"><b>Amount, g</b></label>
                    <input type="text" maxlength="3" name="amount">
                    <button>Add</button>
                </div>
                </div>
                <p class="recipe_title"><b><i>Recipe:</i></b></p>
                <ul class="grid_recipe">
                <li>Cucumber - 200g</li>
                <li>Potato - 250g</li>
                <li>Apple - 50g</li>
                <li>Melon - 200g</li>
                <li>Maple - 300g</li>
                <li>Cucumber - 200g</li>
                <li>Potato - 250g</li>
                <li>Apple - 50g</li>
                <li>Melon - 200g</li>
                <li>Maple - 300g</li>
                <li>Cucumber - 200g</li>
                <li>Potato - 250g</li>
                <li>Apple - 50g</li>
                <li>Melon - 200g</li>
                <li>Maple - 300g</li>
                <li>Cucumber - 200g</li>
                <li>Potato - 250g</li>
                <li>Apple - 50g</li>
                <li>Melon - 200g</li>
                <li>Maple - 300g</li>
                <li>Cucumber - 200g</li>
                <li>Potato - 250g</li>
                <li>Apple - 50g</li>
                <li>Melon - 200g</li>
                <li>Maple - 300g</li>
                <li>Cucumber - 200g</li>
                <li>Potato - 250g</li>
                <li>Apple - 50g</li>
                <li>Melon - 200g</li>
                <li>Maple - 300g</li>
                <li>Cucumber - 200g</li>
                <li>Potato - 250g</li>
                <li>Apple - 50g</li>
                <li>Melon - 200g</li>
                <li>Maple - 300g</li>
                <li>Cucumber - 200g</li>
                <li>Potato - 250g</li>
                <li>Apple - 50g</li>
                <li>Melon - 200g</li>
                <li>Maple - 300g</li>
                </ul>
                <div id="review_block" class="column">
                <label for="builder_name"><b>Name</b></label>
                <input id="builder_name" type="text">
                <label for="builder_description"><b>Description</b></label>
                <textarea id="builder_description" rows="7" cols="35"></textarea>
                </div>
                <button id="delete_button">
                <img src="delete.svg" alt="Delete button background"/>
                </button>
            </form>
            <img id="fon_image" src="fon_bar.jpg" alt="Background image for bar"></img>
            </div>
        </main>
        `
        return view
    },
    after_render: async () => { }

}

export default Builder;