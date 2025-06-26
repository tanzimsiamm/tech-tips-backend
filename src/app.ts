import express from 'express'
import router from './routes'
import globalErrorHandler from './middlewares/globalErrorHandler'
import cors from 'cors'
import notFound from './middlewares/notFound'

const app = express()

// use json body parser 
app.use(express.json())

// use cors 
app.use(cors( {origin: "*"}));
// app.use(cors({origin: "https://trend-tweaks.vercel.app"}));

// use router
app.use('/api', router)



app.get('/', (req, res) => {
  res.send('Hello World!')
})

// global error handler 
app.use(globalErrorHandler)

// not found 
app.use(notFound)

export default app