const express = require('express');
const routes = require('./router/user')
const session = require('express-session');
const bodyParser = require('body-parser');
const user = require('./router/user');
const app = express()
const PORT = 5000;

// Initialize session middleware with options
app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use("/", user);

// Callback URL endpoint
app.post('/callback', (req, res) => {
  const { tracker, tracker_name } = req.body;

  console.log('Received callback data:', req.body);

  // Respond with a success message
  res.json({
      status: 'success',
      message: 'Callback received',
      data: {
          tracker,
          tracker_name
      }
  });
});


app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
  });


