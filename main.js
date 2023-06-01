img="";
status="";
objects = [];

function preload(){
    img= loadImage('https://images.hola.com/imagenes/estar-bien/20221209222477/imagenes-divertidas-animales/1-175-658/pinguinos-t.jpg?tx=w_400');
}

function setup(){
  canvas= createCanvas(640,420);
  canvas.center();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Estatus:detectando objetos";
}
function draw(){
    image(img,0,0,640,420);
    if(status !=""){
     for(i= 0; i< objects.length; i++){
      document.getElementById("status").innerHTML ="Estatus del objecto detectado";

      fill("#0000FF");
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + "" + percent + "%" , objects[i].x, objects[i].y);
      noFill();
      stroke("#0000FF");
      rect(objects[i].x, objects[i].y,objects[i].width , objects[i].height);
     }
    }

}
function modelLoaded(){
  console.log("¡Modelo cargado!");
  status = true;
  objectDetector.detect(img,gotResult);
}
function gotResult(error,results){
 if(error){
  console.log(error);
 }
 console.log(results);
 objects = results;
}