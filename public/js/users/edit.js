var url = window.location.protocol + "//" + window.location.host + "/";

document.addEventListener('DOMContentLoaded', () => {
    getUser()
})

const getUser = async () => {
    const id = document.getElementById('userId')

    const res = await fetch(url + 'api/users/' + id.value)
    const data = await res.json()
    console.log(data)
    document.getElementById('userId').value = data.id
    document.getElementById('username').value = data.username
    document.getElementById('email').value = data.email
    document.getElementById('firstName').value = data.firstName
    document.getElementById('lastName').value = data.lastName
    document.getElementById('enabled').checked = data.enabled 
    document.getElementById('createdAt').value = new Date(data.createdAt).toLocaleString('es-AR')
    document.getElementById('updatedAt').value = new Date(data.updatedAt).toLocaleString('es-AR')
}

const saveUser = document.getElementById('save-user')

saveUser.addEventListener('click', putData)

function putData() {
    var data = {
        id: document.getElementById('userId').value,
        username: document.getElementById('username').value,        
        email: document.getElementById('email').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        enabled: document.getElementById('enabled').checked        
    }
    
    console.log(data)

    fetch(url + 'api/users/' + document.getElementById('userId').value, {
        method: 'PUT', 
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response))
}