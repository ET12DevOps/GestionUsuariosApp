var url = window.location.protocol + "//" + window.location.host + "/";

document.addEventListener('DOMContentLoaded', () => {
    getSessions()
})

const getSessions = async () => {
    try {
        const response = await fetch(url + 'api/session')

        const data = await response.json()

        let progresBar = document.getElementById("bar")

        progresBar.style.display = "none"

        let content = document.getElementById('content')
        
        data.forEach(element => {
            var html = `<div class="box my-2">
            <div>
                <p class="subtitle is-5 has-text-weight-bold is-inline">Username:
                </p>
                ${element.username}
            </div>
            <div>
                <p class="subtitle is-5 has-text-weight-bold is-inline">IP:
                </p>
                ${element.ip}
            </div>
            <div>
                <p class="subtitle is-5 has-text-weight-bold is-inline">Date:
                </p>
                ${new Date(element.loggedAt).toLocaleString('es-AR')}
            </div>
            <div>
                <p class="subtitle is-5 has-text-weight-bold is-inline">Browser:
                </p>
                ${element.browser}
            </div>
            <div>
                <p class="subtitle is-5 has-text-weight-bold is-inline">Language:
                </p>
                ${element.language}
            </div>
            <div>
                <p class="subtitle is-5 has-text-weight-bold is-inline">Country:
                </p>
                ${element.country}
            </div>
            <div>
                <p class="subtitle is-5 has-text-weight-bold is-inline">Region:
                </p>
                ${element.region}
            </div>
        </div>`
        content.innerHTML += html

        });
        
    } catch (error) {
        console.error(error)
    }
}
