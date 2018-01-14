
// stores the http response
var response = null;
populate_list();
// loads categorty news based on number
// 0 : tech, 1 : business, 2 : entertainment, 3 : sports
function loadCategory(num) {
  cleanArea();
  // tech news sources list
  var tech_src = ["ars-technica,engadget","hacker-news,recode","techcrunch","techradar","the-next-web","the-verge"];

  // business news sources list
  var business_src = ['omberg', 'business-insider', 'business-insider-uk',
  'cnbc', 'financial-times', 'fortune', 'the-economist', 'the-wall-street-journal'];

  // entertainment news sources list
  var entmt_src = ['buzzfeed', 'daily-mail', 'entertainment-weekly', 'mashable', 'the-lad-bible'];

  // sports news sources list
  var sports_src = ['bbc-sport', 'espn', 'espn-cric-info', 'football-italia', 'four-four-two', 'fox-sports', 'nfl-news', 'talksport', 'the-sport-bible'];
  var news_src = [tech_src, business_src, entmt_src, sports_src];

  var src = news_src[num]; // select the src use appropriate logic
  for(var i = 0; i < src.length; i++) {
    loadDoc(src[i]);
  }
}

// loads doc for particular source used by load category function
function loadDoc(src) {

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(this.responseText);
      newsarray = response['articles'];

      // create the title for the section
      var section_header = document.createElement("div");
      section_header.className = "w3-panel w3-leftbar w3-khaki w3-xlarge w3-serif";
      section_header.innerHTML = "<p>" + src.toUpperCase() + "</p>";
      var NewsArea = document.getElementById("try");
      NewsArea.appendChild(section_header);

      for(i = 0; i < newsarray.length; i++) {
        news_object = newsarray[i];
        mycreateCard(news_object);
      }
      // createCard();
      // document.getElementById("demo").innerHTML = response;
    }
  };
  source = src;
  apiKey = "05dabf6c335b4512bad9578cf00d0856"; // please do not use this key. my personal key. you can get one for your own at newsapi.org
  query = "https://newsapi.org/v1/articles?source=" + source + "&sortBy=latest" + "&apiKey=" + apiKey;
  xhttp.open("GET", query, true);
  xhttp.send();
}

// creates a news card used by load_doc
function mycreateCard(news_object, src) {
  var NewsArea = document.getElementById("try");
  var level_1 = document.createElement("div");
  var cell_row = document.createElement("div");
  var img_cell = document.createElement("div");
  var image = document.createElement("img");
  var info_cell = document.createElement("div");
  var title = document.createElement("h3");
  var desc = document.createElement("p");

  level_1.className = "w3-margin";

  cell_row.className = "w3-card w3-cell-row w3-container";

  img_cell.className = "w3-cell w3-cell-middle w3-mobile w3-padding";

  image.className = "w3-image";
  image.src = news_object['urlToImage'];
  // image.setAttribute("style", "max-width:400px");

  info_cell.className = "w3-cell w3-container w3-mobile";

  title.innerHTML = news_object['title'];
  title.className = "w3-teal w3-padding";

  desc.innerHTML = news_object['description'];
  desc.className = "w3-padding";

  var link = document.createElement("a");
  link.className = "w3-cell w3-cell-bottom w3-padding w3-margin w3-circle w3-hover-shadow w3-right";
  link.innerHTML = "<img src='media/globe.png'></img>";
  link.setAttribute("href", news_object['url']);
  link.setAttribute("target", "_blank");

  img_cell.appendChild(image);
  info_cell.appendChild(title);
  info_cell.appendChild(desc);
  info_cell.appendChild(link);
  cell_row.appendChild(img_cell);
  cell_row.appendChild(info_cell);

  level_1.appendChild(cell_row);
  NewsArea.appendChild(level_1);
}

function myAccFunc(accNO) {
  var x = document.getElementById(accNO);
  total = 4;
  for(i = 0; i < total; i++) {
    var x = document.getElementById('acc' + i);
    if(i == accNO && x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }
 }
 function loadSrc(src) {
   cleanArea();
   loadDoc(src);
 }

 function populate_list() {
   // tech news sources list
   var tech_src = ["ars-technica","engadget","hacker-news","recode","techcrunch","techradar","the-next-web","the-verge"];

   // business news sources list
   var business_src = ['omberg', 'business-insider', 'business-insider-uk',
   'cnbc', 'financial-times', 'fortune', 'the-economist', 'the-wall-street-journal'];

   // entertainment news sources list
   var entmt_src = ['buzzfeed', 'daily-mail', 'entertainment-weekly', 'mashable', 'the-lad-bible'];

   // sports news sources list
   var sports_src = ['bbc-sport', 'espn', 'espn-cric-info', 'football-italia', 'four-four-two', 'fox-sports', 'nfl-news', 'talksport', 'the-sport-bible'];
   var news_src = [tech_src, business_src, entmt_src, sports_src];

   for(i = 0; i<4; i++) {
     var colors = ['red', 'teal', 'blue', 'indigo', 'purple'];
     var id = "acc"+i;
     var accordion = document.getElementById(id);
     var src = news_src[i];

     var item = document.createElement("li");
     var name = document.createElement("a");

     item.className = "w3-bar-item w3-button w3-ripple";
     name.innerHTML = "All...";
     item.appendChild(name);
     item.setAttribute("onclick", "loadCategory(" + i +")");
     accordion.appendChild(item);

     for(j = 0; j < src.length; j++) {
       // item to be added to list
       var item = document.createElement("li");

       //each item with two elements the name and a badge

       var badge = document.createElement("span");
       var name = document.createElement("a");
      //  name.className = "w3-btn w3-ripple";
       // random number to generate random color
       var rand = Math.floor(Math.random()*5);

       // badge is equal to first letter of the name
       var item_name = src[j];
       item_name.replace('-', ' ');
       if(item_name.length > 14) {
         name.innerHTML = item_name.toUpperCase().slice(0, 14) + "...";
       } else {
         name.innerHTML = item_name.toUpperCase();
       }

       badge.className = "w3-badge w3-large w3-margin-right "+ "w3-" + colors[rand];
       badge.innerHTML = src[j].toUpperCase()[0];

       item.appendChild(badge);
       item.appendChild(name);
       item.className = "w3-bar-item w3-button w3-ripple";
       item.setAttribute("onclick", "loadSrc('" + src[j] + "')");
       accordion.appendChild(item);
     }
   }
 }
 function cleanArea() {
   var NewsArea =  document.getElementById('try');
   NewsArea.innerHTML = "";
 }
