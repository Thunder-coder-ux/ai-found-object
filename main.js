Status = "";
input = [];

function setup(){
    canvas = createCanvas(400, 320);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,320);
    video.hide();
}


function modelLoaded(){
    console.log("CoCo Modal Has been Loaded");
    Status = true ;
}

function start(){
    object = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("stat").innerHTML = "Status: Detecting Object(s)";
    input_name = document.getElementById("object_input").value;

}


function gotResult(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    input = results;
  }

function draw(){
    image(video, 0,0,400,320);
    if(status != "")
    {
      object.detect(video, gotResult);
      for (i = 0; i < input.length; i++) {
        document.getElementById("stat").innerHTML = "Status : Objects Detected";
    
        fill("#FF0000");
        percent = floor(input[i].confidence * 100);
        text(input[i].label + " " + percent + "%", input[i].x + 15, input[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(input[i].x, input[i].y, input[i].width, input[i].height);

        if (input[i].label==input_name) {
            video.stop;
            object.detect(gotResult);
            document.getElementById("objects").innerHTML = input_name + " found";

        } else {
            document.getElementById("objects").innerHTML = input_name + " not found";
        }
      }
    }
}

