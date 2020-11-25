

  var tabPointWifi=[];
  var tabLocationName =[];
  var tabAdress=[];
  var myLongitude;
  var myLatitude;
  var listeMarqueur=[];
  var distanceMarqueur=[];
  var tempsMarqueur=[];
  var latLon=[];
  var destMarker;
  var  destLat;
  var  destLon;
 var itineraire = null;
 var classParDist = true;
 
//marqueur personnalisé
var marqueurWifi = L.icon({
  iconUrl: '../img/marqueurWifi2.png',

  iconSize:     [40, 40], // size of the icon
  popupAnchor:  [-3, -30] // point from which the popup should open relative to the iconAnchor
});


$(document).ready(function(){



    //GEOLOCALISATION
            function lancementGeolocalisation() {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(recupererPosition);
                    } else {
                      $("#message").html("Geolocation non supportée . Change de navigateur !");
                    }
            }
                  
            function recupererPosition(position) {
                    myLatitude= position.coords.latitude;
                    myLongitude = position.coords.longitude;

                    $.getJSON("https://opendata.paris.fr/api/records/1.0/search/?dataset=sites-disposant-du-service-paris-wi-fi&facet=idpw&facet=etat2&geofilter.distance="+myLatitude+"%2C+"+myLongitude+"%2C100000",callback);
            }
                  
          lancementGeolocalisation();

    //RECUPERATION DES POINTS WIFI GRACE A API
            function callback(result){
                    result.records.forEach(function(item){
                        tabPointWifi.push(item.fields.geo_point_2d);
                        tabLocationName.push(item.fields.nom_site);
                        tabAdress.push(item.fields.arc_adresse);
            });

    //positionnement de la carte en fonction de ma géolocalisation
            var map = L.map('carte').setView([myLatitude, myLongitude],15);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

            //marqueur personnalisé
            var marqueurMoi = L.icon({
              iconUrl: '../img/personne.png',

              iconSize:     [50, 50], // size of the icon
              popupAnchor:  [-3, -30] // point from which the popup should open relative to the iconAnchor
            });
            var moi = L.marker([myLatitude, myLongitude],{title:"WIFI",icon: marqueurMoi ,alt:"vous êtes ici",draggable:false});
            moi.addTo(map);

            //Marqueurs Clusters-Amadou
			var marqueurs=L.markerClusterGroup ({ 
				spiderfyOnMaxZoom : false , 
				showCoverageOnHover : false , 
				zoomToBoundsOnClick : false 
				});
             
            var i ;
            for (i = 0; i < tabPointWifi.length; i++) {
              var lat = tabPointWifi[i][0];
              var lon= tabPointWifi[i][1];
      
              var monMarqueur = L.marker([lat, lon],{title:"WIFI",icon: marqueurWifi ,alt:"la wifi est là",draggable:false});
              listeMarqueur.push(monMarqueur);


            } //fin for 

             
          //TRUCS QUI MARCHE PAS 
          

            //ranger la distance et le temps 
            function distanceTemps(){
              for(i =0; i<listeMarqueur.length;i++){
                console.log("iciii"+listeMarqueur[i]._latlng.lng + " "+listeMarqueur[i]._latlng.lat);
                console.log("iciii "+myLongitude+ " "+myLatitude);
                var objet = String("http://router.project-osrm.org/route/v1/driving/"+myLongitude+","+myLatitude+";"+listeMarqueur[i]._latlng.lng+","+listeMarqueur[i]._latlng.lat+"?overview=false");
                console.log(objet);
                // $.ajax({
                //   type :"GET",
                //   dataType: "json",
                //   url: objet,
                //   success: function (result){
                //     // JSON.parse(result);
                //     // console.log(result);
                //     console.log("res "+result["routes"][0]["legs"]["distance"]);
                //         distanceMarqueur.push(result['routes'][0]['legs']['distance']);
                //         tempsMarqueur.push(result['routes'][0]['legs']['duration']);
                //         console.log("iciii"+tempsMarqueur[0]);
                     
                //     }
                // });
                $.getJSON(objet,callbackDT);
       
              }
              
            }

            function callbackDT (result){
              // JSON.parse(result);
              // console.log(result);
              console.log("res "+result["routes"][0]["legs"]["distance"]);
                  distanceMarqueur.push(result['routes'][0]['legs']['distance']);
                  tempsMarqueur.push(result['routes'][0]['legs']['duration']);
                  console.log("iciii"+tempsMarqueur[0]);
               
              }

   //TRI 
   function triDistance(){
    var passage = 0;
    var permut = true;
    while(permut){
      permut = false;
      for (i = 0; i < distanceMarqueur.length -1 - passage; i++) {
        if (distanceMarqueur[i]>distanceMarqueur[i+1]){
          //échange distance 
          var tmpDist = distanceMarqueur[i];
          distanceMarqueur[i] = distanceMarqueur[i+1];
          distanceMarqueur[i+1] = tmpDist;

          //échange tableau marqueur 
          var tmpMarq = listeMarqueur[i];
          listeMarqueur[i] = listeMarqueur[i+1];
          listeMarqueur[i+1] = tmpMarq;

          //échange location
          var tmpLoc = tabLocationName[i];
          tabLocationName[i] = tabLocationName[i+1];
          tabLocationName[i+1] = tmpLoc;

          //échange adresse
          var tmpAdr = tabAdress[i];
          tabAdress[i] = tabAdress[i+1];
          tabAdress[i+1] = tmpAdr;

          permut = true;
        }
      }
      passage++;
  }
}
function triTemps(){
  var passage = 0;
  var permut = true;
  while(permut){
    permut = false;
    for (i = 0; i < tempsMarqueur.length -1 - passage; i++) {
      if (distanceMarqueur[i]>tempsMarqueur[i+1]){
        //échange distance 
        var tmpDist = tempsMarqueur[i];
        tempsMarqueur[i] = tempsMarqueur[i+1];
        tempsMarqueur[i+1] = tmpDist;

        //échange tableau marqueur 
        var tmpMarq = listeMarqueur[i];
        listeMarqueur[i] = listeMarqueur[i+1];
        listeMarqueur[i+1] = tmpMarq;

        //échange location
        var tmpLoc = tabLocationName[i];
        tabLocationName[i] = tabLocationName[i+1];
        tabLocationName[i+1] = tmpLoc;

        //échange adresse
        var tmpAdr = tabAdress[i];
        tabAdress[i] = tabAdress[i+1];
        tabAdress[i+1] = tmpAdr;

        permut = true;
      }
    }
    passage++;
}
}
distanceTemps();
triDistance();

  //fin tri 

//initialisation 
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value;
  for (i = 0; i < slider.value; i++) {
    var lat = tabPointWifi[i][0];
    var lon= tabPointWifi[i][1];
    // listeMarqueur.pop().addTo(map);
    var monMarqueur = listeMarqueur[i];
      //Suite Marqueurs Clusters-Amadou
      marqueurs.addLayer(monMarqueur);
      map.addLayer(marqueurs);
      marqueurs.on('clusterclick', function (a) {
      a.layer.zoomToBounds({padding: [60, 60]}); //20 20
      });

      //gestion du popup
      var html ="<h3>"+tabLocationName[i]+"</h3><p>"+tabAdress[i]+"</p>";
      var monPopup = L.popup({keepInView:true,closeButton:false}).setContent(html);
      monMarqueur.bindPopup(monPopup);
  }
  

  
  function miseAJour() {

    if (classParDist==true){
      triDistance();
    }
    else {
      triTemps();
    }
    output.innerHTML = slider.value;
                //on ajoute sur la carte 
    for (i = 0; i < listeMarqueur.length; i++) {
      marqueurs.removeLayer(listeMarqueur[i]);
      map.removeLayer(marqueurs);
    }

    for (i = 0; i < slider.value; i++) {
      var lat = tabPointWifi[i][0];
      var lon= tabPointWifi[i][1];
      // listeMarqueur.pop().addTo(map);
      var monMarqueur = listeMarqueur[i];
        //Suite Marqueurs Clusters-Amadou
        marqueurs.addLayer(monMarqueur);
        map.addLayer(marqueurs);
        marqueurs.on('clusterclick', function (a) {
        a.layer.zoomToBounds({padding: [60, 60]}); //20 20
        });

        //gestion du popup
        var html ="<h3>"+tabLocationName[i]+"</h3><p>"+tabAdress[i]+"</p>";
        var monPopup = L.popup({keepInView:true,closeButton:false}).setContent(html);
        monMarqueur.bindPopup(monPopup);
    }



  } 
             //au déplacement du slider 
             slider.oninput = miseAJour;
            // $("#myRange").oninput(miseAJour());     
  

  $("#distTmp").click(function(){
    if (document.getElementById("demo3").value =="true"){
      classParDist=false;
      
    }
    else {
      classParDist = true;
    }
   
    var output1 = document.getElementById("demo3");
    output1.value=classParDist;
    miseAJour();
 
  });










  
    //ITINERAIRE
    listeMarqueur.forEach(element => {
      element.on('click', function(){
        $("#btnItineraire").html("<button >Itinéraire </button>");
        destLat = element._latlng.lat;
        destLon = element._latlng.lng;
      })
    });
    
    $("#btnItineraire").click(function(){
      
      if(itineraire == null){
        itineraire =  L.Routing.control({
          waypoints: [
            L.latLng(myLatitude, myLongitude),
            L.latLng(destLat,destLon)
          ],
          createMarker: function() { return null; }
        });
        itineraire.addTo(map);

      
      }else{
        itineraire.remove(map);
        itineraire =  L.Routing.control({
             waypoints: [
               L.latLng(myLatitude, myLongitude),
               L.latLng(destLat,destLon)
             ],
             createMarker: function() { return null; }
           });
           itineraire.addTo(map);

      
      
      }

     });

}


});