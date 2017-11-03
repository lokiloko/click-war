<template lang="html">
  <div class="row ketengah background-custom">
    <div class="col-md-5">
      <form action="" id="loginForm">
        <div class="form-group input-group">
          <span class="input-group-addon"></span>
          <input class="form-control" placeholder="input room" v-model:value="roomName"/>
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-def btn-block" v-on:click="createRoom">Masuk Room</button>
          <button type="button" class="btn btn-def btn-block" v-on:click="doLogout">Log Out</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/firebase'
import JsonWebToken from 'jsonwebtoken'
export default {
  data () {
    return {
      roomName: '',
    }
  },
  methods: {
    doLogout() {
      localStorage.clear()
      this.$router.push('/login')
    },
    getData: function () {
      if(localStorage.token){
        let token = localStorage.token
        let decoded = JsonWebToken.decode(token)
        localStorage.setItem('player', decoded.username)
        localStorage.setItem('dataUser', JSON.stringify(decoded))
      }else{
        this.$router.push('/login')
      }
    },
    createRoom () {
      var self = this
      db.ref(self.roomName).once('value', function (snapshot) {
        if (!snapshot.val()) {
          db.ref(self.roomName).set({
            status: 0,
            player1: {
              playerName: localStorage.getItem('player'),
              score: 0,
              status: 1
            },
            player2: {
              playerName: '',
              score: 0,
              status: 0
            }
          })
          self.$router.push('/room/' + self.roomName)
        } else if (snapshot.val().player1.status && !snapshot.val().player2.status) {
          db.ref(self.roomName + '/player2').set({
            playerName: localStorage.getItem('player'),
            score: 0,
            status: 1
          })
          self.$router.push('/room/' + self.roomName)
        } else if (!snapshot.val().player1.status && snapshot.val().player2.status) {
          db.ref(self.roomName + '/player1').set({
            playerName: localStorage.getItem('player'),
            score: 0,
            status: 1
          })
          self.$router.push('/room/' + self.roomName)
        } else {
          alert('room penuh')
        }
      })
    }
  },
  firebase: {
    namaRoom: {
      source: db.ref('/')
    }
  },
  beforeMount () {
    this.getData()
  }
}
</script>

<style lang="css">
.background-custom {
 background-image: url('../assets/img/index.jpg');
 background-size: cover;
}
.ketengah {
 display:flex;
 height:100vh;
 justify-content: center;
 align-items: center;
}
</style>
