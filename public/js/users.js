var url = window.location.protocol + "//" + window.location.host + "/";

let datatable;

const getData = async () => {
    try {
        const response = await fetch(url + 'api/users')

        const userData = await response.json()

        console.log(userData)

        datatable = new simpleDatatables.DataTable("#users_datatable", {
            searchable: true,
            paging: true,
            data: {
                headings: ['id', 'username', 'password', 'email', 'firstName', 'lastName', 'enabled', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy'],
                data: userData
            }
        });     

    } catch (error) {
        console.error(error)
    }
}

getData()
