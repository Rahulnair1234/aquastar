const connectToMongo=require('./db');
const express = require('express')
const cors = require('cors')
const Razorpay=require('razorpay');
connectToMongo();
/*const razorpay = new Razorpay({
  key_id: 'rzp_test_6hpA1Pkp2R0qBD',
  key_secret: '7lm5BafXUCFQEM96V8uJCzBQ',
});*/

const app = express()
const port = 5000

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Rahul!')
})
//app.post('/razorpay',async(req,res)=>{})
app.post('/verification',(req,res)=>{
  //validation
  const SECRET='12345678'
  console.log(req.body)
  res.json({status:'ok'})
})
app.use('/api/auth',require('./routes/auth'))
app.use('/api/admin_controls',require('./routes/admin_controls'))
app.use('/api/cust',require('./routes/cust'))
app.use('/api/bill',require('./routes/bill'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})