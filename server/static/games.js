const {
  PUZZLE_GAME,
  BALLOON_GAME,
  HIT_TARGET_GAME,
} = require("../constants/games");

const puzzleGame = `<!DOCTYPE html>
<html>
  <head>
    <title>puzzle-gk</title>
    <style>
      /* Variabes */
      /* Mixin's */
      body {
        background: #c1d72e;
        font-family: "HelveticaNeue-Light", "Helvetica Neue Light",
          "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
        color: #fff;
        height: 100%;
        text-align: center;
        font-size: 18px;
      }

      .wrappper {
        width: 100%;
        margin: 0 auto;
      }
      .wrappper:after {
        content: "";
        display: table;
        clear: both;
      }

      canvas {
        color: #fff;
        border: #fff dashed 2px;
        padding: 15px;
      }

      h1,
      h2,
      h3 {
        font-family: "Roboto", sans-serif;
        font-weight: 100;
        text-transform: uppercase;
        margin: 5px 0;
      }

      h1 {
        font-size: 2.6em;
      }

      h2 {
        font-size: 1.6em;
      }

      p {
        font-size: 1em;
      }

      #alphabet {
        margin: 15px auto;
        padding: 0;
        max-width: 900px;
      }
      #alphabet:after {
        content: "";
        display: table;
        clear: both;
      }

      #alphabet li {
        float: left;
        margin: 0 10px 10px 0;
        list-style: none;
        width: 35px;
        height: 30px;
        padding-top: 10px;
        background: #fff;
        color: #c1d72e;
        cursor: pointer;
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -khtml-border-radius: 5px;
        border: solid 1px #fff;
      }
      #alphabet li:hover {
        background: #c1d72e;
        border: solid 1px #fff;
        color: #fff;
      }

      #my-word {
        margin: 0;
        display: block;
        padding: 0;
        display: block;
      }

      #my-word li {
        position: relative;
        list-style: none;
        margin: 0;
        display: inline-block;
        padding: 0 10px;
        font-size: 1.6em;
      }

      .active {
        opacity: 0.4;
        filter: alpha(opacity=40);
        -moz-transition: all 1s ease-in;
        -moz-transition: all 0.3s ease-in-out;
        -webkit-transition: all 0.3s ease-in-out;
        cursor: default;
      }
      .active:hover {
        -moz-transition: all 1s ease-in;
        -moz-transition: all 0.3s ease-in-out;
        -webkit-transition: all 0.3s ease-in-out;
        opacity: 0.4;
        filter: alpha(opacity=40);
        -moz-transition: all 1s ease-in;
        -moz-transition: all 0.3s ease-in-out;
        -webkit-transition: all 0.3s ease-in-out;
      }

      #mylives {
        font-size: 1em;
        text-align: center;
        display: block;
      }

      button {
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -khtml-border-radius: 5px;
        background: #c1d72e;
        color: #fff;
        border: solid 1px #fff;
        text-decoration: none;
        cursor: pointer;
        font-size: 1.2em;
        padding: 18px 10px;
        width: 180px;
        margin: 10px;
        outline: none;
      }
      button:hover {
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        background: #fff;
        border: solid 1px #fff;
        color: #c1d72e;
      }

      @media (max-width: 767px) {
        #alphabet {
          padding: 0 0 0 15px;
        }
      }
      @media (max-width: 480px) {
        #alphabet {
          padding: 0 0 0 25px;
        }
      }
    </style>
    <script>
      window.onload = function () {
        var alphabet = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
        ];

        var categories; // Array of topics
        var chosenCategory; // Selected catagory
        var getHint; // Word getHint
        var word; // Selected word
        var guess; // Geuss
        var geusses = []; // Stored geusses
        var lives; // Lives
        var counter; // Count correct geusses
        var space; // Number of spaces in word '-'

        // Get elements
        var showLives = document.getElementById("mylives");
        var showCatagory = document.getElementById("scatagory");
        var getHint = document.getElementById("hint");
        var showClue = document.getElementById("clue");

        // create alphabet ul
        var buttons = function () {
          myButtons = document.getElementById("buttons");
          letters = document.createElement("ul");

          for (var i = 0; i < alphabet.length; i++) {
            letters.id = "alphabet";
            list = document.createElement("li");
            list.id = "letter";
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
          }
        };

        // Select Catagory
        var selectCat = function () {
          if (chosenCategory === categories[0]) {
            catagoryName.innerHTML =
              "The Chosen Category Is Premier League Football Teams";
          } else if (chosenCategory === categories[1]) {
            catagoryName.innerHTML = "The Chosen Category Is Films";
          } else if (chosenCategory === categories[2]) {
            catagoryName.innerHTML = "The Chosen Category Is Cities";
          }
        };

        // Create geusses ul
        result = function () {
          wordHolder = document.getElementById("hold");
          correct = document.createElement("ul");

          for (var i = 0; i < word.length; i++) {
            correct.setAttribute("id", "my-word");
            guess = document.createElement("li");
            guess.setAttribute("class", "guess");
            if (word[i] === "-") {
              guess.innerHTML = "-";
              space = 1;
            } else {
              guess.innerHTML = "_";
            }

            geusses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
          }
        };

        // Show lives
        comments = function () {
          showLives.innerHTML = "You have " + lives + " lives";
          if (lives < 1) {
            showLives.innerHTML = "Game Over";
          }
          for (var i = 0; i < geusses.length; i++) {
            if (counter + space === geusses.length) {
              showLives.innerHTML = "You Win!";
            }
          }
        };

        // Animate man
        var animate = function () {
          var drawMe = lives;
          drawArray[drawMe]();
        };

        // Hangman
        canvas = function () {
          myStickman = document.getElementById("stickman");
          context = myStickman.getContext("2d");
          context.beginPath();
          context.strokeStyle = "#fff";
          context.lineWidth = 2;
        };

        head = function () {
          myStickman = document.getElementById("stickman");
          context = myStickman.getContext("2d");
          context.beginPath();
          context.arc(60, 25, 10, 0, Math.PI * 2, true);
          context.stroke();
        };

        draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
          context.moveTo($pathFromx, $pathFromy);
          context.lineTo($pathTox, $pathToy);
          context.stroke();
        };

        frame1 = function () {
          draw(0, 150, 150, 150);
        };

        frame2 = function () {
          draw(10, 0, 10, 600);
        };

        frame3 = function () {
          draw(0, 5, 70, 5);
        };

        frame4 = function () {
          draw(60, 5, 60, 15);
        };

        torso = function () {
          draw(60, 36, 60, 70);
        };

        rightArm = function () {
          draw(60, 46, 100, 50);
        };

        leftArm = function () {
          draw(60, 46, 20, 50);
        };

        rightLeg = function () {
          draw(60, 70, 100, 100);
        };

        leftLeg = function () {
          draw(60, 70, 20, 100);
        };

        drawArray = [
          rightLeg,
          leftLeg,
          rightArm,
          leftArm,
          torso,
          head,
          frame4,
          frame3,
          frame2,
          frame1,
        ];

        // OnClick Function
        check = function () {
          list.onclick = function () {
            var geuss = this.innerHTML;
            this.setAttribute("class", "active");
            this.onclick = null;
            for (var i = 0; i < word.length; i++) {
              if (word[i] === geuss) {
                geusses[i].innerHTML = geuss;
                counter += 1;
              }
            }
            var j = word.indexOf(geuss);
            if (j === -1) {
              lives -= 1;
              comments();
              animate();
            } else {
              comments();
            }
          };
        };

        // Play
        play = function () {
          categories = [
            [
              "everton",
              "liverpool",
              "swansea",
              "chelsea",
              "hull",
              "manchester-city",
              "newcastle-united",
            ],
            ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
            ["manchester", "milan", "madrid", "amsterdam", "prague"],
          ];

          chosenCategory =
            categories[Math.floor(Math.random() * categories.length)];
          word =
            chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
          word = word.replace(/\s/g, "-");
          console.log(word);
          buttons();

          geusses = [];
          lives = 10;
          counter = 0;
          space = 0;
          result();
          comments();
          selectCat();
          canvas();
        };

        play();

        // Hint

        hint.onclick = function () {
          hints = [
            [
              "Based in Mersyside",
              "Based in Mersyside",
              "First Welsh team to reach the Premier Leauge",
              "Owned by A russian Billionaire",
              "Once managed by Phil Brown",
              "2013 FA Cup runners up",
              "Gazza's first club",
            ],
            [
              "Science-Fiction horror film",
              "1971 American action film",
              "Historical drama",
              "Anamated Fish",
              "Giant great white shark",
            ],
            [
              "Northern city in the UK",
              "Home of AC and Inter",
              "Spanish capital",
              "Netherlands capital",
              "Czech Republic capital",
            ],
          ];

          var catagoryIndex = categories.indexOf(chosenCategory);
          var hintIndex = chosenCategory.indexOf(word);
          showClue.innerHTML = "Clue: - " + hints[catagoryIndex][hintIndex];
        };

        // Reset

        document.getElementById("reset").onclick = function () {
          correct.parentNode.removeChild(correct);
          letters.parentNode.removeChild(letters);
          showClue.innerHTML = "";
          context.clearRect(0, 0, 400, 400);
          play();
        };
      };
    </script>
  </head>
  <body>
    <div class="wrapper">
      <h4>Puzzle</h4>
      <p>
        Use the alphabet below to guess the word, or click hint to get a clue.
      </p>
    </div>
    <div class="wrapper">
      <div id="buttons"></div>
      <p id="catagoryName"></p>
      <div id="hold"></div>
      <p id="mylives"></p>
      <p id="clue">Clue -</p>
      <canvas id="stickman"
        >This Text will show if the Browser does NOT support HTML5 Canvas
        tag</canvas
      >
      <div class="container">
        <button id="hint">Hint</button>
        <button id="reset">Play again</button>
      </div>
    </div>
  </body>
</html>
`;

