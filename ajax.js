
function loadNews() {

  // ajax for different browsers and browser version
  if (window.XMLHttpRequest) {
      // code for modern browsers
      xmlhttp = new XMLHttpRequest();
   } else {
      // code for old IE browsers
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  document.getElementsByClassName("news").innerHTML = "whoearowef";

  //  function called when response is received
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementsByClassName("news").innerHTML = this.responseText;
    }
  };
  query = "https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=05dabf6c335b4512bad9578cf00d0856";
  xmlhttp.open("GET", query, true);
  xmlhttp.send();
}
