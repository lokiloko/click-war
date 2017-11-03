<template>
  <div class="navbar">
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Click War</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#" data-toggle="modal" data-target="#myModalLogin">Login</a></li>
            <li><a href="#" data-toggle="modal" data-target="#myModalRegister">Register</a></li>
          </ul>
        </div><!-- /.navbar-collapse -->

        <!-- Modal Login -->
        <div class="modal fade" id="myModalLogin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <form>
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="myModalLabel">Login</h4>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" placeholder="Username" v-model="formDataLogin.username" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('users')}" name="users">
                    <span v-show="errors.has('users')" class="help is-danger">{{ errors.first('users') }}</span>
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password" v-model="formDataLogin.password" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('pass')}" name="pass">
                    <span v-show="errors.has('pass')" class="help is-danger">{{ errors.first('pass') }}</span>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" v-on:click="submitLogin($event)">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Modal Register -->
        <div class="modal fade" id="myModalRegister" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <form>
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="myModalLabel">Register</h4>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Name" v-model="formDataRegister.name" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('name')}" name="name">
                    <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
                  </div>
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" placeholder="Username" v-model="formDataRegister.username" v-validate="'required|regex:[a-zA-Z0-9_]|min:8'" :class="{'input': true, 'is-danger': errors.has('username')}" name="username">
                    <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="formDataRegister.password" v-validate="'required|min:8|regex:[a-zA-Z0-9_]'" :class="{'input': true, 'is-danger': errors.has('password')}" name="password">
                    <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" v-on:click="submitRegister($event)">Register</button>
                  <!-- <button type="button" class="btn btn-primary" v-on:click="closeLu">Register</button> -->
                </div>
              </div>
            </form>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      formDataLogin: {
        username: '',
        password: ''
      },
      formDataRegister: {
        name: '',
        username: '',
        password: ''
      },
      dataPlayer: []
    }
  },
  methods: {
    closeLu() {
      $('#myModalRegister').modal('hide');
    },
    submitRegister: function (e) {
      e.preventDefault()
      this.$validator.validateAll({
        name: this.formDataRegister.name,
        username: this.formDataRegister.username,
        password: this.formDataRegister.password
      })
      if(!this.errors.any()){
        this.$http.post('http://click-war-api.dimitri.tk/auth/register', this.formDataRegister)
        .then(data => {
          // console.log(data)
          $('#myModalRegister').modal('hide');
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    submitLogin: function (e) {
      e.preventDefault()
      this.$validator.validateAll({
        users: this.formDataLogin.username,
        pass: this.formDataLogin.password
      })
      if(!this.errors.any()){
        this.$http.post('http://click-war-api.dimitri.tk/auth/login', this.formDataLogin)
        .then(({data}) => {
          localStorage.setItem('token', data.access_token)
          $('#myModalLogin').modal('hide');
          this.$router.push('/')
        })
        .catch(err => {
          alert('Username atau Password Salah!')
        })
      }
    }
  },
  mounted () {
    console.log(this.dataPlayer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
 background-image: url('../assets/img/index.jpg') !important;
 background-size: cover;
}

.navbar {
  border: none;
  border-radius: 0
}

span.help.is-danger {
    color: red;
    font-size: 13px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
