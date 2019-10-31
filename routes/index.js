const express = require('express');
const router = express.Router();

const sql = require('../utils/sql');

router.get('/', (req, res) => {
    // should really get the user data here and then fetch it thru, but let's try this asynchronously
    console.log('at the main route');

    let query = "SELECT ID, avatar, Name, Logo, JobTitle FROM tbl_card";

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        console.log(result); // should see objects wrapped in an array

        // render the home view with dynamic data
        //before we sent it thru
        //map is an array method that lets you map one value to another (convert it)
        result[0].social = result[0].social.split(".").map(function(item){
            item = item.trim();
            // item.trim() removes any empty white space from text

            return item;
        })

        console.log("after trim / conversion:", result[0]);
        res.render('home', { people: result }); // data is all the details on the db, you can call it whatever you want
        //can be team, can be people, can be data; result can't be changed
    })
})

module.exports = router;