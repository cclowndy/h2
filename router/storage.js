const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();




router.put("/:email", (req, res) => {
    const adid = req.params.adid;
    const tracker_name = req.params.tracker_name;

    let filtered_users = users.filter((user) => user.email === email);
    
    if (filtered_users.length > 0) {
        // Select the first matching user and update attributes if provided
        let filtered_user = filtered_users[0];
        
         // Extract and update DOB if provided
        
        let DOB = req.query.DOB;    
        if (DOB) {
            filtered_user.DOB = DOB;
        }
        
        /*
        Include similar code here for updating other attributes as needed
        */
        
        // Replace old user entry with updated user
        users = users.filter((user) => user.email != email);
        users.push(filtered_user);
        
        // Send success message indicating the user has been updated
        res.send(`User with the email ${email} updated.`);
    } else {
        res.send("Unable to find user!");
    }
});


router.delete("/:email", (req, res) => {L
    const adid = req.adid ;
    const tracker_name = req.tracker_name;

    // Filter the users array to exclude the user with the specified email
    adid = adid.filter((adid) => user.adid != adid);
    // Send a success message as the response, indicating the user has been deleted
    res.send(`User with the adid ${adid} and tracker_name${tracker_name}deleted.`);
});



// Path to store the data
const dataFilePath = path.join(__dirname, './storage.json');
// Route to store data
router.post('/', (req, res) => {
    const newData = req.body;

    // Read existing data
    fs.readFile(dataFilePath, 'utf-8', (err, data) => {

        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({ error: 'Failed' });
        }

        // Parse existing data
        let jsonData = [];
        if (data) {
            jsonData = JSON.parse(data);
        }
        jsonData.push(newData);

        // Update data back
        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed' });
            }
            res.status(200).json({ message: 'successfully' });
        });
    });
});