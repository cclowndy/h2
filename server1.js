let http = require('http')
http.createServer(function(req, res){
    res.write('hello');
    res.end()
}).listen(6000)


//fs 

const fs = require('fs')
const dataFilePath = path.join(__dirname, 'storage.json');
fs.readFile(dataFilePath, 'utf-8', (err, data) =>{
    if(err){
        console.error(err);
        return
    }

    console.log(data)
})


// The os: provide methods to retrieve information from system that the application is running on

let os = require('os')
console.log("Computer OS Platform Info : " + os.platform());
console.log("Computer OS Architecture Info: " + os.arch());