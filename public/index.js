const socket = io()

const listaDocumentos = document.querySelector("#lista-documentos")
const form = document.querySelector("#form-adiciona-documento")
const inputDocumento = document.querySelector("#input-documento")


function inserirLinkDocumento(nomeDocumento) {

    const link = document.createElement("a")

    link.href = `documento.html?nome=${encodeURIComponent(nomeDocumento)}`
    link.textContent = nomeDocumento

    link.classList.add(
        "list-group-item",
        "list-group-item-action"
    )

    listaDocumentos.appendChild(link)
}


function removerLinkDocumento(nomeDocumento) {

    const links = listaDocumentos.querySelectorAll("a")

    links.forEach(link => {

        if (link.textContent === nomeDocumento) {
            link.remove()
        }

    })

}


socket.emit("obter_documentos", (documentos) => {

    documentos.forEach(documento => {

        inserirLinkDocumento(documento.nome)

    })

})


socket.on("adicionar_documento_interface", (nomeDocumento) => {

    inserirLinkDocumento(nomeDocumento)

})


socket.on("documento_existente", (nomeDocumento) => {

    window.alert(
        `O documento ${nomeDocumento} já existe`
    )

})


form.addEventListener("submit", (evento) => {

    evento.preventDefault()

    const nomeDocumento = inputDocumento.value.trim()

    if (!nomeDocumento) {
        return
    }

    socket.emit(
        "adicionar_documento",
        nomeDocumento
    )

    inputDocumento.value = ""

})


socket.on("excluir_documento_sucesso", (nomeDocumento) => {

    removerLinkDocumento(nomeDocumento)

})


export {
    inserirLinkDocumento,
    removerLinkDocumento
}