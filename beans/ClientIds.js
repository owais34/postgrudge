const {ConfigSubscriber} = require('../init/config_loader')

//publisher class
class ClientIds {
    static #instance = null

    constructor(){
        this.idSet = new Set()
        this.idList = []
        this.configSubscriber = ConfigSubscriber.getInstance()
        
    }

    static getInstance(){
        if(!ClientIds.#instance){
            ClientIds.#instance = new ClientIds()
        }

        return ClientIds.#instance
    }

    setData(ids){
        for(const id of ids){
            this.idSet.add(id)
            this.idList.push(id)
        }
    }

    generateId(){
        let uuid = crypto.randomUUID()
        while(this.idSet.has(uuid)){
            uuid = crypto.randomUUID()
        }

        this.idSet.add(uuid)
        this.idList.push(uuid)
        this.configSubscriber.update("ClientIds", this.idList)
        return uuid
    }

}


module.exports = ClientIds