var autoCarouselLeft;
var autoCarouselRight;
var phone = true;

var supportsAudio = true;
//var audioPictoPlay = 'icon-play-circle';
var audioPictoPlay = 'icon-play';
var audioPictoPause = 'icon-pause';

/////////////////////////////////////
//////// FONCTIONS FACEBOOK /////////
/////////////////////////////////////

/* Load the SDK Asynchronously */
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/fr_FR/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
/*******************************
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/fr_FR/all.js#xfbml=1&appId=262200783844398";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
/*******************************/

// Try to adjust like FB social module width 
function responsiveFB() {

  // Like Box     
  var modfbWidth =   $(".fb-like-box-container").width();
  var modfbHeight =   $(".fb-like-box-container").parent().height()-40;
  $(".fb-like-box.fb_iframe_widget").css("width", modfbWidth);
  $(".fb-like-box.fb_iframe_widget span:first-child").css("width", modfbWidth);
  $(".fb-like-box.fb_iframe_widget iframe").css("width", modfbWidth);
  $(".fb-like-box.fb_iframe_widget").css("height", modfbHeight);
  $(".fb-like-box.fb_iframe_widget span:first-child").css("height", modfbHeight);
  $(".fb-like-box.fb_iframe_widget iframe").css("height", modfbHeight);
  $(".fb-like-box.fb_iframe_widget").attr("data-height", modfbHeight);
  $(".fb-like-box.fb_iframe_widget").attr("data-width", modfbWidth);
  
  //Comments
  var modfbWidth =   $(".fb-comments-container").width();
  $(".fb-comments.fb_iframe_widget").css("width", modfbWidth);
  $(".fb-comments.fb_iframe_widget span:first-child").css("width", modfbWidth);
  $(".fb-comments.fb_iframe_widget iframe").css("width", modfbWidth);
  $(".fb-comments.fb_iframe_widget").attr("data-width", modfbWidth);
  
} 

function loadResponsiveFB(){
  // Comments
  var widget_width = $(".fb-comments-container").width()-14;
  var url = $(".fb-comments").attr("data-href");  
  $(".fb-comments-container").html("<div class='fb-comments' data-href='"+url+"' data-width='"+ widget_width +"' data-num-posts='2' data-mobile='false'></div>"); 

  // Like Box
  $(".fb-like-box-container").css("width","90%");
  $(".fb-like-box-container").css("margin","auto");
  var widget_width = $(".fb-like-box-container").width()-6;
  var widget_height = $(".fb-like-box-container").parent().height()-40;
  var url = $(".fb-like-box").attr("data-href");
  $(".fb-like-box-container").html("<div class='fb-like-box' data-href='"+url+"' data-width='"+widget_width+"' data-height='"+widget_height+"' data-show-faces='false' data-stream='true' data-header='false'></div>");
  
}

/////////////////////////////////////////// 
//////////// SAME HEIGHTS  ////////////////
///////////////////////////////////////////

// Same height for same elements (example : same css class)
function equalizeHeight(objToCheck){
  var maxHeight=0;
  $(objToCheck).each(function(){
    $(this).css("height","auto");
    if($(this).height()> maxHeight) maxHeight = $(this).height();
    //console.log(maxHeight);
  });
  $(objToCheck).each(function(){ 
    $(this).height(maxHeight); 
  });
  responsiveFB();
  return maxHeight;
}

/////////////////////////////////////////
////////// SUBNAVBAR POSITION ///////////
/////////////////////////////////////////

function positionNavbar(pos){
  var heightnavbar = $(".subnavbar-inner").height();
  var scrollTop = $(window).scrollTop();
  var navBottom = $(window).height() + $(window).scrollTop() - heightnavbar;
  $("body").css("padding-top","0");
  $(".navbar").css({'position' : 'relative', 'margin' : '0' });
  $(".subnavbar").css({'position' : 'relative', 'top' : 'auto', 'margin-top' : '0', 'margin-bottom' : '0'});
  if(pos == "top"){
    $("body").css("padding-bottom", "0");
    if(scrollTop > heightnavbar){
      $(".subnavbar").css({'position' : 'fixed', 'top' : '0'});
      $(".carousel").css("margin-top","50px");
    }else{
      $(".subnavbar").css("position","relative");
      $(".carousel").css("margin-top","0");
    }
  }else{
    $(".subnavbar").css({'position' : 'absolute', 'top' : navBottom});
    $("body").css("padding-bottom", heightnavbar);      
  }
}

