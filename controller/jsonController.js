/**
 * Created by Milos on 02-Apr-17.
 */
var express = require('express');
var fs = require('fs');

// returns array of student objects
var readData = function() {
    try{
        var json = fs.readFileSync('data.txt');
        aStudenti = JSON.parse(json);

        // give each entry _id so that delete button will work
        for (var i = 0, len = aStudenti.length; i < len; i++) {
            aStudenti[i]._id = i;
        }
        return aStudenti;
    }catch(err)
    {
        console.log("ERROR read:" + err.toString());
        throw err;
    }
};


var saveData = function(json){
    fs.writeFile('data.txt', json, function(err){
        if (err) throw err;
        console.log("File Saved:" + json);
    });
};


module.exports.getUserList = function(req, res) {
    var aStudenti = readData();
    return aStudenti;

};

module.exports.addUser = function(req, res) {
    try {
        var aStudenti = readData();
        console.log("add user check:" + aStudenti);
        var username = req.body.usern;
        var email = req.body.mail;
        var fullname = req.body.fullname;
        var age = req.body.age;
        var location = req.body.loc;
        var gender = req.body.gender;
        var obj = {username:username,email:email,fullname:fullname,age:age,location:location,gender:gender};
        aStudenti.push(obj);

        json = JSON.stringify(aStudenti);
        saveData(json);
        res.redirect('/');

    }
    catch(err) {
        throw err;
        console.log("ERROR adduser:" + err.toString() + err.stack);
        res.send( { msg: err });
    }
};

// TODO: Read data from the file. Find the id of the user that we want to delete.
// Go throug array and delete the user. Save data to file by calling the appropriate function
// if no error, send property msg with empty value back, else send error msg
module.exports.deleteUser = function(req, res) {
    try {
        let id_to_delete = parseInt(req.params.id);
        let aStudenti = readData();
        //filter creates a new array with every element in an array that pass a test
        let toFilter = aStudenti.filter(item => item._id !== id_to_delete);
        json = JSON.stringify(toFilter);
        saveData(json);
        res.redirect('/');
    }
    catch(err) {
        throw err;
        console.log("ERROR deleteUser:" + err.toString() + err.stack);
        res.send( { msg: err });
    }
};

