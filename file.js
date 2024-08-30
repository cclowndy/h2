const express = require('express');
// const routes = require('./router/user')
const session = require('express-session');
const app = express()
const PORT = 5000;

// Fillter data

// const data = ["adid", "tracker_name"]
// for (const [key, value] of Object.entries(object1)) {
//   if (data.includes(key)) {

//   }
// }

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));
app.use(express.json());

app.get('/callback', (req, res) => {

  if (req.params?.redirect) {
    return res.json('Hello w')
  }
  return res.redirect("//http://localhost:5000/callback?redirect=True")
})

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});


