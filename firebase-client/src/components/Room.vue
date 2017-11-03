
<style lang="css">
#loading {
  position: fixed;
  z-index: 999;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: url('https://media.giphy.com/media/13DlyUxneed3Nu/giphy.gif') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.kiri {
  /*background: red;*/
  background-image: url('../assets/img/cover.png');
  background-size: cover;
  height: 700px;
  border: solid 2px;
}
.kanan {
  background-image: url('../assets/img/cover.png');
  background-size: cover;
  height: 700px;
  border: solid 2px;
}
.navbar {
  margin-bottom: 0;
  border: none;
  border-radius: 0
}
.content h3 {
  color: silver
}
@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:700italic);
#countdown {
  font-family: 'Roboto Condensed', sans-serif;
  width: 200px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -50px;
  color: white;
  font-size: 5em;
  text-align: center;
  font-weight: bold;
  font-style: italic;
  -webkit-opacity: 1;
  -moz-opacity: 1;
  opacity: 1;
  -webkit-transition: opacity 0.4s ease;
  -moz-transition: opacity 0.4s ease;
  -ms-transition: opacity 0.4s ease;
  -o-transition: opacity 0.4s ease;
  /* solve for flicker problem */
  -webkit-perspective: 1000;
  -webkit-backface-visibility: hidden;
}
#countdown.puffer {
  -webkit-opacity: 0;
  -moz-opacity: 0;
  opacity: 0;
  -webkit-transform: scale(1.6, 1.6);
  -moz-transform: scale(1.6, 1.6);
  -ms-transform: scale(1.6, 1.6);
  -o-transform: scale(1.6, 1.6);
  -webkit-transition: all 0.4s ease-out;
  -moz-transition: all 0.4s ease-out;
  -ms-transition: all 0.4s ease-out;
  -o-transition: all 0.4s ease-out;
}
#gambar1 {
  position: absolute;
  left: 0px;
  top: 0px;
}

#gambar2 {
  position: absolute;
  left: 0px;
  top: 0px;
}

#gambar3 {
  position: absolute;
  left: 0px;
  top: 0px;
}
#gambar4 {
  position: absolute;
  left: 0px;
  top: 0px;
}
#gambar5 {
  position: absolute;
  left: 0px;
  top: 0px;
}
#gambar6 {
  position: absolute;
  left: 0px;
  top: 0px;
}
</style>
<template lang="html">
<div>
  <div class="content">
    <div class="col-md-6 kiri">
      <div class="col-md-6">
        <h3>Name: {{ room.player1.playerName }} </h3>
      </div>
      <div class="col-md-6">
        <h3>Score: {{ room.player1.score }} </h3>
      </div>
      <div>
        <img  src="../assets/img/ball.png" width="70px" id="gambar1" class="img1" @click="hideMe('gambar1')"/>
        <img  src="../assets/img/bomb.png" width="70px" id="gambar2" class="img2" @click="hideMe('gambar2')"/>
        <img  src="../assets/img/box.png"  width="70px" id="gambar3" class="img3" @click="hideMe('gambar3')"/>
      </div>
    </div>
    <div class="col-md-6 kanan">
      <div class="col-md-6">
        <h3>Name: {{ room.player2.playerName }}</h3>
      </div>
      <div class="col-md-6">
        <h3>Score: {{ room.player2.score }}</h3>
      </div>
      <div>
        <img  src="../assets/img/ball.png" width="70px" id="gambar4" class="img4" @click="hideMe('gambar4')"/>
        <img  src="../assets/img/bomb.png" width="70px" id="gambar5" class="img5" @click="hideMe('gambar5')"/>
        <img  src="../assets/img/box.png"  width="70px" id="gambar6" class="img6" @click="hideMe('gambar6')"/>
      </div>
    </div>
  </div>
  <div class="stopwatch">
    <div id="countdown"></div>
  </div>
  <div id="loading" style="display:none">
    <p>{{this.room.player1.playerName}} : {{ this.room.player1.score }}</p>
    <p>{{this.room.player2.playerName}} : {{ this.room.player2.score }}</p>
    <button v-if="isPlayer1" v-on:click="playAgain">Lagi</button>
  </div>
</div>
</template>

<script>
function randomAll() {
  var leftPos = Math.floor(Math.random() * 500)
  var topPos = Math.floor(Math.random() * 500)
  $('#gambar1').css("left", leftPos)
  $('#gambar1').show(100)
  $('#gambar1').css("top", topPos)
  leftPos = Math.floor(Math.random() * 500)
  topPos = Math.floor(Math.random() * 500)
  $('#gambar2').css("left", leftPos)
  $('#gambar2').show(100)
  $('#gambar2').css("top", topPos)
  leftPos = Math.floor(Math.random() * 500)
  topPos = Math.floor(Math.random() * 500)
  $('#gambar3').css("left", leftPos)
  $('#gambar3').show(100)
  $('#gambar3').css("top", topPos)

  var leftPos2 = Math.floor(Math.random() * 500)
  var topPos2 = Math.floor(Math.random() * 500)
  $('#gambar4').css("left", leftPos2)
  $('#gambar4').show(100)
  $('#gambar4').css("top", topPos2)
  leftPos2 = Math.floor(Math.random() * 500)
  topPos2 = Math.floor(Math.random() * 500)
  $('#gambar5').css("left", leftPos2)
  $('#gambar5').show(100)
  $('#gambar5').css("top", topPos2)
  leftPos2 = Math.floor(Math.random() * 500)
  topPos2 = Math.floor(Math.random() * 500)
  $('#gambar6').css("left", leftPos2)
  $('#gambar6').show(100)
  $('#gambar6').css("top", topPos2)
}

