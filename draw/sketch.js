let canvasSize = [580, 580];
let bgColor = 255;
let clearButton;
let canvas;

let doodleClassifier;
let resultsDiv;

let test = document.getElementById("test");

function setup() {
  canvas = createCanvas(canvasSize[0], canvasSize[1]);
  canvas.style("border", "5px dashed #e7a61a");
  clearButton = createButton('Erase');
  clearButton.mousePressed(clearCanvas);
  background(bgColor);
  // clearButton style
  clearButton.addClass("btn btn-danger clear");
  
  doodleClassifier = ml5.imageClassifier('DoodleNet', modelReady)
  resultsDiv = createDiv('Model Loading..')
}

function modelReady(){
  console.log("model loaded")
  doodleClassifier.classify(canvas, gotResults);
}

function gotResults(error, results){
  if(error){
    console.error(error);
    return;
  }
  // console.log(results);
  let content = `${results[0].label} ${nf(100*results[0].confidence, 0, 1)}%`

  // dev
  console.log(`${results[0].label} ${nf(100*results[0].confidence, 0, 1)}%
${results[1].label} ${nf(100*results[1].confidence, 0, 1)}%
${results[2].label} ${nf(100*results[2].confidence, 0, 1)}%
${results[3].label} ${nf(100*results[3].confidence, 0, 1)}%
${results[4].label} ${nf(100*results[4].confidence, 0, 1)}%
${results[5].label} ${nf(100*results[5].confidence, 0, 1)}%
${results[6].label} ${nf(100*results[6].confidence, 0, 1)}%
${results[7].label} ${nf(100*results[7].confidence, 0, 1)}%
${results[8].label} ${nf(100*results[8].confidence, 0, 1)}%
${results[9].label} ${nf(100*results[9].confidence, 0, 1)}%`)
  
  
  
  resultsDiv.html(content)
  resultsDiv.addClass("result")
  doodleClassifier.classify(canvas, gotResults);
}

function clearCanvas() {
  background(bgColor);
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(25);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}