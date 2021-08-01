var url = window.location.protocol + "//" + window.location.host + "/";

document.addEventListener('DOMContentLoaded', () => {
    getData()
})

const getData = async () => {
    try {
        const response = await fetch(url + 'api/roles')

        const userData = await response.json()

        let progresBar = document.getElementById("bar")

        progresBar.style.display = "none"
        
        const datatable = new simpleDatatables.DataTable("#roles_datatable", {
            searchable: true,
            paging: true,
            data: {
                headings: ['IDENTIFICADOR', 'NOMBRE', 'ESTADO', 'CREACION', 'createdBy', 'ACTUALIZACION', 'updatedBy', 'ACCIONES'],
                data: userData.map((x) => {
                    var res = Object.values(x)
                    res.push('')
                    return res
                })
            },
            columns: [
                { select: 0, sortable: false },
                { select: 1 },
                { select: 2, render: function(data, cell, row) {
                    if (data === 'true')
                        return `<span class="tag is-success is-light">Activo</span>`
                    else 
                        return `<span class="tag is-danger is-light">Inactivo</span>`
                }},
                { select: 3, type: "date", render: function(data, cell, row){
                    return new Date(data).toLocaleString('es-AR')
                }},
                { select: 4, hidden: true },
                { select: 5, render: function(data, cell, row){
                    return new Date(data).toLocaleString('es-AR')
                } },
                { select: 6, hidden: true },
                { select: 7, sortable: false, render: function(data, cell, row){ 
                    var editButton = `<a href="/roles/${userData[row.dataIndex].id}/edit" id="edit-${userData[row.dataIndex].id}" class="mr-2 button is-small is-rounded is-primary is-light"><i class="las la-pen la-2x"></i></a>`
                    
                    var deleteButton = `<a href="/roles/${userData[row.dataIndex].id}/delete" id="delete-${userData[row.dataIndex].id}" class="button is-small is-rounded is-danger is-light"><i class="las la-trash-alt la-2x"></a>`

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


