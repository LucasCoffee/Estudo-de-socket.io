import { inserirLinkDocumento, removerLinkDocumento} from "./index.js";

const socket = io();

socket.emit("obter_documentos", (documentos) => {
   documentos.forEach(documento => {
       inserirLinkDocumento(documento.nome);
   });
});

socket.on("adicionar_documento_interface", (nomeDocumento) =>{
    inserirLinkDocumento(nomeDocumento)
})

socket.on("documento_existente", (nomeDocumento) => {
    window.alert(`O documento ${nomeDocumento} já existe`)
})

function emitirAdicionarDocumento(nomeDocumento){
    socket.emit("adicionar_documento", nomeDocumento)
}

socket.on("excluir_documento_sucesso", (nomeDocumento) => {
    removerLinkDocumento(nomeDocumento)
})


export {emitirAdicionarDocumento}