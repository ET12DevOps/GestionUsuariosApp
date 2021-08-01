const url = window.location.protocol + "//" + window.location.host + "/";

const id = document.getElementById('roleId')
const name = document.getElementById('name')
const enabled = document.getElementById('enabled')
const saveRole = document.getElementById('save-role')

saveRole.addEventListener('click', postData)

function postData() {
    var data = {
        id: '',
        name: name.value,
        enabled: enabled.checked,
        createdAt: '',
        createdBy: '',
        updatedAt: '',
        updatedBy: ''
    }
    
    console.log(data)

    fetch(url + 'api/roles/', {
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