const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB);

mongoose.connection
.on('open', () => console.log('db connected!...'))
.on('err', (err) => console.log(err));
