import io from "./index.js"

import {
    encontrarDocumentos,
    obterDocumentos,
    adicionarDocumento,
    excluirDocumento,
    adicionarMensagem,
} from "./documentosDb.js"


io.on("connection", (socket) => {

    socket.on("adicionar_documento", (nomeDocumento) => {

        const documentoExiste =
            encontrarDocumentos(nomeDocumento)

        if (documentoExiste) {

            socket.emit(
                "documento_existente",
                nomeDocumento
            )

            return
        }

        adicionarDocumento(nomeDocumento)
        io.emit("adicionar_documento_interface", nomeDocumento)

    })
    
    socket.on("selecionar_documento", (nomeDocumento, devolverHistorico) => {

        socket.join(nomeDocumento)

        const documento = encontrarDocumentos(nomeDocumento)

        if (documento) {
            devolverHistorico(documento.mensagens)
        }else{
            devolverHistorico([])
        }

    })

    socket.on("obter_documentos", (devolverDocumentos) => {

        devolverDocumentos(obterDocumentos())

    })

    socket.on("excluir_documento", (nomeDocumento) => {

        const resultado = excluirDocumento(nomeDocumento)

        if (resultado.deletedCount === 1) {

            io.emit( "excluir_documento_sucesso", nomeDocumento )

        }

    })

    socket.on("receber_mensagem", ({nomeDocumento, mensagem}) => {

        const documento = encontrarDocumentos(nomeDocumento)

        if (documento) {
            adicionarMensagem(nomeDocumento, mensagem)
            io.to(nomeDocumento).emit("devolver_mensagem", mensagem)
        }

        
    })

})