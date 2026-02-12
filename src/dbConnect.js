import { MongoClient } from "mongodb";

const cliente = new MongoClient("mongodb+srv://lucascaje:9Htq1A3izIF20l0Y@cluster0.eiesyxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

var documentosColecao;


try {
    await cliente.connect()
    console.log("conectado com o banco de dados")

    const db = cliente.db("alura-websockets")
    documentosColecao = db.collection("documentos")
    
} catch (erro) {
    console.log(erro)
}

export { documentosColecao }
