// Author: Cesar Sanchez
// Under GPL V2.0
// Thanks to NeDB Project
// https://github.com/louischatriot/nedb

// Open DB and prepare DB Object

var Datastore = require('nedb');  
var db = new Datastore({  
  filename : getUserDataPath() + '/Data/xPlayer.db',
  autoload: true
});

// Since the functions to operate the DB
// with NeDB are async I have to send a 
// callback function to be executed after
// the NeDB's function completes

// Add new doc into DB
function insertDoc(newDoc){
    db.insert(newDoc, function(error, doc){
        if(error)
            swal('Oops!', error, 'error');
        else
            swal('Yeah!', " Artista agregado correctamente id: " + newDoc._id, 'success');
    });
}

// Add a bunch of Docs
function insertMultipleDocs(docArray){
    //alert(docArray.length + ' docs');
    console.log(docArray);
    db.insert(docArray, function(err, newDoc){
            if(err){
                swal('Oops!', err, 'error');
            }
        else
            swal('Yeah!', " SubCarpetas agregadas correctamente", 'success');
            
        });
}

// Found the doc with its _id and do the callback function
function getDoc(idDoc, callback){
    db.findOne({ _id: idDoc }, callback);
}

// Return all docs in DB and do the callback
function getAllDocs(callback){
    return db.find({}, callback);
}

// Return a single objct filtered by id
function getDoc(docID, callback){
    db.findOne({ _id: docID }, callback);
}
