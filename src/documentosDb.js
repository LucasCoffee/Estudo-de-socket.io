import { documentosColecao } from "./dbConnect.js"


function encontrarDocumentos(nome){
  const documento = documentosColecao.findOne({nome: nome})
  return documento
}

function adicionarDocumento(nomeDocumento){
    const result = documentosColecao.insertOne({
       nome: nomeDocumento,
        texto: ""
    })

    return result
}

function atualizaDocumento(nome, texto){
    const atualizacao = documentosColecao.updateOne(
        {nome: nome}, 
        {$set: {
            texto: texto
            }
        }
        )
    return atualizacao
}

function obterDocumentos(){
    const documentos = documentosColecao.find().toArray()
    return documentos
}

function excluirDocumento(nomeDocumento){
    const result = documentosColecao.deleteOne({
        nome: nomeDocumento
    })

    return result
}

export { encontrarDocumentos, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento}