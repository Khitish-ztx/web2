document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault(); 

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        console.log(username);

        try {
            // Make a POST request to the backend
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json(); 
            

            
            if (data.success) {
                console.log("Login successful for:", data.username);

                
                document.querySelector('.pop').style.visibility = 'visible';
         
                

                
                document.getElementById('popbtn').addEventListener('click', function() {
                    console.log("Redirecting to sample.html");
                    window.location.href = 'sample.html';
                    document.querySelector('.pop').style.visibility = 'hidden'; 
                });
            } else {

                alert("Login failed: " + data.message);
            }
        } catch (error) {
            console.error('Error occurred:', error); 
            alert('An error occurred. Please try again.');
        }
    });
});
