
var status="";
song="";
object=[];

function setup(){
  canvas= createCanvas(380,380);
  canvas.center();
  video=createCapture(VIDEO)
  video.size(380,380)
  video.hide()
  objectDetector=ml5.objectDetector("cocossd",modelLoaded);
  document.getElementById("status").innerHTML="status: detecting objects";
}

function preload(){
    song=loadSound("song.mp3");
}

function draw(){
    image(video,0,0,380,380)
    if(status !=""){
      objectDetector.detect(video,gotResults)
      for (i=0;i<object.length;i++){
        document.getElementById("status"). innerHTML="status: objects detected"
        fill("red")
        percent=floor(object[i].confidence*100)
        stroke("red")
        text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15)
        noFill();
        stroke("red")
        rect(object[i].x,object[i].y,object[i].width,object[i].height)
        if(object[i].label=="person"){
          document.getElementById("number_of_objects").innerHTML="baby found"
          song.stop()
        }
      }
      if(object.length==0){
        document.getElementById("number_of_objects").innerHTML="baby not found"
        song.play() 
      }
    }
}

function modelLoaded(){
  console.log("model loaded");
  status=true;
  

}

function gotResults(error,results){
  if(error){
    console.log(error)
  }
  console.log(results)
  object=results;
}

