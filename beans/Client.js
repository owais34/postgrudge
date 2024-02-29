

class Client {

    constructor({host,port,database,user,password,clientId}){
        this.host = host;
        this.port = port;
        this.database = database;
        this.user = user;
        this.password = password;
        this.clientId = clientId;
    }
}

module.exports = Client