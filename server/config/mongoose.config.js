const mongoose = require('mongoose');
const uri = process.env.MONGO_DB_URI

mongoose
.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log('Database connected to:',uri))
.catch(()=> console.log('Database connection error:',err))