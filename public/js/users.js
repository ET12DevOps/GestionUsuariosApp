var url = window.location.protocol + "//" + window.location.host + "/";

const getData = async () => {
    try {
        const response = await fetch(url + 'api/users')

        const userData = await response.json()

        let progresBar = document.getElementById("bar")

        progresBar.style.display = "none"
        
        const datatable = new simpleDatatables.DataTable("#users_datatable", {
            searchable: true,
            paging: true,
            data: {
                headings: ['IDENTIFICADOR', 'USUARIO', 'password', 'EMAIL', 'NOMBRE', 'APELLIDO', 'ESTADO', 'CREACION', 'createdBy', 'updatedAt', 'updatedBy', 'ACCIONES'],
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
                { select: 7, type: "date", format: "DD/MM/YYYY"},
                { select: 8, hidden: true },
                { select: 9, hidden: true  },
                { select: 10, hidden: true },
                { select: 11, sortable: false, render: function(data, cell, row){ 
                    var editButton = `<a href="/users/${userData[row.dataIndex].id}" id="edit-${userData[row.dataIndex].id}" class="pr-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                     </svg></a>`
                    
                    var deleteButton = `<a href="/users/${userData[row.dataIndex].id}" id="delete-${userData[row.dataIndex].id}"><svg xmlns="http://www.w3.org/2000/svg" width="20" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg></a>`

                    return '<div class="has-text-centered"> ' + editButton + deleteButton + '</div>';
                }}
            ],
            labels: {
                placeholder: "Buscar..",
                perPage: "{select} resultados",
                noRows: "Sin resultados",
                info: "Mostrando {start} a {end} de {rows} resultados (Página {page} de {pages})"
            }
        });     

    } catch (error) {
        console.error(error)
    }
}

getData()
