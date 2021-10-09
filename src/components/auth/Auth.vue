<template>
  <div class="container-auth">
    <div class="box">
      <h1>Boa Entrega</h1>

      <form class="form-box" @submit.prevent.enter="logar">
        <div>
          <!-- Input de email -->
          <div class="form-row">
            <label>E-mail: </label>
            <div class="input-form">
              <input type="email" name="email" v-model="form.email" autocomplete="username"/>
            </div>
          </div>

          <!-- Input de senha -->
          <div class="form-row">
            <label>Senha: </label>
            <div class="input-form">
              <input type="password" name="password" v-model="form.password" autocomplete="current-password"/>
            </div>
          </div>
        </div>

        <!-- Botão de Login -->
        <div>
          <button type="submit" @click.prevent="logar">
            <span>Entrar</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AuthenticateService from "@/services/AuthenticationService";

export default {
  name: "Auth",
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    logar () {
      const login = this.form;

      if (this.hasLogin(login)) {
        AuthenticateService.login(login)
        .then((response) => {
          if (!response.err_status) {
            localStorage.setItem("__chave_usuario", btoa(
              JSON.stringify({
                ...response
              })
            ));

            this.$toast.success(`Usuário logado`);
            this.$router.push({ name: 'MainView' });

          } else {
            this.$toast.error(`${ Object.prototype.hasOwnProperty.call(response,'message') ? response.message: response }`);
          }
        });
      }
    },
    hasLogin (login) {
      if (login.email == "" || login.password == "") {
        return false;
      }
      
      return true;
    }
  }
}
</script>