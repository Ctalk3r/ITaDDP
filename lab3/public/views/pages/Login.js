import {openSnackbar} from '../../utils/Utils.js'

let Login = {
    render: async () => {
        let view =  /*html*/`
        <main>
            <form method="post" class="sign_form">
                <label for="login"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" id="login" name="login" required>
            
                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" id="psw" name="psw" required>
            
                <button type="submit" id="login_button">Sign In</button>
            </form>
        </main>
        `
        return view
    },
    after_render: async () => {
        // const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
        document.getElementById("login_button").addEventListener ("click",  e => {
            event.preventDefault();
            let login       = document.getElementById("login");
            let pass        = document.getElementById("psw");
            if (login.value =='' | pass.value == '') {
                openSnackbar(`The fields cannot be empty`)
            } 
            else {
                firebase.auth().signInWithEmailAndPassword(login.value, pass.value)
                .then(function(firebaseUser) {
                    window.location.href = '/';
                })
                .catch(e => openSnackbar(e.message));
            }    
        })
     }

}

export default Login;