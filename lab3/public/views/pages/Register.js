import {openSnackbar} from '../../utils/Utils.js'

let Register = {

    render: async () => {
        return /*html*/ `
        <main>
            <form method="post" class="sign_form">
                <label for="login"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" id="login" name="login" required>
            
                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" id="psw" name="psw" required>
        
                <label for="rpt_psw"><b>Repeat Password</b></label>
                <input type="password" placeholder="Repeat Password" id="rpt_psw" name="rpt_psw" required>
            
                <button id="register_button" type="submit">Sign Up</button>
            </form>
        </main>
        `
    }
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    , after_render: async () => {
        document.getElementById("register_button").addEventListener ("click",  e => {
            event.preventDefault();
            let login       = document.getElementById("login");
            let pass        = document.getElementById("psw");
            let repeatPass  = document.getElementById("rpt_psw");
            if (pass.value != repeatPass.value) {
                openSnackbar (`The passwords don't match`)
            } else if (login.value =='' | pass.value == '' | repeatPass == '') {
                openSnackbar (`The fields cannot be empty`)
            } 
            else {
                firebase.auth().createUserWithEmailAndPassword(login.value, pass.value)
                .then(function(firebaseUser) {
                    window.location.href = '/#/login';
                })
                .catch(e => openSnackbar(e.message));
            }    
        })
    }
}

export default Register;