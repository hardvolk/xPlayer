// Opcion Configurar
$('#Configurar').leanModal({dismissible: false});

// Biblioteca
$("#Biblioteca").on("click",function(){
        getAllDocs(function(err,docs){loadNavItems(err, docs, '#Items')});
    });
$('#AddFolderOption').on('click',function(){chooseFolder('folder')});
$('#AddRootFolderOption').on('click',function(){chooseFolder('')});

// show the modal for NewFolder
$("#inputFolder").change(function(evt) {
      //alert($(this).val());
    var folderName = $(this).val().substr($(this).val().lastIndexOf('\\') + 1);
    $("#FolderInfo").openModal();
    $('#NewFolderName').val(folderName);
       // addFolder($(this).val());
    });

// Show modal when select a RootFolder
$("#inputRootFolder").change(function(evt) {
    $('#RootFolderInfo').openModal();
});

// Trigger the click on the File inputs
function chooseFolder(folder) {
    if(folder == "folder")
        $("#inputFolder").trigger('click');
    else
        $("#inputRootFolder").trigger('click');
}

// Function for the click on Aceptar in NewFolder Modal
$('#ConfirmBtn').on('click', function(){
    var name = $('#NewFolderName').val();
    if(name != "")
    {
        var category = $("#FolderInfo input[type='radio']:checked").val();
        addFolder($('#inputFolder').val(), name, category);
        $('#NewFolderName').val('');
        $('#FolderInfo').closeModal();

    }
});

// When user clicks on aceptar button in RootFolderInfo Modal
$('#RootFolderInfo a').on('click', function(){
    var category = $("#RootFolderInfo input[type='radio']:checked").val();
    var path = $('#inputRootFolder').val();
    addRootFolder(path.replace(/\\/g, '/'), category);
    $('#RootFolderInfo').closeModal();
});

// Add Click Event to each item in #Items
$('#Items').on('click', '.nav-item',function(){
    // Load the Files into #FilesContainer
    //loadFiles($(this).attr('path'));
    Materialize.toast($(this).attr('path'), 2000);
    loadFiles( $(this).attr('_id'), $(this).attr('path'), $(this).attr('data-folderName'));
});

// Add functionality to back option in FilesContainer
$('#FilesContainer').on('click', '#FilesContainer_back', function(){
    $('#FilesContainer').animate({marginLeft: '100%'}, 300);
});

// //Add click event to each track in #FilesContainer
// $('#FilesContainer .collection').on('click', 'a', function(){
//     //alert('you clicked a');
//     addToPlayList($(this).attr('data-fileName'), $(this).attr('data-path'), $(this).attr('data-folderName'));
// });

// Add click event to each track in #FilesContainer
// $('#FilesContainer .collection').on('click', 'span', function(){
//     alert('you clicked span');
//     return false;
// });

// Add click event to each track in #FilesContainer
// $('#FilesContainer .collection').on('click', 'i', function(){
//     alert('you clicked i');
//     var path = $(this).parent().attr('data-path');
//     wjs().addPlaylist('file:///' + path);
//     return false;
// });
