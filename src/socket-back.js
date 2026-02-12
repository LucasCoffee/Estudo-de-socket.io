import io from "./index.js"
import { atualizaDocumento, encontrarDocumentos, obterDocumentos, adicionarDocumento, excluirDocumento} from "./documentosDb.js";
io.on("connection", (socket) => {

  socket.on("obter_documentos", async (devolverDocumentos) => {
    const documentos = await obterDocumentos()
    devolverDocumentos(documentos)
  })

  socket.on("adicionar_documento", async (nomeDocumento) => {

    const documentoExite = (await encontrarDocumentos(nomeDocumento)) !== null;

    if(documentoExite){
      socket.emit("documento_existente", nomeDocumento)
    }else{
      const resultado = await adicionarDocumento(nomeDocumento)
        if(resultado.acknowledged){
          io.emit("adicionar_documento_interface", nomeDocumento)
        }
    }

    
  })

  socket.on("selecionar_documento",async (nomeDocumento, devolvertexto) => {

    socket.join(nomeDocumento)
    const documento = await encontrarDocumentos(nomeDocumento)
    
    if(documento){
      devolvertexto(documento.texto)
    }
  })

  socket.on("digitando", async ({texto, nomeDocumento}) => {
    const atualizacao = await atualizaDocumento(nomeDocumento, texto)
    if(atualizacao.modifiedCount){
      socket.to(nomeDocumento).emit("texto_editor_clientes", texto)

    }
  });

  socket.on("excluir_documento", async (nome) => {
    const documentoExcluido = await excluirDocumento(nome)
    if(documentoExcluido.deletedCount){
      io.emit("excluir_documento_sucesso", nome)
    }
  })
});

