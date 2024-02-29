const { ConfigSubscriber } = require('../init/config_loader')
const Client = require('./Client')
const ClientIds = require('./ClientIds')

//publisher class
class ClientList {
    static #instance = null

    constructor() {
        this.clientList = []
        this.configSubscriber = ConfigSubscriber.getInstance()
    }

    static getInstance(){
        if(!ClientList.#instance){
            ClientList.#instance = new ClientList()
        }

        return ClientList.#instance
    }

    setData(client_list){
        for(const client of client_list){
            this.clientList.push(new Client(client))
        }
    }

    addClient({host,port,database,user,password}){
        const matchDuplicates = this.clientList.filter((client)=>{
            return (client.host === host && client.port === port && client.database == database)
        })

        if (matchDuplicates.length>0){
            return false
        }
        else {
            let clientId = ClientIds.getInstance().generateId()
            this.clientList.push(new Client({host,port,database,user,password,clientId}))
            this.configSubscriber.update("ClientList", this.clientList)
        }
    }

    deleteClient(clientId){
        const keepClients = this.clientList.filter((client)=>{
            return (client.clientId !== clientId)
        })

        this.clientList = keepClients
        this.configSubscriber.update("ClientList", this.clientList)
    }
}

module.exports = ClientList