///////////////////////////////////////////
/////////////// SLIDERS ///////////////////
///////////////////////////////////////////

// Control objects to swipe
function showControlScroll(objControlStart, objControlEnd, scrollableObj, scrollableObjContainer, axis) {
  navStart = navEnd = "";
  if (axis == "x") {
    scrollStart = scrollableObj.scrollLeft();
    scrollEnd = scrollableObjContainer.width() - scrollableObj.width();
  }else{
    scrollStart = scrollableObj.scrollTop();
    scrollEnd = scrollableObjContainer.height() - scrollableObj.height();
  }
  if (scrollStart > 0){
    objControlStart.addClass("controlActive");
    navStart = "active";
  }else objControlStart.removeClass("controlActive");
  if (scrollEnd <= scrollStart) {
    objControlEnd.removeClass("controlActive");
  } else{
    objControlEnd.addClass("controlActive");
    navEnd = "active";
  }   
  return new Array(objControlStart.hasClass("controlActive"), objControlEnd.hasClass("controlActive"));
}

// Click on objects control or touch to swipe
function ObjPixScroll(scrollableObj, scrollableObjContainer, objControlStart, objControlEnd, numPixels, myAxis) { 
  showControlScroll(objControlStart, objControlEnd, scrollableObj, scrollableObjContainer, myAxis);
  function scrollToSens(sens){
    scrollableObj.stop().scrollTo(sens + "=" + numPixels, 1000, {
      axis:myAxis, 
      onAfter:function(){ 
        nav = showControlScroll(objControlStart, objControlEnd, scrollableObj, scrollableObjContainer, myAxis);
        if(scrollableObj.attr("id") == "myCarousel"){ infiniteCarousel(nav); }       
      }
    });
  }
  objControlEnd.click(function() { scrollToSens("+"); });
  objControlStart.click(function() { scrollToSens("-");});
  if(myAxis=="x"){
    scrollableObj.touchwipe({
      wipeLeft: function() { scrollToSens("+")  },
      wipeRight: function() { scrollToSens("-") },
      preventDefaultEvents: false
    });
  }else{
    scrollableObj.touchwipe({
      wipeUp: function() { scrollToSens("-")  },
      wipeDown: function() { scrollToSens("+") },
      preventDefaultEvents: true
    });
  }        
}

// Adjust height of a given object and the scrollable object it contains 
function ajdustHeightWithScroll(scrollableObj, scrollableObjContainer, referenceHeight) {   
  heightScrollObjContainer = scrollableObjContainer.height() + 1;
  maxScroll = scrollableObj.height();
  nv = scrollableObjContainer.css("height", referenceHeight);  
  if (referenceHeight > heightScrollObjContainer) { 
    ratio = Math.floor(referenceHeight - heightScrollObjContainer);
    scrollableObj.css("height", maxScroll + ratio);
  } else if (referenceHeight < heightScrollObjContainer) {
    ratio = Math.floor(heightScrollObjContainer - referenceHeight);
    scrollableObj.css("height", maxScroll - ratio);      
  }  
  ObjPixScroll(scrollableObj, scrollableObjContainer,  scrollableObj.prev(), scrollableObj.next(), maxScroll - ratio, "y");
  responsiveFB();     
}

