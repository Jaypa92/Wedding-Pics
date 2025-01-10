const mongoose = require('mongoose');

const uri = 'mongodb+srv://besteverwas92:Iamjaypa92@cluster0.xkq9il7.mongodb.net/Wedding?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));