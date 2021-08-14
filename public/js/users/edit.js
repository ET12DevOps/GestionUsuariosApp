var url = window.location.protocol + "//" + window.location.host + "/";

document.addEventListener('DOMContentLoaded', () => {
    getUser()
})

const getUser = async () => {
    try {
        const id = document.getElementById('userId')
        const res = await fetch(url + 'api/users/' + id.value)
        const user = await res.json()

        document.getElementById('userId').value = user.id
        document.getElementById('username').value = user.username
        document.getElementById('email').value = user.email
        document.getElementById('firstName').value = user.firstName
        document.getElementById('lastName').value = user.lastName
        document.getElementById('enabled').checked = user.enabled
        document.getElementById('createdAt').value = new Date(user.createdAt).toLocaleString('es-AR')
        document.getElementById('updatedAt').value = new Date(user.updatedAt).toLocaleString('es-AR')

        const response = await fetch(url + 'api/roles')
        const roles = await response.json()

        let rolesDiv = document.getElementById('roles')

        let htmlRoles = '';
        roles.forEach(role => {
            if (user.roles.map(x => x.id).includes(role.id)) {
                htmlRoles += `
                    <div class="field">
                        <input id="role_${role.id}" type="checkbox" name="role_${role.id}" class="switch" checked>
                        <label for="role_${role.id}">${role.name}</label>
                    </div>
                    `
            } else {
                htmlRoles += `
                    <div class="field">
                        <input id="role_${role.id}" type="checkbox" name="role_${role.id}" class="switch">
                        <label for="role_${role.id}">${role.name}</label>
                    </div>
                    `
            }
        });
        rolesDiv.innerHTML = htmlRoles
    } catch (error) {
        console.error(error)
    }
}

const saveUser = document.getElementById('save-user')

saveUser.addEventListener('click', putData)

function putData() {
    let rolesDiv = document.querySelectorAll('input[name^=role]')

    let rolesSelected = []

    for (var i = 0; i < rolesDiv.length; i++) {
        if (rolesDiv[i].checked)
            rolesSelected.push(rolesDiv[i].name.substring(5, rolesDiv[i].name.length))
    }
    var data = {
        id: document.getElementById('userId').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        enabled: document.getElementById('enabled').checked,
        roles: rolesSelected
    }

    fetch(url + 'api/users/' + document.getElementById('userId').value, {
        method: 'PUT',
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