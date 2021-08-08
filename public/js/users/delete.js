document.getElementById('save-user').addEventListener('click', deleteData)

function deleteData() {

    fetch(url + 'api/users/' + document.getElementById('userId').value, {
        method: 'DELETE',
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
