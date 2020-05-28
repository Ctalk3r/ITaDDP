let Login = {
    render: async () => {
        let view =  /*html*/`
        <main>
            <form method="post" class="sign_form">
                <label for="login"><b>Login</b></label>
                <input type="text" placeholder="Enter Login" id="login" name="login" required>
            
                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" id="psw" name="psw" required>
            
                <button type="submit" id="login_button">Sign In</button>
            </form>
        </main>
        `
        return view
    },
    after_render: async () => {
        document.getElementById("login_button").addEventListener ("click",  e => {
            event.preventDefault();
            let login       = document.getElementById("login");
            let pass        = document.getElementById("psw");
            if (login.value =='' | pass.value == '') {
                alert (`The fields cannot be empty`)
            } 
            else {
                firebase.auth().signInWithEmailAndPassword(login.value, pass.value)
                .then(function(firebaseUser) {
                    alert(`User with login ${login.value} entered`)
                    window.location.href = '/';
                })
                .catch(e => alert(e.message));
            }    
        })
     }

}

export default Login;