const balloonGame = `
<!DOCTYPE html>
<html>
    <head>

    </head>
    <script>
function Game(){
  this.isPaused = true;
  this.score = null;
  this.speed = null;
  this.density = null;
  this.remainingLives = 5;
  this.playElement = document.getElementById('start-btn');
  this.scoreElement = document.getElementById('score-container');
  this.livesElement = document.getElementById('lives-container');
  this.canvasElement = document.getElementById('canvas');
  this.timer = null;
  this.startedTime = null; //time from start game
  this.intervalId = null;
  this.updateTime = null;
  this.densityStep = null;
  this.balloonsArray = null;
  var thiz = this;
  this.updater = function(){
    thiz.updateGame();
  };
}
Game.prototype.startGame = function(){
  this.playElement.style.display = "none";
  this.intervalId = setInterval(this.updater, this.updateTime);
  
};
Game.prototype.pauseGame = function(){
  clearInterval(this.intervalId);
};
Game.prototype.updateScore = function(score){
  this.scoreElem.innerHTML = score;
};
Game.prototype.updateGame = function(){
  this.densityStep += this.density;
  if(this.densityStep >= 1 && this.balloonsArray.length < 30)
  {
    for(var i = 0; i < parseInt(this.densityStep, 10); i++)
    {
      var tempBalloon = new Balloon(0, -53, 'green', 'normal', 150);
      tempBalloon.positionX = tempBalloon.generateRandomXPos();
      console.log(tempBalloon.positionX);
      var el = document.createElement('div');
      el.className = 'balloon '+ tempBalloon.color;
      el.style.left = tempBalloon.positionX+'px';
      el.style.bottom = tempBalloon.positionY+'px';
      var thiz = this;
      var index = this.balloonsArray.length;
      el.onclick = function(){
        thiz.score += thiz.balloonsArray[index].points;
        thiz.updateScore(thiz.score);
        this.parentNode.removeChild(el);
      };
      this.canvasElement.appendChild(el);
      var tempObj = {};
      tempObj.el = el;
      tempObj.speed = tempBalloon.getRandomSpeed();
      tempObj.points = tempBalloon.points;
      this.balloonsArray.push(tempObj);
      //console.log(tempObj.speed);
    }
    this.densityStep = 0;
  }
  for(var i = 0; i < this.balloonsArray.length; i++)
  {
    this.balloonsArray[i].el.style.bottom = (parseInt(this.balloonsArray[i].el.style.bottom, 10)+(3+this.balloonsArray[i].speed))+'px';
  }
};
Game.prototype.endGame = function(){
  
};
Game.prototype.initGame = function(){
  this.isPaused = true;
  this.score = 0;
  this.speed = 0.01;
  this.density = 1000/4000;
  this.remainingLives = 5;
  this.updateTime = 50;
  this.densityStep = 1;
  this.balloonsArray = [];
  this.scoreElem = document.getElementById('score-count');
  
};
function Balloon(x, y, color, type, points){
  this.positionX = x;
  this.positionY = y;
  this.color = color;
  this.type = type;
  this.points = points;
}
Balloon.prototype.getRandomSpeed = function(){
  return Math.floor(Math.random() * 201)/100;
};
Balloon.prototype.generateRandomXPos = function(){
  console.log('document width = ', Math.floor(Math.random() * 450));
  return Math.floor(Math.random() * 450);
};

window.addEventListener('load',function(){
  var a = new Game();
  a.initGame();
  document.getElementById('start-btn').onclick = function(){
    a.startGame();
  };
});
    </script>
    <style>
@import url('https://fonts.googleapis.com/css?family=Contrail+One');
body{
  background:#47657e;
}
#main-wrapper{
  position:relative;
  margin: 0 auto;
  width:480px;
  height:500px;
  -webkit-box-shadow: 0 0 20px rgba(0,0,0,0.7);
}
#canvas{
  position:absolute;
  top:0;
  left:0;
  width:480px;
  height:500px;
  background:#337bc7;
  overflow:hidden;
}
#score-label{
  position:absolute;
  top:10px;
  left:10px;
  font-family: 'Contrail One', cursive;
  font-size:30px;
  color:#fff;
  text-shadow:1px 1px 0 #000;
}
#start-btn{
  position:absolute;
  background:#D5A21A;
  color:#fff;
  font-family: 'Contrail One', cursive;
  font-size:30px;
  padding:3px 10px;
  border-radius:10px;
  text-shadow:1px 1px 0 #A35906;
  border:4px solid #fff;
  cursor:pointer;
  top:200px;
  left:50%;
  margin-left:-40px;
  /* display:nonea; */
  box-shadow:0 0 20px rgba(0, 0, 0, 0.5);
}
#pause-btn{
  
}
.balloon.green{
  position:absolute;
  width:40px;
  height:53px;
  background-image: url('data:image/png;base64,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');

}
    </style>
    <body>
        <div id="main-wrapper">
            <div id="canvas">
            </div>
            <div id="score-label">
              Score: <span id="score-count">0</span>
            </div>
            <div id="start-btn">
              <span>Play</span>
            </div>
            <div id="pause-btn">
                
            </div>
          </div>
    </body>
</html>

`;

