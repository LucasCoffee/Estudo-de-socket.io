import {selecionarDocumento, emitirExclusaoDocumento, enviarMensagem} from "./socket-front-documento.js"

const nomeDocumento = new URLSearchParams(window.location.search).get("nome") // nome do parametro na url

const tituloDocumento = document.getElementById("titulo-documento")
const inputMensagem = document.getElementById("input-mensagem")
const botao_enviar = document.getElementById("enviar-mensagem")
const botao_deletar = document.getElementById("excluir-documento")
const area_mensagens = document.getElementById("area-mensagens")

tituloDocumento.textContent = nomeDocumento || "Documento sem título"

botao_enviar.addEventListener("click", () => {
    const mensagem = inputMensagem.value
    inputMensagem.value = ""
    enviarMensagem(nomeDocumento, mensagem)
})

botao_deletar.addEventListener("click", () => {
    emitirExclusaoDocumento(nomeDocumento)
})

selecionarDocumento(nomeDocumento)

function alertarERedirecionar(nome){
    if(nome == nomeDocumento){
        alert(`Documento ${nome} foi excluido`)
        window.location.href = "/"
    }
    
}

function atualizarAreaMensagem(mensagem){
    
    const paragrafo = document.createElement("p")
    paragrafo.classList.add("bg-light", "p-2", "rounded", "mb-2")
    paragrafo.textContent = mensagem

    area_mensagens.appendChild(paragrafo)
}

function carregarHistoricoMensagens(mensagens){
    if(Array.isArray(mensagens)){
        mensagens.forEach((mensagem) => atualizarAreaMensagem(mensagem))
    }
}

export {atualizarAreaMensagem, alertarERedirecionar, carregarHistoricoMensagens}