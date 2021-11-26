let dbsetup = {
    db_name: "bolariz",
    db_user: "bolarizadmin",
    password: "123Cuatro",
    getUrl() {
        return `mongodb+srv://${this.db_user}:${this.password}@bolariz.fhram.mongodb.net/${this.db_name}?retryWrites=true&w=majority`
    } 
}
 
module.exports = dbsetup;