// An infinite carousel
function infiniteCarousel(nav){
  var containerCarousel = $(".carousel-inner");
  var idCarousel = $("#myCarousel");
  var waitingTimeInSeconds = 1;
  if ((nav[1] == false)||(nav[0] == false)){
    clearTimeout(autoCarouselRight);
    clearTimeout(autoCarouselLeft);
  }
  if (nav[1] == false){
    containerCarousel.find("a:last-child").after(containerCarousel.find("a:first-child"));
    containerCarousel.remove("a:first-child");
    idCarousel.scrollLeft(idCarousel.scrollLeft() - containerCarousel.find("a:last-child").width());            
    autoCarouselLeft = setInterval("autoCarousel('left')",3600);           
  } 
  if (nav[0] == false){
    containerCarousel.find("a:first-child").before(containerCarousel.find("a:last-child"));
    containerCarousel.remove("a:last-child"); 
    idCarousel.scrollLeft(idCarousel.scrollLeft() + containerCarousel.find("a:first-child").width());
    autoCarouselRight = setInterval("autoCarousel('right')",3600);            
  }
  showControlScroll($(".carousel .icon-chevron-left"), $(".carousel .icon-chevron-right"), idCarousel, containerCarousel, "x");       
}
                   
// Slide carousel
function slideCarousel() {
  w = $(".carousel-inner> a").width() * $(".carousel-inner> a").length;
  if($("#myCarousel").width() > w) $(".carousel-inner").css("width", "100%");
  else $(".carousel-inner").css("width", w + "px");
  ObjPixScroll(
    $("#myCarousel"), $(".carousel-inner"), 
    $('.carousel .leftcontrol'), $('.carousel .rightcontrol'),
    $("#myCarousel").find("a").width(), "x"
  );
}
function autoCarousel(slide_direction){
  if(slide_direction == "right"){
    $('.carousel .rightcontrol').trigger('click');
  }else{
    $('.carousel .leftcontrol').trigger('click');  
  }
}

// Slide for the subnavbar
function slideMenu() {
  ObjPixScroll(
    $(".mainnav").parent(), $(".mainnav"), 
    $(".subnavbar .icon-chevron-left"), $(".subnavbar .icon-chevron-right"), 
    $(".mainnav").parent().width(), "x"
  );
}

// Slides page disco
function slidesPageDisco(){
  // liste des chansons :
  var controlUp = $(".slider_container .list_alter").prev(); 
  var controlDown = $(".slider_container .list_alter").next(); 
  var container = $(".list_alter"); 
  var content = $(".slider_container");
  moveHeight = content.height();
  ObjPixScroll(container, content, controlUp, controlDown, moveHeight, "y");     		  
  // Albums
  var controlUp = $(".nav_album .chevron.up"); 
  var controlDown = $(".nav_album .chevron.down");
  var controlLeft = $(".nav_album .chevron.left"); 
  var controlRight = $(".nav_album .chevron.right"); 
  var container = $(".wrapper_nav_album"); 
  var content = $(".nav_album");
  moveHeight = content.height(); 
  moveWidth = content.width();
  ObjPixScroll(container, content, controlUp, controlDown, moveHeight, "y");
  ObjPixScroll(container, content, controlLeft, controlRight, moveHeight, "x");     
}

function loadAndResize(){
  if ( ($("#inscription").is(':visible')) || ($("#inscription2").is(':visible')) ) {
    phone = false;
  }else phone = true;
  if (phone == false) {
    if($("#equal").length > 0){
    $("#faceb").height($("#equal").height());
  } 
  
    equalizeHeight(".equaliz .lev1");
    positionNavbar("bottom");
    if($("#mesactus").length>0){
      ajdustHeightWithScroll($(".list_alter"), $(".disco"), $("#mesactus").height() - 14, 0);
    }
  }else{
    positionNavbar("top");
    $(".disco").css("height", "auto");
  }
  slideMenu();
  slideCarousel();
  slidesPageDisco();
  
  if($(".nav_album").width()<200){
    $(".int .disco .slider_container").css("float","left");
    myWidth = $(".disco .slider_container").parent().width() - $(".col1.int").width() - $(".nav_album").width()- 50;
    $(".disco.int .slider_container").css("float", "left");
    $(".disco.int .slider_container").css("width", myWidth+"px");
    responsiveFB();
  }else{
     $(".disco.int .slider_container").css("float","none");
     $(".disco.int .slider_container").css("width","auto");
     responsiveFB();  
  }
}

