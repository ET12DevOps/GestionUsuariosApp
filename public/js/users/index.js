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
                headings: ['USUARIO', 'EMAIL', 'NOMBRE', 'APELLIDO', 'ESTADO', 'CREACION', 'createdBy', 'ACTUALIZACION', 'updatedBy', 'ACCIONES'],
                data: userData.map((x) => {
                    var res = Object.values(x)
                    res.shift()
                    res.push('')
                    return res
                })
            },
            columns: [
                { select: 0 },
                { select: 1 },
                { select: 2 },
                { select: 3 },
                {
                    select: 4, render: function (data, cell, row) {
                        if (data === 'true')
                            return `<span class="tag is-success is-light">Activo</span>`
                        else
                            return `<span class="tag is-danger is-light">Inactivo</span>`
                    }
                },
                {
                    select: 5, render: function (data, cell, row) {
                        return new Date(data).toLocaleString('es-AR')
                    }
                },
                { select: 6, hidden: true },
                {
                    select: 7, render: function (data, cell, row) {
                        return new Date(data).toLocaleString('es-AR')
                    }
                },
                { select: 8, hidden: true },
                {
                    select: 9, sortable: false, render: function (data, cell, row) {
                        var editButton = `<a href="/users/${userData[row.dataIndex].id}/edit" id="edit-${userData[row.dataIndex].id}" class="mr-4 has-text-info"><i class="fad fa-pencil"></i></a>`

                        var deleteButton = `<a href="/users/${userData[row.dataIndex].id}/delete" id="delete-${userData[row.dataIndex].id}" class="has-text-danger"><i class="fad fa-trash-alt"></i></a>`

                        return '<div class="has-text-centered"> ' + editButton + deleteButton + '</div>';
                    }
                }
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

    document.getElementById('id_edit').value = data.id
    document.getElementById('user_edit').value = data.username
    document.getElementById('email_edit').value = data.email
    document.getElementById('firstName_edit').value = data.firstName
    document.getElementById('lastName_edit').value = data.lastName
    document.getElementById('enabled').enabled.checked = data.enabled
    document.getElementById('createdAt_edit').value = new Date(data.createdAt).toLocaleString('es-AR')
    document.getElementById('updatedAt_edit').value = new Date(data.updatedAt).toLocaleString('es-AR')
}