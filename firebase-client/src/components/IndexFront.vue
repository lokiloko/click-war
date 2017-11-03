<template>
  <div class="container">
    <div class="row ketengah">
      <div class="col-md-5">
        <form action="" id="loginForm">
          <div class="form-group input-group">
            <span class="input-group-addon"></span>
            <input class="form-control" v-model="room" placeholder="input room"/>
          </div>
          <div class="form-group">
            <button type="button" class="btn btn-def btn-block">Masuk Room</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        room: ''
      }
    },
    methods: {
      
    }
  }
</script>

<style>
  body {
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
