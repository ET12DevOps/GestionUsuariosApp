var url = window.location.protocol + "//" + window.location.host + "/";

document.addEventListener('DOMContentLoaded', () => {
    getUsers()
})

const getUsers = async () => {
    try {
        const response = await fetch(url + 'api/users')

        const userData = await response.json()

        let progresBar = document.getElementById("bar")

        progresBar.style.display = "none"
        
        const datatable = new simpleDatatables.DataTable("#users_datatable", {
            searchable: true,
            paging: true,
            data: {
                headings: ['IDENTIFICADOR', 'USUARIO', 'password', 'EMAIL', 'NOMBRE', 'APELLIDO', 'ESTADO', 'CREACION', 'createdBy', 'ACTUALIZACION', 'updatedBy', 'ACCIONES'],
                data: userData.map((x) => {
                    var res = Object.values(x)
                    res.push('')
                    return res
                })
            },
            columns: [
                { select: 0, sortable: false },
                { select: 1 },
                { select: 2, hidden: true },
                { select: 3 },
                { select: 4 },
                { select: 5 },
                { select: 6, render: function(data, cell, row) {
                    if (data === 'true')
                        return `<span class="tag is-success is-light">Activo</span>`
                    else 
                        return `<span class="tag is-danger is-light">Inactivo</span>`
                }},
                { select: 7, render: function(data, cell, row){
                    return new Date(data).toLocaleString('es-AR')
                }},
                { select: 8, hidden: true },
                { select: 9, render: function(data, cell, row){
                    return new Date(data).toLocaleString('es-AR')
                }},
                { select: 10, hidden: true },
                { select: 11, sortable: false, render: function(data, cell, row){ 
                    var editButton = `<a href="/users/${userData[row.dataIndex].id}/edit" id="edit-${userData[row.dataIndex].id}" class="mr-2 button is-small is-rounded is-primary is-light""><i class="las la-pen la-2x"></i></a>`
                    
                    var deleteButton = `<a href="/users/${userData[row.dataIndex].id}/delete" id="delete-${userData[row.dataIndex].id}" class="button is-small is-rounded is-danger is-light"><i class="las la-trash-alt la-2x"></i></a>`

                    return '<div class="has-text-centered"> ' + editButton + deleteButton + '</div>';
                }}
            ],
            labels: {
                placeholder: "Buscar..",
                perPage: "{select}",
                noRows: "Sin resultados",
                info: "Mostrando {start} a {end} de {rows} resultados (Página {page} de {pages})"
            }
        });    
        
        const buscar = document.getElementsByClassName('dataTable-input')        
        buscar[0].classList.add('input')
        buscar[0].classList.add('is-primary')

        const selector = document.getElementsByClassName('dataTable-dropdown')
        selector[0].classList.add('select')
        selector[0].classList.add('is-primary')

    } catch (error) {
        console.error(error)
    }
}

const getUser = async () => {
    const id = document.getElementById('userId_edit')

    const res = await fetch(url + 'api/users/' + id.value)
    const data = await res.json()
    console.log(data)
    document.getElementById('id_edit').value = data.id
    document.getElementById('user_edit').value = data.username
    document.getElementById('email_edit').value = data.email
    document.getElementById('firstName_edit').value = data.firstName
    document.getElementById('lastName_edit').value = data.lastName
    document.getElementById('enabled').enabled.checked = data.enabled 
    document.getElementById('createdAt_edit').value = new Date(data.createdAt).toLocaleString('es-AR')
    document.getElementById('updatedAt_edit').value = new Date(data.updatedAt).toLocaleString('es-AR')
}