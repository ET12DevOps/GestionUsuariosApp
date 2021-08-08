const url = window.location.protocol + "//" + window.location.host + "/";

document.addEventListener('DOMContentLoaded', () => {
  getRoles()
})

document.getElementById('save-user').addEventListener('click', postData)

function postData() {
  let rolesDiv = document.querySelectorAll('input[name^=role]')

  let rolesSelected = []

  for (var i = 0; i < rolesDiv.length; i++) {
    if (rolesDiv[i].checked)
      rolesSelected.push(rolesDiv[i].name.substring(5, rolesDiv[i].name.length))
  }

  var data = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
    email: document.getElementById('email').value,
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    enabled: document.getElementById('enabled').checked,
    roles: rolesSelected
  }

  fetch(url + 'api/users/', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      res.json()
      window.location.href = url + 'users';
    })
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response))
}

const getRoles = async () => {
  try {
    const response = await fetch(url + 'api/roles')
    const data = await response.json()
    let rolesDiv = document.getElementById('roles')
    let htmlRoles = '';
    data.forEach(role => {
      htmlRoles += `
          <div class="field">
              <input id="role_${role.id}" type="checkbox" name="role_${role.id}" class="switch">
              <label for="role_${role.id}">${role.name}</label>
          </div>
          `
    });
    rolesDiv.innerHTML = htmlRoles
  } catch (error) {
    console.error(error)
  }
}