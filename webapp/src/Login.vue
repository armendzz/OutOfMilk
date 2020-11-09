<template>
  <div>
    <div class="outer">
      <div class="middle">
        <div class="inner">
          <div class="card">
            <div
              v-if="getError"
              class="alert mt-2  mr-2 ml-2 alert-danger"
              role="alert"
            >
              {{ getError }}
            </div>
            <div class="login-or">
              <hr class="hr-or" />
              <span class="span-or">LOGIN</span>
            </div>
            <div class="card-content">
              <div class="mr-2 ml-2">
                <div class="form-group">
                  <div class="input-group mt-2 mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        ><v-icon name="envelope" class="icon"
                      /></span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      v-model="user.email"
                      placeholder="Email"
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        ><v-icon name="key" class="icon"
                      /></span>
                    </div>
                    <input
                      v-model="user.password"
                      type="password"
                      class="form-control"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div class="d-flex justify-content-end">
                  <button
                    @click="login"
                    class="btn btn-success mr-2 btn-lg mb-2"
                  >
                    <v-icon name="sign-in-alt" class="icon" /> Login
                  </button>
                  <button class="btn btn-primary btn-lg mb-2">
                    <v-icon name="fingerprint" class="icon" /> Register
                  </button>
                </div>
                <hr />

                <div class="d-flex mb-2 justify-content-center">
                  <span class="forgot-text">Forgot your password?</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    user: {
      handler() {
        this.$store.state.currentUser.error = "";
      },
      deep: true,
    },
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },

  computed: {
    getError() {
      return this.$store.state.currentUser.error;
    },
  },
  methods: {
    login() {
      this.$store.dispatch("currentUser/loginUser", this.user);
    },
  },
};
</script>

<style scoped>
.outer {
  display: table;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.forgot-text {
  color: #a7a8aa;
}
.form-control {
  font-size: 1.5rem;
}
.card-header {
  font-size: 1.5rem;
}
.middle {
  display: table-cell;
  vertical-align: middle;
}

.inner {
  margin-left: auto;
  margin-right: auto;
  width: auto;
  max-width: 400px;
  /*whatever width you want*/
}
.login-or {
  position: relative;
  font-size: 1.5rem;
  color: rgb(7, 7, 7);
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.span-or {
  display: block;
  position: absolute;
  left: 50%;
  top: -2px;
  margin-left: -20%;
  background-color: #fff;
  width: 40%;
  text-align: center;
}
.hr-or {
  background-color: #cdcdcd;
  height: 2px;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}
</style>
