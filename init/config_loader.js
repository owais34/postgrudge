const fs = require('fs')
const configData = require('../config.json')

// const s =  require('../beans/ClientList')


const loadConfig = () =>{
    for(const className in configData){
        let current_class
        try{
        current_class = require(`../beans/${className}`)
        current_class.getInstance().setData(configData[className])
        console.log("loaded bean "+className+"....")
        }
        catch(err){
           console.log("error loading bean ",className)
           console.log(err)
        }
    }
}

// subscriber
class ConfigSubscriber {
    static #instance = null

    constructor(){
        this.config=configData
    }

    update(className, data){
        this.config[className]=data
        this.#writeToConfig()
    }

    #writeToConfig(){
        try{
        const content = JSON.stringify(this.config)
        fs.writeFileSync('../config.json', content)
        }
        catch(err){
            console.log(err)
        }
    }

    static getInstance(){
        if(!ConfigSubscriber.#instance){
            ConfigSubscriber.#instance = new ConfigSubscriber()
        }

        return ConfigSubscriber.#instance
    }
}

module.exports = {
    loadConfig,
    ConfigSubscriber
}