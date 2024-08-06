const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const barberRoutes = require('./routes/barberRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3000;

app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/barbers", barberRoutes);
app.get('/',(req,res)=>{
  res.send({
    "Home":"Barber Backend"
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
