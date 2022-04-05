var q; //référence à un bloc div pour l'affichage (<di "id=map"></div>)
var p; //référence à un bloc div pour l'affichage (<di "id=monButton"></div>)

var manche;
var pointot;
var rand1;
var rand2;
var difficulte;
var layergroup;
var input;
var map

function getValue() {
    // Sélectionner l'élément input et récupérer sa valeur
    input = document.getElementById("in").value;
}

function gereClick(){
    
    getValue();
    q.innerHTML = "<h1>Resultat de la Manche :</h1>"
    question();
    
}

function init(){
    q = document.getElementById("ref");
    createmap();
    debut();
}


function debut(){
    manche =0;
    pointot = 0;
    choixniveau();
}

function aléatoire(){
    var x;
    if(niveau){
        x=51
    }
    else{
        x=39201
    }
    rand1 = Math.floor(Math.random() * x);
    rand2 = Math.floor(Math.random() * x);
}

function ajoutpoint(distance){
    manche +=1;
    point = parseInt(500-distance)
    if (point < 0){
        point = 0
    }
    pointot += point

}

function getVilleAleatoire(){
    if (niveau){
        fetch("NiveauFacile.json")
   .then(response =>response.json())
   .then(data=> {
       console.log( rand1, rand2 )
       q.innerHTML = "<h3 align='center'> QUESTION :  </h3><hr>";
       q.innerHTML +=   "Quel est la distance entre " + data[rand1]['Nom_commune'] + " et " + data[rand2]['Nom_commune'];
       q.innerHTML += "<br><input type='text' placeholder='Entrez une valeur ici' id='in'><br> <button type='submit' onclick='gereClick();'>go</button>";
   })
    }
    else{
        fetch("france.json")
        .then(response =>response.json())
        .then(data=> {
            q.innerHTML = "<h3 align='center'> QUESTION :  </h3><hr>";
            q.innerHTML +=   "Quel est la distance entre " + data[rand1]['Nom_commune'] + " et " + data[rand2]['Nom_commune'];
            q.innerHTML += "<br><input type='text' placeholder='Entrez une valeur ici' id='in'><br> <button type='submit' onclick='gereClick();'>go</button>";
        })
    }
    
       }

function connexion(){
    var userExist = false;
    var nom = document.getElementById("nom").value;
    var mdp = document.getElementById("mdp").value;
    var bon = false
    fetch("user.json")
    .then(response =>response.json())
    .then(data=> {
        for(var i =0; i<3;i++){
            if(data[i]['nom']==nom && data[i]['mdp']==mdp){
                bon=true
            }
            
        }
        if(bon){
            document.location.href="./map.html"; 
        }
        else{
            q.innerHTML += "utilisateur inconnu"
        }
        
        
    })
} 



