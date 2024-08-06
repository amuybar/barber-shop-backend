const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.get('/',(req,res)=>{
  res.send({
    "Home":"Barber Backend"
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
