const mongoose=require('mongoose')

const mongoURI="mongodb://127.0.0.1:27017/inotebook"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('connected to mongo successfully')
    })

}
module.exports=connectToMongo;