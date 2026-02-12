import { emitirTextoEditor, selecionarDocumento, emitirExclusaoDocumento} from "./socket-front-documento.js"

const parametros = new URLSearchParams(window.location.search)
const nomeDocumento = parametros.get("nome") // nome do parametro na url

const tituloDocumento = document.getElementById("titulo-documento")
const textArea = document.getElementById("editor-texto")
const botao_deletar = document.getElementById("excluir-documento")

tituloDocumento.textContent = nomeDocumento || "Nome do documento nao foi definido"

selecionarDocumento(nomeDocumento) // chama funcao no outro arquivo passando o nome

textArea.addEventListener("keyup", () => {
   emitirTextoEditor({
    texto: textArea.value, 
    nomeDocumento})
})

botao_deletar.addEventListener("click", () => {
    emitirExclusaoDocumento(nomeDocumento)
})

function alertarERedirecionar(nome){
    console.log(nome, nomeDocumento)
    if(nome == nomeDocumento){
        alert(`Documento ${nome} foi excluido`)
        window.location.href = "/"
    }
    
}

function atualizarTextoEditor(texto){
    textArea.value = texto
}

export {atualizarTextoEditor, alertarERedirecionar}