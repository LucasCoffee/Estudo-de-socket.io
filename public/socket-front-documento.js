import { atualizarTextoEditor, alertarERedirecionar } from "./documento.js"

const socket = io()

function selecionarDocumento(nome){
    socket.emit("selecionar_documento", nome, (texto) => {
        atualizarTextoEditor(texto)
    })
}
function emitirTextoEditor(dados){
    socket.emit("digitando", dados)
}

socket.on("texto_editor_clientes", (texto) => {
   atualizarTextoEditor(texto)
})

function emitirExclusaoDocumento(nome){
    socket.emit("excluir_documento", nome )
}

socket.on("excluir_documento_sucesso", (nomeDocumento) => {
    alertarERedirecionar(nomeDocumento)
})

export {emitirTextoEditor, selecionarDocumento, emitirExclusaoDocumento}