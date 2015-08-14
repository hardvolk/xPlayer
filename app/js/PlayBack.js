wjs("#PlayerScreen").addPlayer({ id: "webchimera", theme: "sleek", autoplay: 1 });
//myplaylist = ["file:///C:/Users/Eliud/Music/Dimitri Vegas/Dimitri Vegas - bodytalk.mp3"];
//wjs("#webchimera").addPlaylist(myplaylist);

var playlistItemIndex = []; // <-- here is gonna be the index of each item in the playlist

//---------------------     PLAYER-EVENTS   --------------------
wjs().onPlaying(function(){
  $('#Play i').toggleClass('fa-play fa-pause');
});

wjs().onPaused(function(){
  $('#Play i').toggleClass('fa-play fa-pause');
});

wjs().onEnded(function(){
  $('#Play i').removeClass('fa-pause').addClass('fa-play');
});

wjs().onMediaChanged(function(){
  var currentInx = wjs().currentItem();
  $('#PLcontainer .blue').toggleClass('grey blue');
  $('#PLcontainer .collection-item[data-item-number=' + currentInx + ']').toggleClass('grey blue');
});
//----------------------    PLAYER BUTTONS -----------------------------
// Play Button Function
$("#Play").on('click', function(){wjs().togglePause(); });

//Prev button function
$('#Prev').on('click', function(){wjs().prev()});

// Next button function|
$('#Next').on('click', function(){wjs().next()});

// Toggle Full screen
$('#FullScreen').on('click', function(){
  wjs().toggleFullscreen();
  wjs().showToolbar();
});
//---------------------     ADD/REMOVE ITEMS EVENTS ---------------
//Add click event to each track in #FilesContainer
$('#FilesContainer .collection').on('click', 'a', function(){
    //alert('you clicked a');
    addToPlayList($(this).attr('data-fileName'), $(this).attr('data-path'), $(this).attr('data-folderName'));
});

$('#PLcontainer .collection').on('click', 'i', function(){
  //alert('itemNum: ' + $(this).parent().attr('data-item-number'));
  removeFromPlaylist($(this).parent().attr('data-item-number'));
  return false;
});

//---------------------     REORDER ITEMS INDEX     ----------------
function reorderIndex(){
  $('#PLcontainer .collection-item').each(function(i){
    $(this).attr('data-item-number', i);
  });
}


//---------------------     ADD ITEM IN PLAYLIST FUNCTION ----------------
function addToPlayList(fileName, path, folderName){
  var Container = $('#PLcontainer .collection');
  var iLenght = wjs().itemCount();
  $('#PLcontainer p').addClass('hide');
  Container.append('<a href="#!" class="collection-item truncate grey lighten-4 orange-text hoverable" data-path="' + path + '" data-item-number="' + iLenght + '" ><i class="remove fa fa-times right blue-grey-text"></i>' + fileName +
  '<br><label>' + folderName + '</label></a>'
  );

  wjs().addPlaylist('file:///' + path);

  if( iLenght == 0){
    wjs().play();
    $('#PLcontainer .collection-item[data-item-number = "0"]').toggleClass('grey blue');
  }

}

//--------------------    REMOVE FROM PLAYLIST  FUNCTION  -------------------
function removeFromPlaylist(inx){
  wjs().removeItem(inx);
  $('#PLcontainer .collection-item[data-item-number = "' + inx + '"]').remove();
  reorderIndex();
}
