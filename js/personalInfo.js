function openDiv() {
    document.getElementById('changePassword').style.display = 'block';
    document.getElementById('userInfo').style.display = 'none';
}

function closeDiv() {
    document.getElementById('changePassword').style.display = 'none';
    document.getElementById('userInfo').style.display = 'block';
}

function openDeleteConfirmationModel() {
    document.getElementById('deleteConfirmationModel').style.display = 'flex';
}

function closeDeleteConfirmationModel() {
    document.getElementById('deleteConfirmationModel').style.display = 'none';
}

window.onclick = function(event) {
    const model = document.getElementById('deleteConfirmationModel');
    if (event.target == model) {
        closeDeleteConfirmationModel();
    }
}




//functions for API connection
function updateDetails(event) {
    event.preventDefault();
    const form = document.getElementById('accountDetailsForm');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('/api/update-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}



function changePassword(event) {
    event.preventDefault();
    const form = document.getElementById('passwordChangeForm');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('/api/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Password changed successfully:', data);
        closePasswordModel();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


window.onclick = function(event) {
    const changing = document.getElementById('changePassword');
    if (event.target == changing) {
        changing.style.display = "none";
    }
}