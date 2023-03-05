function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
let boxes = document.getElementsByClassName("box");

function firstCheck(){
  let scrollTop = document.documentElement.scrollTop;
  for(let i=0; i<boxes.length; i++)  {
    if(boxes[i].offsetTop + 50 < scrollTop + window.innerHeight)
      boxes[i].classList.add("slideIn");
    else
      boxes[i].classList.remove("slideIn");
  }
}

function showScroll(){
  let scrollTop = document.documentElement.scrollTop;
  for(let i=0; i<boxes.length; i++)  {
    if(boxes[i].offsetTop + 50 < scrollTop + window.innerHeight && 
      boxes[i].offsetTop + boxes[i].offsetHeight - 50 > scrollTop){
      boxes[i].classList.add("slideIn");
    }
    else {
      boxes[i].classList.remove("slideIn");
    }
  }
}

let my_canvas = document.getElementsByClassName("canvas-bg")[0].getContext("2d");
let size = 50;
let intervalId = null;
let redPolig = document.getElementById("redPolig");
let greenPolig = document.getElementById("greenPolig");
let bluePolig = document.getElementById("bluePolig");

function drawCanavas (){
  my_canvas.canvas.width  = window.innerWidth;
  let width = my_canvas.canvas.clientWidth;
  for (let x=0; x<width+size; x+=size) {
    for (let y=0; y<700; y+=size) {
      my_canvas.fillStyle = `rgb(0, ${getRandomInt(50)+150}, ${getRandomInt(50)+150})`;
      my_canvas.fillRect(x, y, size, size);
    }
  }
  redPolig.style=`fill:rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
  greenPolig.style=`fill:rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
  bluePolig.style=`fill:rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
}

drawCanavas();

function toggleBgAnimation() {
  if (intervalId == null) {
    intervalId = window.setInterval(drawCanavas, 100);
    document.getElementsByClassName("btn-stop")[0].innerHTML = "STOP ANIMATION";
  }
  else {
    document.getElementsByClassName("btn-stop")[0].innerHTML = "START ANIMATION";
    clearInterval(intervalId);
    intervalId = null;
  }
}

document.getElementById("form-btn").addEventListener("click", function(event){
  event.preventDefault();

  document.getElementById("form-btn").disabled = true;

  const d = new Date();
  let dateFormated = "";
  let _comment = document.getElementById("comment").value;
  let ajax_request = new XMLHttpRequest();

  dateFormated += d.getFullYear() + "-";
  dateFormated += d.getMonth().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + "-";
  dateFormated += d.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + " ";
  dateFormated += d.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":";
  dateFormated += d.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":";
  dateFormated += d.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

  let data = {
    comment: _comment,
    date: dateFormated
  };

  let dataStr = JSON.stringify(data);
  
  ajax_request.open("POST", "save_comment.php", true);
  ajax_request.setRequestHeader("Content-type", "application/json");
  ajax_request.send(dataStr);

  ajax_request.onreadystatechange = function() {
    if(ajax_request.readyState == 4 && ajax_request.status == 200) {
      document.getElementById("form-btn").disabled = false;
      document.getElementById("form").reset();
      alert(ajax_request.responseText);
    }
  }

});

window.addEventListener('resize', drawCanavas);
window.addEventListener('scroll', showScroll);
window.addEventListener('load', firstCheck);