var startNum;
var currentNum;

function addClassDelayed(jqObj, c, to) {
  setTimeout(function() {
    jqObj.addClass(c);
  }, to);
}

function anim() {
  addClassDelayed($("#countdown"), "puffer", 600);
  if (currentNum == 0) {
    clearInterval(gameCountdown);
    $('#loading').show()
    $('#countdown').removeClass("puffer");
  } else {
    currentNum--
    randomAll()
  };
  $('#countdown').html(currentNum + 1);
  $('#countdown').removeClass("puffer");
}
var gameCountdown
function startGame() {
  $(function() {
    startNum = 2;
    currentNum = startNum;
    $("#countdown").html(currentNum); // init first time based on n
    gameCountdown = setInterval(function() {
      anim()
    }, 1325);
  });
}

// startGame()
// randomAll()
function addListenerClick() {
  // randomAll()
  $("#gambar1").click(function() {
    $(".img1").hide();
  });
  $("#gambar2").click(function() {
    $(".img2").hide();
  });
  $("#gambar3").click(function() {
    $(".img3").hide();
  });
  $("#gambar4").click(function() {
    $(".img4").hide();
  });
  $("#gambar5").click(function() {
    $(".img5").hide();
  });
  $("#gambar6").click(function() {
    $(".img6").hide();
  });
}
$(document).ready(function() {

});
import db from '@/firebase/firebase'
export default {
  props: ['room_name'],
  data() {
    return {
      startNum: 5,
      currentNum: 5,
      gambars: {
        gambar1: 1,
        gambar2: -2,
        gambar3: 2,
        gambar4: 1,
        gambar5: -2,
        // gambar6: 2
      },

    }
  },
  methods: {
    tulis() {
      console.log('aaaaa')
    },
    isPlayer1() {
      if(this.room.player1.playerName === localStorage.getItem('player')) {
        return true
      }
      return false
    },
    playAgain() {
      var winner;
      var loser;
      if(this.room.player1.score >= this.room.player2.score) {
        winner = {
          playerName: this.room.player1.playerName,
          score:this.room.player1.score
        }
        loser = {
          playerName: this.room.player2.playerName,
          score:this.room.player2.score
        }
      } else {
        winner = {
          playerName: this.room.player2.playerName,
          score:this.room.player2.score
        }
        loser = {
          playerName: this.room.player1.playerName,
          score:this.room.player1.score
        }
      }
      this.$http.post('/scores').send({
        winner: winner.playerName,
        loser: loser.playerName,
        winner_score: winner.score,
        loser_score: loser.score
      }).then((response) => {
        this.startGame()
        $('#loading').hide()
      }).catch((err) => {
        console.error(err)
      })
    },
    startGame() {
      db.ref('/' + this.room_name).set({
        player1: {
          playerName: this.room.player1.playerName,
          score: 0,
          status: this.room.player1.status
        },
        player2: {
          playerName: this.room.player2.playerName,
          score: 0,
          status: this.room.player2.status
        }
      })
      startGame()
      // randomAll()
      addListenerClick()
    },
    hideMe(gambar) {
      // this.gambars[gambar] = false
      $('#'+gambar).hide(100)
      // console.log(gambar[gambar.length])
      if(parseInt(gambar[gambar.length - 1]) > 3) {
        this.tambahScoreP2(this.gambars[gambar])
      } else {
        this.tambahScoreP1(this.gambars[gambar])
      }
    },
    tambahScoreP2(tambah) {
      var self = this
      this.room.player2.score += tambah
        db.ref('/' + this.room_name + '/player2').set({
          playerName: self.room.player2.playerName,
          score: self.room.player2.score,
          status: self.room.player2.status
        })
    },
    tambahScoreP1(tambah) {
      var self = this
      this.room.player1.score += tambah
        db.ref('/' + this.room_name + '/player1').set({
          playerName: self.room.player1.playerName,
          score: self.room.player1.score,
          status: self.room.player1.status
        })
    },
    leftRoom() {
      if (this.room.player1 && localStorage.getItem('player') === this.room.player1.playerName) {
        db.ref('/' + this.room_name + '/player1').set({
          playerName: '',
          score: 0,
          status: 0
        }, this.isRoomEmpty())
      } else if (this.room.player2 && localStorage.getItem('player') === this.room.player2.playerName) {
        db.ref('/' + this.room_name + '/player2').set({
          playerName: '',
          score: 0,
          status: 0
        }, this.isRoomEmpty())
      } else {
        alert('lu sokap')
      }
    },
    isRoomEmpty() {
      // if (!this.room.player1.status && !this.room.player2.status) {
      //   db.ref('/' + this.room_name).remove()
      //   this.$router.push('/')
      // } else {
      //   this.$router.push('/')
      // }
      this.$router.push('/')
    }
  },
  firebase() {
    return {
      room: {
        source: db.ref('/' + this.room_name),
        asObject: true
      }
    }
  },
  created: function() {
    var self = this
    db.ref('/' + this.room_name).once('value', function(snapshot) {
      if (!snapshot.val()) {
        self.$router.push('/')
      } else if ((snapshot.val().player1.status === 1 && snapshot.val().player1.playerName === localStorage.getItem('player')) || (snapshot.val().player2.status === 1 && snapshot.val().player2.playerName === localStorage.getItem('player'))) {
        // this.startGame()
      } else {
        self.$router.push('/')
      }
    })
  },
  mounted: function() {
    var self = this
    setTimeout(function() {
      self.startGame()
    }, 3000)
  }
}
</script>
