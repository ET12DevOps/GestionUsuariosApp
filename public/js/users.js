var url = window.location.protocol + "//" + window.location.host + "/";

const getData = async () => {
    try {
        const response = await fetch(url + '/api/users')

        const data = await response.json()

        let table = document.getElementById('table')
        let thead = document.createElement('thead')
        let tr = document.createElement('tr');
        let th = document.createElement('th')
        let col = document.createTextNode('Username');
        th.appendChild(col)
        tr.appendChild(th)
        th = document.createElement('th')
        col = document.createTextNode('Email');
        th.appendChild(col)
        th.classList.add('py-3')
        tr.appendChild(th)
        th = document.createElement('th')
        col = document.createTextNode('FirstName');
        th.appendChild(col)
        tr.appendChild(th)
        th = document.createElement('th')
        col = document.createTextNode('LastName');
        th.appendChild(col)
        tr.appendChild(th)
        th = document.createElement('th')
        col = document.createTextNode('Enabled');
        th.appendChild(col)
        tr.appendChild(th)
        th = document.createElement('th')
        col = document.createTextNode('CreatedAt');
        th.appendChild(col)
        tr.appendChild(th)
        th = document.createElement('th')
        col = document.createTextNode('UpdatedAt');
        th.appendChild(col)
        tr.appendChild(th)
        th = document.createElement('th')
        col = document.createTextNode('Actions');
        th.appendChild(col)

        tr.classList.add('bg-gray-300')
        tr.classList.add('border')
        tr.appendChild(th)

        thead.appendChild(tr)

        table.appendChild(thead)

        let tbody = document.createElement('tbody')

        var columns = ['username', 'email', 'firstName', 'lastName', 'enabled', 'createdAt', 'updatedAt']

        for (var x in data) {
            tr = document.createElement('tr')
            tr.classList.add('hover:bg-gray-100')
            tr.classList.add('border')
            for (var i = 0; i < columns.length; i++) {
                var td = document.createElement('td')
                var celldata = data[x][columns[i]]
                if (columns[i] === 'createdAt' || columns[i] === 'updatedAt') {
                    var d = new Date(celldata);
                    celldata = d.toLocaleDateString('en-GB') + '' + d.toLocaleTimeString('en-GB');
                }
                var cellContent = document.createTextNode(celldata)
                td.appendChild(cellContent)
                td.classList.add('text-center')
                td.classList.add('py-3')
                tr.appendChild(td)
            }

            var td = document.createElement('td')
            td.classList.add('text-center')
            var actions = document.createElement('div')
            //actions.classList.add('text-center')

            actions.innerHTML += `<a href="/users/${data[x]['id']}" id="edit-${data[x]['id']}" class="pr-2"><svg xmlns="http://www.w3.org/2000/svg" width="25" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
               </svg></a>`

            actions.innerHTML += `<a href="/users/${data[x]['id']}" id="delete-${data[x]['id']}"><svg xmlns="http://www.w3.org/2000/svg" width="25" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg></a>`
            td.appendChild(actions)
            tr.appendChild(td)

            tbody.appendChild(tr)
        }

        table.appendChild(tbody)

    } catch (error) {
        console.error(error)
    }
}

getData()