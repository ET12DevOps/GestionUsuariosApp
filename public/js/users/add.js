const url = window.location.protocol + "//" + window.location.host + "/";

document.getElementById('save-user').addEventListener('click', postData)

function postData() {
    var data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        email: document.getElementById('email').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        enabled: document.getElementById('enabled').checked
    }
    
    console.log(data)

    fetch(url + 'api/users/', {
        method: 'POST', 
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response))
}