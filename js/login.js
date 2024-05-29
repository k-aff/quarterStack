document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    // Add event listener for form submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Perform any login/authentication logic here

        // Redirect to the intro page after login
        window.location.href = 'intro.html'; // Change 'intro.html' to the path of your intro page
    });
});
