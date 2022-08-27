let history = []
let formValues = {}

function initLoad() {
    let form = document.querySelector("form");
    form.addEventListener('submit', function (event) {
        event.preventDefault()
        event.stopPropagation()
        onSubmit()
    })
    _fillForm()
    initTimer(() => {
        const newValues = _readLocalStorage()
        if (JSON.stringify(formValues) !== JSON.stringify(newValues)) {
            _fillForm()
        }
    })
}

function onChangeNew(obj) {
    _updateItemInLocalStorage(obj.id, obj.value)
}

function addSubmitToStore(value) {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(value)
    localStorage.setItem("history", JSON.stringify(history))
}

function onSubmit() {
    let value = _readForm()
    addSubmitToStore(value)
    _deleteStore()
    formValues = {}
    document.querySelector("form").reset()
    document.querySelectorAll("input").forEach(
        input => input.value = ""
    )
}

function initHistory() {
    loadHistory()
    initTimer(() => {
        const newHistory = localStorage.getItem("history");
        if (JSON.stringify(history) !== newHistory) {
            loadHistory()
        }
    })
}

function initTimer(callback) {
    return setInterval(callback, 100)
}

function onCardDelete(btn) {
    const div = btn.parentElement
    let firstName = div.querySelector(".card-first-name").textContent;
    let lastName = div.querySelector(".card-last-name").textContent;
    let email = div.querySelector(".card-email").textContent;
    let phone = div.querySelector(".card-phone").textContent;
    let company = div.querySelector(".card-company").textContent;
    let address = div.querySelector(".card-address").textContent;
    history = JSON.parse(localStorage.getItem("history")) || [];
    history = history.filter(
        obj => !(obj.firstName === firstName &&
            obj.lastName === lastName &&
            obj.email === email &&
            obj.phone === phone &&
            obj.company === company &&
            obj.address === address
        ))
    localStorage.setItem("history", JSON.stringify(history))
    div.remove()
}


function loadHistory() {
    history = JSON.parse(localStorage.getItem("history")) || [];
    for (let element of document.getElementsByClassName("submit-history-card")) {
        element.remove()
    }
    history.forEach(obj => {
        let div = document.createElement("div")
        div.classList.add("submit-history-card")
        div.innerHTML = `
    <p class="card-first-name">${obj.firstName}</p>
    <p class="card-last-name">${obj.lastName}</p>
    <p class="card-email">${obj.email}</p>
    <p class="card-phone">${obj.phone}</p>
    <p class="card-company">${obj.company}</p>
    <p class="card-address">${obj.address}</p>
    <button class="delete-button" onclick="onCardDelete(this)">Delete</button>`
        document.body.insertAdjacentElement('beforeend', div);
    })

}

function _readLocalStorage() {
    const firstName = _getItemFromLocalStorage("first-name");
    const lastName = _getItemFromLocalStorage("last-name");
    const email = _getItemFromLocalStorage("email");
    const phone = _getItemFromLocalStorage("phone");
    const company = _getItemFromLocalStorage("company");
    const address = _getItemFromLocalStorage("address");
    return {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        company: company,
        address: address
    }
}

function _getItemFromLocalStorage(key) {
    return localStorage.getItem(key) || "";
}

function _updateItemInLocalStorage(key, value) {
    localStorage.setItem(key, value)
}

function _deleteStore() {
    localStorage.removeItem("first-name")
    localStorage.removeItem("last-name")
    localStorage.removeItem("email")
    localStorage.removeItem("phone")
    localStorage.removeItem("company")
    localStorage.removeItem("address")
}

function _readForm() {
    return {
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        company: document.getElementById("company").value,
        address: document.getElementById("address").value
    }
}

function _fillForm() {
    formValues = _readLocalStorage()
    document.getElementById("first-name").value = formValues.firstName
    document.getElementById("last-name").value = formValues.lastName
    document.getElementById("email").value = formValues.email
    document.getElementById("phone").value = formValues.phone
    document.getElementById("company").value = formValues.company
    document.getElementById("address").value = formValues.address
}
