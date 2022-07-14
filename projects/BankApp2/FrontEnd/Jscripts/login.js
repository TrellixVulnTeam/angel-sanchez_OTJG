// Checks if a user is already logged in, if yes redirect to homepage
if(principal){
    window.location.href="./index.html";
}

// Setting up event listener for login button
let loginButton = document.getElementById('submitButton');
loginButton.addEventListener('click', login);

// login function
async function login(){

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let response = await fetch(`${apiUrl}/auth`,{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'username': `${username}`,
            'password': `${password}`
        })
    });

    if(response.status == 200){
        let data = await response.json();

        /*
            persisting the User object sent back to session storage for use in other pages
            Session Storage only allows persistence of Strings so the JS Object is converted to a JSON string using JSON.stringify
         */
         sessionStorage.setItem('principal', JSON.stringify(data));
         if(data.role === "Manager"){
            window.location.href="/FrontEnd/Jscripts/manager_reim.html";
         } else{
        // redirect to the homepage on success
        window.location.href="/FrontEnd/Jscripts/new_reim.html";
         }
    } else{
        console.log('Unable to login.')
    }
}