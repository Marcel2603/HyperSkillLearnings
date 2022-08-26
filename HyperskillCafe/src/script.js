// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault()
                event.stopPropagation()
                if (form.checkValidity()) {
                    addFormToReview(form)
                    // form.reset()
                }
            })
        })
})()

function addFormToReview(form) {
    const title = form[0].value
    const comment = form[1].value
    let name = form[2].value
    if (!name) {
        name = "Anonymous"
    }
    const reviewRow = document.getElementById("reviewsRow");
    let col = document.createElement("div");
    col.classList.add("col-lg-4","col-md-6","py-3")
    let card = document.createElement("div")
    card.classList.add("card", "h-100")
    let cardBody = document.createElement("div")
    cardBody.classList.add("card-body")
    let h4 = document.createElement("h4")
    h4.classList.add("card-title")
    h4.innerText = title
    cardBody.appendChild(h4)
    let blockQuote = document.createElement("blockquote")
    blockQuote.classList.add("blockquote","mb-0")
    let p = document.createElement("p")
    p.innerText = comment
    blockQuote.appendChild(p)
    let footer = document.createElement("footer")
    footer.classList.add("blockquote-footer","text-end")
    let i = document.createElement("i")
    i.innerText = name
    footer.appendChild(i)
    blockQuote.appendChild(footer)
    cardBody.appendChild(blockQuote)
    card.appendChild(cardBody)
    col.appendChild(card)
    reviewRow.appendChild(col)
}