function setPlay(pId, pBoolPlay, pBoolOnlyIcons) {
  var icon = $('#'+pId+' .plUL li:eq('+audio[pId].index+') i');
  if (pBoolPlay){
    if (!pBoolOnlyIcons) {
      audio[pId].audio.pause();
      alert('setPlay: pause -> '+audio[pId].playing);
    }
    icon.removeClass(audioPictoPlay);
    icon.addClass(audioPictoPause);
  } else {
    if (!pBoolOnlyIcons) {
      audio[pId].audio.play();
      alert('setPlay: play -> '+audio[pId].playing);
    }
    icon.addClass(audioPictoPlay);
    icon.removeClass(audioPictoPause);
  }
}
function playTrack(pId, pIndex) {
  stopTrack(false);
  loadTrack(pId, pIndex);
  audio[pId].audio.play();
}
function loadTrack(pId, pIndex) {
  //$('.plSel').removeClass('plSel');
  //$('#plUL li:eq(' + id + ')').addClass('plSel');
  //audio[id].npTitle.text(audio[id].jsonTracks[pIndex].name);
  audio[pId].index = pIndex;
  if (audio[pId].jsonTracks[pIndex] != undefined) {
    $(audio[pId].audio).attr('src', audio[pId].jsonTracks[pIndex].file);
    audio[pId].audio.load();
  }
}
function stopTrack(pBoolOnlyPlay) {
  $.each(audio, function(id, value){
    if (audio[id].playing) {
      if (!pBoolOnlyPlay) setPlay(id, false, true);
      audio[id].audio.pause();
    }
  });
}

//LOAD
$(document).ready(function() {
  supportsAudio = !!document.createElement('audio').canPlayType;

  // PAGE GALERIE PHOTOS
  if($("#galerie1").length > 0){
    var galerie1 = $("#galerie1 a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });  
  }

  // CHARGEMENT
  // Hides Safari Sidebar :
  setTimeout(function(){
    window.scrollTo(0, 1)
  }, 100);
  loadAndResize();  
  loadResponsiveFB();
  autoCarouselLeft = setInterval("autoCarousel('left')",3600);
  
  // RESIZE
  $(window).resize(function() { 
    loadAndResize(); 
    responsiveFB();  
  });
  // SCROLL
  $(window).scroll(function() {
    if (phone == false) positionNavbar("bottom");   
    else positionNavbar("top");
  });
    
  $("#equal").resize(function(e){
    $("#faceb").height($("#equal").height());
    responsiveFB();
  });

  $('#useLegend').click(function(e) {
    e.preventDefault();
    $('#use').slideToggle(300, function() {
      $('#useSpanSpan').text(($('#use').css('display') == 'none' ? 'show' : 'hide'));
    });
  });

  // AUDIO
  if (supportsAudio) {
    $.each(audio, function(id, value){
      audio[id].index = 0;
      audio[id].playing = false;
      audio[id].trackCount = audio[id].tracks.length;
      audio[id].jsonTracks = $.parseJSON(audio[id].tracks);
      audio[id].npAction = $('#'+id+' .npAction');
      audio[id].npTitle = $('#'+id+' .npTitle');
      audio[id].audio = $('#audio_'+id).bind('play', function() {
        alert('bind: play -> '+audio[id].playing);
        audio[id].playing = true;
        audio[id].npAction.text('à l\'écoute:');
        setPlay(id, audio[id].playing, true);
      }).bind('pause', function() {
        alert('bind: pause -> '+audio[id].playing);
        audio[id].playing = false;
        audio[id].npAction.text('en pause:');
        setPlay(id, audio[id].playing, true);
      }).bind('ended', function() {
        audio[id].npAction.text('en pause:');
        if((audio[id].index + 1) < audio[id].trackCount) audio[id].index++;
        else audio[id].index = 0;
        loadTrack(id, audio[id].index);
        setPlay(id, audio[id].playing, false);
      }).get(0);

      $('#'+id+' .plUL li').click(function() {
        var indexLI = parseInt($(this).index());
        stopTrack(true);
        if (indexLI !== audio[id].index) playTrack(id, indexLI);
        else setPlay(id, audio[id].playing, false);
      });
      loadTrack(id, audio[id].index);
      // end each
    });
  }
});