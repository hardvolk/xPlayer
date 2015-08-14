// SET THE COVER FOR A SINGLE FOLDER
function setCover(doc, callback) {
    var ext = '';

    fs.readdir(doc.path, function(err, files){
        if(!err){
            for(var i=0; i < files.length; i++){
                ext = files[i].substr(files[i].lastIndexOf("."));
                if(ext === ".jpg"){
                    doc.cover = doc.path + "/" + files[i];
                    //alert(doc.cover);
                    break;
                }
            }
            callback();
        }else
            alert("Error while reading " + path);
        console.log(doc);

    });
}

// CHECK IF THE COVER IN THE FOLDER IS THE DEFAULT COVER, IF SO, TRY TO CHANGE IT
function updateCover(docID, coverUrl){
    // First load yhe doc and verify the cover
    getDoc(docID, function(err, doc){
        if(!err && doc != null){
            if(doc.cover === '../app/img/icons/play_background.png')
                // If the cover is the default cover, update to the image in the folder
               db.update({ _id: doc._id }, { $set: { cover: coverUrl } }, {}, function(error, numReplaced){
                   if(error) swal('Error! ' + error);
               });
            }
        else
            swal('Algo salio mal :/ ' + err);

        });
}

// LOAD ALL ARTISTS IN NAVIGATOR
function loadNavItems(err, docs){
    var Cont = $('#Items');

    if(!err){
        //If the length is zero we ask for artist
        if(docs.length > 0){
            if(Cont.children().length < docs.length){ // if the elements in 'Container' are less than elements in DB...
                Cont.html('');

                for(var i = 0; i < docs.length; i++){
                    Cont.append('<div class="nav-item hoverable" style="background-image: url(\''+docs[i].cover+'\')" path="'+
                                docs[i].path+'" type="'+docs[i].type+'" _id="'+docs[i]._id+'" ranking="' + docs[i].ranking + '" data-folderName="' + docs[i].name + '">'+
                                '<h3>'+docs[i].name+'</h3></div>');
                }

            }

        }   // Mostrar ALGO EN CASO DE NO TENER ARTISTAS
        else if(Container == '#Items')
            swal('Al parecer no tienes carpteas agregadas en tu bliblioteca, para agregar un nuevo artista' +
                 ' ve al menu de Configuracion -> Biblioteca');
            // Mostrar algo en caso de no encontrar archivos


    }else
        swal("Algo salio mal :/ " + err);
}

// LOAD THE FILES IN THE PATH RECEIVED INTO #FILESCONTAINER
function loadFiles(docID, path, folderName){
    fs.readdir(path, function(err, files){
       // 1)check the extention of each element
        // 2)if extention == mp3 || mpeg || avi || add a new file-item in #FilesContainer
        // 3)attach function to each element
        // 4)move #filesContainer into the scene
        var ext = '';
        var itemsCounter = 0;
        var container = $('#FilesContainer .collection');
        var catchImage = '';

        if(!err){
            container.html('');

            files.map(function (file) {
                return Path.join(path, file).replace(/\\/g, '\\\\');
            }).filter(function (file) {
                return fs.statSync(file).isFile();
            }).forEach(function (file) {
                //console.log("%s (%s)", file, Path.extname(file));
                ext = Path.extname(file);
                var fileName =  Path.basename(file, ext);
                //console.log(ext);
                if(ext === '.mp3' || ext === '.avi' || ext === '.mpeg' || ext === '.wmv' || ext === '.mp4'){
                    container.append('<a href="#!" class="collection-item" data-folderName="' + folderName + '" data-fileName="' + fileName + '" data-path="'+ file +'" data-format="' + ext + '"><span>' +
                                          fileName + '</span><i class="fa fa-plus right"></i> </a>');
                    itemsCounter++;
                }
                if(ext === '.jpg' || ext === '.png') catchImage = file;

            });
            if(catchImage != '') updateCover(docID, catchImage);

            if(itemsCounter > 0)
                $('#FilesContainer').animate({marginLeft: 0}, 300);
            else
                swal('Actualmente no hay archivos multimedia en la carpeta');
        }else
            swal('Algo salio mal:/ ' + err);


    });

}

// ADD JUST ONE ARTIST INTO DB
function addFolder(path, name, category){
    newDoc = {};
    newDoc.path = path.replace(/\\/g,'/');
    newDoc.name = name;
    newDoc.type = 'Folder';
    newDoc.cover = '../app/img/icons/play_background.png';
    newDoc.category = category;
    newDoc.ranking = 0;
    newDoc.since = new Date().toLocaleDateString();

    // CHECK FOR COVER AND ADD IT
    setCover(newDoc, function(){insertDoc(newDoc)});

}

// ADD A ROOTFOLDER
function addRootFolder(path, category){
    docArray = [];

    var name = '';
    var currentPath = '';

    // Fill the array
    fs.readdir(path, function(err, files){
        if(!err){
            for(var i = 0; i < files.length; i++){
                currentPath = path + '/' + files[i];
                if(fs.statSync(currentPath).isDirectory()){
                    var Folder = {type: 'Folder', cover: '../app/img/icons/play_background.png',
                                  category: category, ranking: 0, since: new Date().toLocaleDateString()
                                 };
                    Folder.name = files[i];
                    Folder.path = currentPath;
                    docArray.push(Folder);
                }
            }
            insertMultipleDocs(docArray);
        }else
            alert("Error while reading " + path);
    });
}