const hitTargetGame = `

<!DOCTYPE html>
<html>
    <head>
        <style>
* {
  box-sizing: border-box;
}

h1 {
  font-size: 1.4em;
}

body {
  counter-reset: game;
  text-align: center;
  background: #e9b58b;
  font-family: "Open Sans", "Helvetica", "Arial", sans-serif;
  color: #333;
}

input:checked {
  counter-increment: game;
}

.total-count::after {
  content: counter(game);
}

h2 {
  font-size: 1em;
  margin: -0.5em auto 3em;
  font-weight: 400;
}

.total-count {
  font-size: 1.75em;
  position: absolute;
  top: 1.75em;
  width: 100%;
  left: 0;
  text-align: center;
  z-index: 300;
}

.game-area {
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: space-between;
  max-width: 600px;
  min-height: 550px;
  max-height: 700px;
  margin: 0 auto;
  padding-left: 0;
}

li {
  width: calc(33% - .5em);
  margin-bottom: 1em;
  height: 10em;
  list-style: none;
  position: relative;
  outline: 4px solid white;
  background: #64ddf3;
}
li:nth-child(1) input {
  filter: hue-rotate(341.1810341367deg) brightness(1.5534226021);
  -webkit-animation-duration: 1.1669427821s;
          animation-duration: 1.1669427821s;
}
li:nth-child(2) input {
  filter: hue-rotate(6.4552620191deg) brightness(1.9680811786);
  -webkit-animation-duration: 2.3101811925s;
          animation-duration: 2.3101811925s;
}
li:nth-child(3) input {
  filter: hue-rotate(127.1176800748deg) brightness(1.0628927651);
  -webkit-animation-duration: 2.7139757058s;
          animation-duration: 2.7139757058s;
}
li:nth-child(4) input {
  filter: hue-rotate(208.6526364176deg) brightness(1.6070427133);
  -webkit-animation-duration: 1.628185781s;
          animation-duration: 1.628185781s;
}
li:nth-child(5) input {
  filter: hue-rotate(267.8207672778deg) brightness(1.8538174412);
  -webkit-animation-duration: 3.5492543611s;
          animation-duration: 3.5492543611s;
}
li:nth-child(6) input {
  filter: hue-rotate(227.2296649168deg) brightness(1.9187647313);
  -webkit-animation-duration: 1.9941846737s;
          animation-duration: 1.9941846737s;
}
li:nth-child(7) input {
  filter: hue-rotate(22.1108192169deg) brightness(1.2161405597);
  -webkit-animation-duration: 1.6671610396s;
          animation-duration: 1.6671610396s;
}
li:nth-child(8) input {
  filter: hue-rotate(50.2721342247deg) brightness(1.19823893);
  -webkit-animation-duration: 3.7011687252s;
          animation-duration: 3.7011687252s;
}
li:nth-child(9) input {
  filter: hue-rotate(131.4127012265deg) brightness(1.2199538197);
  -webkit-animation-duration: 0.8172397685s;
          animation-duration: 0.8172397685s;
}

input[type=checkbox] {
  width: 50px;
  height: 50px;
  position: absolute;
  cursor: crosshair;
  background: radial-gradient(red 10%, white 10%, white 30%, red 30%, red 50%, white 50%, white 80%, red 80%, red 100%);
  border-radius: 50%;
  display: block;
  left: 0;
  right: 0;
  text-align: center;
  margin: 0 auto;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  border: 6px solid red;
  -webkit-animation: hide-target infinite alternate ease-in-out;
          animation: hide-target infinite alternate ease-in-out;
  z-index: 1;
}
input[type=checkbox]:before {
  content: "";
  display: block;
  background-color: black;
  height: 50%;
  width: 6px;
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 6px);
  margin: 0 auto;
  z-index: -1;
}
input[type=checkbox]:focus {
  outline: none;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
input[type=checkbox]:checked {
  pointer-events: none;
  filter: grayscale(1) opacity(0.75);
  -webkit-animation: none;
          animation: none;
}
input[type=checkbox]:checked:after {
  content: "+1!";
  padding: 0.5em;
  margin: 1em 0 0 1.5em;
  font-size: 2.5em;
  font-weight: 600;
}

.shield {
  background: #724c20;
  width: 100%;
  height: 60%;
  margin: 0 auto;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  pointer-events: all;
  z-index: 100;
}

@-webkit-keyframes hide-target {
  0% {
    top: 0;
  }
  25% {
    top: 50%;
  }
  100% {
    top: 0;
  }
}

@keyframes hide-target {
  0% {
    top: 0;
  }
  25% {
    top: 50%;
  }
  100% {
    top: 0;
  }
}
.game-over {
  height: 100%;
  width: 100%;
  display: block;
  background: white;
  pointer-events: all;
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 200;
  -webkit-animation: appear 0.25s forwards;
          animation: appear 0.25s forwards;
  -webkit-animation-delay: 8s;
          animation-delay: 8s;
  background: repeating-linear-gradient(-45deg, #c9ff00 0, #c9ff00 5em, #20c0ff 5em, #20c0ff 10em);
}
.game-over h1 {
  padding: 1em 0 3.5em;
  background: white;
}

@-webkit-keyframes appear {
  from {
    top: -100vh;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes appear {
  from {
    top: -100vh;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
.play-again {
  background: white;
  color: #20c0ff;
  padding: 0.5em 1em;
  font-size: 2.5em;
  font-weight: 700;
}

small a {
  margin-bottom: 2em;
  display: block;
  color: #222;
}
        </style>
        <script>

        </script>
    </head>
    <body>
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>

<h1 style="margin-bottom: 1rem;">Hit The Target</h1>
<h2>You have 8 seconds to hit as many targets as you can!</h2>

<div class="game-over">
  <h1>Game Over!</h1>
  <a class="play-again" target="_parent" href="">Play Again</a>
</div>

<ul class="game-area">
  <li><input type="checkbox"><div class="shield"></div></li>
  <li><input type="checkbox"><div class="shield"></div></li>
  <li><input type="checkbox"><div class="shield"></div></li>
  <li><input type="checkbox"><div class="shield"></div></li>
  <li><input type="checkbox"><div class="shield"></div></li>
  <li><input type="checkbox"><div class="shield"></div></li>
  <li><input type="checkbox"><div class="shield"></div></li>
  <li><input type="checkbox"><div class="shield"></div></li>
  <li><input type="checkbox"><div class="shield"></div></li>
</ul>

<h3 class="total-count">Targets Hit: &nbsp;</h3>
    </body>
</html>

`;

module.exports = {
  [PUZZLE_GAME]: puzzleGame,
  [BALLOON_GAME]: balloonGame,
  [HIT_TARGET_GAME]: hitTargetGame,
};
