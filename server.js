const express = require('express');
const app = express();
const paymentRouter = require('./routes/payment'); 


app.use('/payments', paymentRouter);
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/main.html');
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
