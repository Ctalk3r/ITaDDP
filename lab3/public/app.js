"use strict";

import Home         from './views/pages/Home.js'
import Error403     from './views/pages/Error403.js'
import Error404     from './views/pages/Error404.js'
import Register     from './views/pages/Register.js'
import Login        from './views/pages/Login.js'
import Cocktail     from './views/pages/Cocktail.js'
import Builder      from './views/pages/Builder.js'

import Navbar       from './views/components/Navbar.js'

import Utils        from './utils/Utils.js'

var config = {
    apiKey: "AIzaSyB-VfKVQJOFfgJ8b2hxEjAFcmbCszrAyKk",
    authDomain: "coctail-maker.firebaseapp.com",
    databaseURL: "https://coctail-maker.firebaseio.com",
    storageBucket: "coctail-maker.appspot.com",
};

try {
    firebase.initializeApp(config);
}
catch (error) {
    alert(error);
}

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/'                 : Home
    , '/register'       : Register
    , '/login'          : Login
    , '/cocktail/:id'   : Cocktail
    , '/builder'        : Builder
    , '/error403'       : Error403
};


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();

    let request = Utils.parseRequestURL()

    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '')
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();
  
}

window.addEventListener('hashchange', router);

window.addEventListener('load', router);