function afficheMarqueur(map, L){
    if(niveau){
        fetch("NiveauFacile.json")
   .then(response =>response.json())
   .then(data=> {
      var coord = data[rand1]['coordonnees_gps'].split(",")
     var monMarqueur = L.marker([parseFloat(coord[0]), parseFloat(coord[1])],
    {title:"Ici c'est " + data[rand1]["Nom_commune"],alt:"IUT",draggable:false});
    var coord2 = data[rand2]['coordonnees_gps'].split(",")
    var  Marqueur2 = L.marker([parseFloat(coord2[0]), parseFloat(coord2[1])],
    {title:"Ici c'est " + data[rand2]["Nom_commune"],alt:"IUT",draggable:false});
   
   
    var longcoord0=parseFloat(coord[0])-parseFloat(coord2[0])
    var longcoord0km =Math.abs(longcoord0*111)
    var longcoord1=parseFloat(coord[1])-parseFloat(coord2[1])
    var longcoord1km =Math.abs(longcoord1*78)
    var longcoord = Math.sqrt(Math.pow(longcoord0km,2)+Math.pow(longcoord1km,2));
    
    var ratio = input/longcoord;
    ajoutpoint(Math.abs(longcoord-input))
    var  Marqueur3 = L.marker([(parseFloat(coord[0]) + (parseFloat(coord2[0])-parseFloat(coord[0]))*ratio),( parseFloat(coord[1])+ (parseFloat(coord2[1])-parseFloat(coord[1]))*ratio)],
    {title:"Ici c'est toi",alt:"IUT",draggable:false});
    

    var popup = L.popup();
    popup.setContent("<p>Manche"+ manche +"</p><p>Distance : "+ input + "/" + longcoord + "</p><button type='submit' onclick='next();'>Suite</button>");

    Marqueur3.bindPopup(popup);


    Marqueur3.addTo(layergroup);
       
       
    Marqueur2.addTo(layergroup);
    
    monMarqueur.addTo(layergroup);
    })
}
    else{
        fetch("france.json")
   .then(response =>response.json())
   .then(data=> {
      var coord = data[rand1]['coordonnees_gps'].split(",")
     var monMarqueur = L.marker([parseFloat(coord[0]), parseFloat(coord[1])],
    {title:"Ici c'est " + data[rand1]["Nom_commune"],alt:"IUT",draggable:false});
    var coord2 = data[rand2]['coordonnees_gps'].split(",")
    var  Marqueur2 = L.marker([parseFloat(coord2[0]), parseFloat(coord2[1])],
    {title:"Ici c'est " + data[rand2]["Nom_commune"],alt:"IUT",draggable:false});
   
   
    var longcoord0=parseFloat(coord[0])-parseFloat(coord2[0])
    var longcoord0km =Math.abs(longcoord0*111)
    var longcoord1=parseFloat(coord[1])-parseFloat(coord2[1])
    var longcoord1km =Math.abs(longcoord1*78)
    var longcoord = Math.sqrt(Math.pow(longcoord0km,2)+Math.pow(longcoord1km,2));
    
    var ratio = input/longcoord;
    ajoutpoint(Math.abs(longcoord-input))
    var  Marqueur3 = L.marker([(parseFloat(coord[0]) + (parseFloat(coord2[0])-parseFloat(coord[0]))*ratio),( parseFloat(coord[1])+ (parseFloat(coord2[1])-parseFloat(coord[1]))*ratio)],
    {title:"Ici c'est toi",alt:"IUT",draggable:false});
    
    var popup = L.popup();
    popup.setContent("<p>Manche"+ manche +"</p><p>Distance : "+ input + "/" + longcoord + "</p><button type='submit' onclick='next();'>Suite</button>");

    Marqueur3.bindPopup(popup);

    Marqueur3.addTo(layergroup);
       
       
    Marqueur2.addTo(layergroup);
    
    monMarqueur.addTo(layergroup);
    
    
       
      
   })}
}




function next(){
    q.innerHTML = "";
    destroy()
    fin()
    
}

function fin(){
    if (manche==5){
        score()
    }
    else{
        htmlQuestion()
    }
}

function destroy(){
    layergroup.clearLayers();
}


function choixniveau(){
    q.innerHTML = "<h1>Bienvenue ! Veuillez choisir un niveau et comtempler notre belle map.</h1>"
    q.innerHTML += "<button type='submit' onclick='facile();' style='width: 50%; margin: 0 auto; margin-top:2%;'>Facile</button><button type='submit' onclick='difficile();' style=' width: 50%; margin: 0 auto; margin-top:2%;'>Difficile</button>";
}

function facile(){
    niveau = true
    htmlQuestion()
}

function difficile(){
    niveau = false
    htmlQuestion()
}

function score(){
    q.innerHTML = "<h1>SCORE : " + pointot + "</h1><br> <button type='submit' onclick='debut();'>Recommencer</button>";
}


function question()  {
    layergroup = new L.LayerGroup();
    map.addLayer(layergroup);
    afficheMarqueur(map, L);
    
}


function createmap(){
    map = L.map('map', 
    {
    center: [48.841608, 2.268462],
    zoom: 5
    });
   // var coord = jsonData[1][coordonnees_gps].split(",");
    var base = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
}


function htmlQuestion() {
    aléatoire();
    ville1 = getVilleAleatoire();
}




//--------------------------------------------------------------


