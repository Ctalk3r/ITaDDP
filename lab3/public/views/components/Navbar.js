let Navbar = {
    render: async () => {
        let view =  /*html*/`
      <header>
        <img id="logo_image" src="coctail-logo.png" alt="Cocktail logo"/>
        <h1><a href="https://coctail-maker.firebaseapp.com/">Milk Cocktail Maker</a></h1>
        <button id="menu_button" onclick="expandMenu()"><img src="menu.svg" alt="menu"/></button>
        <div class="menu_extended hidden one_column" id="menu_ext">
          <form class="search-form hide">
            <div class="select_for_search">
              <select>
                <option selected value="Cocktail">Cocktail</option>
                <option value="User">User</option>
                <option value="Ingridient">Ingridient</option>
              </select>
            </div>
            <input type="search" placeholder="&#xf002; Search..." id="search">
          </form>
          <nav>
            <div class="nav-container hide" id="auth_nav">
              <a href="https://coctail-maker.firebaseapp.com/#/builder">Add Cocktail</a>
              <a href="#" onclick="return signOut();" id="logout">Sign Out</a>
            </div>
            <div class="nav-container" id="not_auth_nav">
              <a href="https://coctail-maker.firebaseapp.com/#/register">Sign Up</a>
              <a href="https://coctail-maker.firebaseapp.com/#/login">Sign In</a>
            </div>
          <nav>
          <img id="profile_image" class="hide" src="profile.svg" alt="Profile image"/>
        </div>
      </header>
        `
        return view
    },
    after_render: async () => {
        let profileImage = document.getElementById("profile_image")
        let auth_nav = document.getElementById("auth_nav")
        let not_auth_nav = document.getElementById("not_auth_nav")
        let search_form = document.getElementsByClassName("search-form")[0]
        let menu_ext = document.getElementById("menu_ext")
        firebase.auth().onAuthStateChanged(firebaseUser => {
          if (firebaseUser) {
            profileImage.classList.remove('hide')
            auth_nav.classList.remove('hide')
            search_form.classList.remove('hide')
            not_auth_nav.classList.add('hide')
            menu_ext.classList.remove('one_column')
          } else {
            profileImage.classList.add('hide')
            auth_nav.classList.add('hide')
            search_form.classList.add('hide')
            not_auth_nav.classList.remove('hide')
            menu_ext.classList.add('one_column')
          }
        });

     }

}

export default Navbar;