
const mongoose = require('mongoose');
const { getUrl } = require('./dbsetup');
const dbsetup = require('./dbsetup');

mongoose.connect(dbsetup.getUrl(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex:true,
}).then(()=>console.log("Connected to bolarizdb"))
  .catch(err=>console.log("ERROR", err));

module.exports = mongoose;

module.exports= async () => {
  await mongoose.connect(dbsetup.getUrl(),{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose
}