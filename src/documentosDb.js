const documentos = []

function adicionarDocumento(nome){
    documentos.push({
        nome: nome,
        mensagens: []
    })
}

function encontrarDocumentos(nome) {
    return documentos.find(documento => documento.nome === nome)}


function obterDocumentos() {

    return documentos
}

function atualizaDocumento(nome, texto) {
    const documento = documentos.find(documento => documento.nome === nome)

    if (!documento) {
        return null
    }

    documento.texto = texto

    return documento
}

function excluirDocumento(nomeDocumento) {
    const indice = documentos.findIndex(
        documento => documento.nome === nomeDocumento
    )

    if (indice === -1) {
        return {
            deletedCount: 0
        }
    }

    documentos.splice(indice, 1)

    return {
        deletedCount: 1
    }
}

function adicionarMensagem(nomeDocumento, mensagem) {

    const documento = encontrarDocumentos(nomeDocumento)

    if (!documento) {
        return null
    }

    documento.mensagens.push(mensagem)

    return documento
}

function obterMensagens(nomeDocumento) {

    const documento = encontrarDocumentos(nomeDocumento)
    if (!documento) {
        return []
    }
    return documento.mensagens
}

export {
    encontrarDocumentos,
    atualizaDocumento,
    obterDocumentos,
    adicionarDocumento,
    excluirDocumento, 
    adicionarMensagem,
    obterMensagens
}