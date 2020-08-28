document.addEventListener("DOMContentLoaded", () => {
    const newUserForm = document.querySelector(".new-user-form");
    const $userError = document.querySelector('.user-error');
    const $loginError = document.querySelector('.login-error');
    const loginForm =document.querySelector(".login-form");
   

    const userUrl = "http://localhost:3000/users/";
    const loginUrl = "http://localhost:3000/login/";



    newUserForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const newUserName = formData.get('username');
        const newUserPassword = formData.get('password')
        const newUser = {
            username: newUserName,
            password: newUserPassword
        };

        fetch(userUrl, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then(result => {
                if (result["user"].id === null) {
                    $userError.textContent = "Wrong user name or password."
                } else {
                    console.log(result["user"])
                    $userError.textContent = "Please Log In"
                }
            })
    } )

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const userName = formData.get("username");
        const userPassword = formData.get("password");
        const loginUser = {
            username: userName,
            password: userPassword
        }

        fetch(loginUrl, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(loginUser)
        })
            .then(response => {
                if(!response.ok) {
                    $loginError.textContent = "Please check your username or password"
                }
                return response.json()
            })
            .then(result => {
                $loginError.textContent = "";
                // console.log(result["user"].id)
                localStorage.setItem("token", result.token);
                localStorage.setItem("user_id", result["user"].id);
                localStorage.setItem("username", result["user"].username);
                window.location.href = "./blogPage.html"
            })

    })
})