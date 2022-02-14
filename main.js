function setup() {
  canvas = createCanvas(250, 250);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet',modelLoaded);
}
function modelLoaded(){
  console.log('ModelLoaded');
}
function draw(){
image(video,0,0,250,250);
classifier.classify(video,gotResult);
}
var previous_result='';
function gotResult(error,result){
  if(error){
  console.error(error);
  }
  
  else{
    if((result[0].confidence>0.5) && (result[0].label!=previous_result)){
console.log(result);
previous_result=result[0].label;
var synth=window.speechSynthesis;
speak_data='Object is detected'+result[0].label;
utterthis=new SpeechSynthesisUtterance(speak_data);
synth.speak(utterthis);

document.getElementById('result_object_name').innerHTML=result[0].label;
document.getElementById("result_object_accuracy").innerHTML=result[0].confidence.toFixed(3);
}
  }
  
}
//ends here



