import {
    atualizarAreaMensagem,
    alertarERedirecionar, 
    carregarHistoricoMensagens
} from "./documento.js"

const socket = io()

function selecionarDocumento(nome) {

    socket.emit("selecionar_documento", nome,
        (mensagens) => {
            carregarHistoricoMensagens(mensagens)
        }
    )
}

function enviarMensagem(nomeDocumento, mensagem) {
    socket.emit("receber_mensagem", {nomeDocumento, mensagem} )
}

socket.on("devolver_mensagem", (texto) => {
    atualizarAreaMensagem(texto)
})

function emitirExclusaoDocumento(nome) {
    socket.emit("excluir_documento",nome)
}

socket.on("excluir_documento_sucesso", (nomeDocumento) => {

    alertarERedirecionar(nomeDocumento)

})

export {
    selecionarDocumento,
    emitirExclusaoDocumento,
    enviarMensagem
}