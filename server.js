const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Path to store the data

const dataFilePath = path.join(__dirname, 'storage.json');

// Route to store data 
app.post('/store', (req, res) =>{
  const newData = req.body;

  //Read existing data
  fs.readFile(dataFilePath, 'utf-8', (err, data) =>{

    if (err && err.code !== 'ENOENT'){
      return res.status(500).json({error:'Failed'});
    }

    //Parse existing data 
    let jsonData = [];
    if (data){
      jsonData = JSON.parse(data);
    }
    jsonData.push(newData);

    //Update data back 
    fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err){
        return res.status(500).json({ error: 'Failed' });
      }
      res.status(200).json({ message: 'successfully' });
    })
  })
})

// Route to retrieve data
app.get('./retrieve', (req, res) =>{
  fs.readFile(dataFilePath, 'utf8', (err, data) =>{
    if(err && err.code !== 'ENOENT'){
      return res.status(500).json({ error: 'Failed' });
    }
    const jsonData = data ? JSON.parse(data) : [];
    res.status(200).json(jsonData)
  })

  // const {name, age } = req.query;
  // console.log(name)
  // console.log(age)
  // res.send('Callback received successfully');
})

// app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});

