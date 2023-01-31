const connectToMongo=require('./db');
const express = require('express')
var cors=require('cors')
connectToMongo();
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())

// Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello Ansh!')
})


app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
