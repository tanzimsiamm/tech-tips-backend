import express from 'express'
import cors from 'cors'

const app = express()

// use json body parser 
app.use(express.json())

// use cors 
app.use(cors( {origin: "*"}));
// app.use(cors({origin: "https://trend-tweaks.vercel.app"}));

// use router
// app.use('/api', router)



app.get('/', (req, res) => {
  res.send('Hello World!')
})


export default app