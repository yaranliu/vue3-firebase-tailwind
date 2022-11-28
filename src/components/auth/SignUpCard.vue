<script setup>
import { reactive, computed } from 'vue'

import { useAuthStore} from "@/stores/auth";
import SignInWithProviders from "@/components/auth/SignInWithProviders.vue";

import { useI18n } from "vue-i18n";
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, minLength } from '@vuelidate/validators'
import { i18nErrorMessage} from "@/lib/i18nErrorMessage"
const auth = useAuthStore();


const { t } = useI18n()

const user = reactive({
  email: '',
  password: '',
  passwordConfirmation: ''
})



const rules = computed (() => { return {
  email: { required, email },
  password: { required, minLength: minLength(6) },
  passwordConfirmation: { sameAsPassword: sameAs(user.password) }
}})

const v$ = useVuelidate(rules, user, { $autoDirty: true })

const emit = defineEmits(['gotoSignIn', 'signedUp'])

const register = () => {
  auth.register(user.email, user.password).then(user => {
    // console.log(user)
    emit('signedUp')
  }).catch(error => {
    console.log(error)
  });
}

</script>

<template>
  <form class="auth-card">
    <label for="user-email" class="auth-input-label">{{ t('emailLabel')}}</label>
    <input id="user-email" type="email" autocomplete="e-mail"   :placeholder="t('emailPlaceholder')" v-model.trim="user.email" class="auth-input" :class="{ 'auth-input-error': v$.email.$invalid && v$.email.$dirty }">
    <div class="validation-error-message" :class="{ 'opacity-100' : v$.email.$invalid }">{{ t(i18nErrorMessage(v$.email.$errors[0])) }}</div>

    <label for="user-password" class="auth-input-label mt-6">{{ t('passwordLabel')}}</label>
    <input id="user-password" type="password" autocomplete="new-password" :placeholder="t('passwordLabel')" v-model.trim="user.password" class="auth-input" :class="{ 'auth-input-error': v$.password.$invalid && v$.password.$dirty }">
    <div class="validation-error-message" :class="{ 'opacity-100' : v$.password.$invalid }">{{ t(i18nErrorMessage(v$.password.$errors[0])) }}</div>

    <label for="user-confirm" class="auth-input-label mt-6">{{ t('confirmPasswordPlaceholder')}}</label>
    <input id="user-confirm" type="password" autocomplete="new-password" :placeholder="t('confirmPasswordPlaceholder')" v-model.trim="user.passwordConfirmation" class="auth-input" :class="{ 'auth-input-error': v$.passwordConfirmation.$invalid && v$.passwordConfirmation.$dirty }">
    <div class="validation-error-message" :class="{ 'opacity-100' : v$.passwordConfirmation.$invalid }">{{ t(i18nErrorMessage(v$.passwordConfirmation.$errors[0])) }}</div>

    <button @click="register" class="auth-primary-button mt-6" :disabled="v$.$invalid">
      {{ t('signUpButton')}}
    </button>
    <div class="flex items-center mt-8 mb-4 text-gray-400">
      <hr class="flex-auto">
      <span class="lex-shrink text-xs text-center mx-2 whitespace-pre-wrap">{{ t('providersLabel')}}</span>
      <hr class="flex-auto">
    </div>
    <SignInWithProviders class="mt-2" @signed-in="emit('signedIn')" />
    <div class="auth-secondary-button mt-8" @click="emit('gotoSignIn')">
      {{ t('gotoSignIn') }}
    </div>
  </form>
</template>

<style scoped>

</style>

<i18n locale="tr">
{
  "emailLabel": "E posta adresi",
  "emailPlaceholder": "E-posta",
  "passwordLabel": "Parola",
  "passwordPlaceholder": "Parola",
  "confirmPasswordLabel": "Parola (tekrar)",
  "confirmPasswordPlaceholder": "Parola (tekrar)",
  "signUpButton": "Kaydol",
  "providersLabel": "ya da sosyal medya hesabınızı kullanın",
  "gotoSignIn": "Zaten bir hesabım var!",
  "validation": {
    "noError": "",
    "email": {
      "required": "Lütfen e-posta adresinizi yazın",
      "email": "Lütfen geçerli bir e-posta adresi yazın",
    },
    "password": {
      "required": "Lütfen parolanızı yazın",
      "minLength": "Parolanız en az 6 karakter uzunluğunda olmalıdır",

    },
    "passwordConfirmation": {
      "sameAsPassword": "Parolanız uyuşmuyor"
    }
  }
}
</i18n>
<i18n locale="en">
{
  "emailLabel": "Email address",
  "emailPlaceholder": "E-mail",
  "passwordLabel": "Password",
  "passwordPlaceholder": "Password",
  "confirmPasswordLabel": "Password",
  "confirmPasswordPlaceholder": "Password",
  "signUpButton": "Sign Up",
  "providersLabel": "or continue with",
  "gotoSignIn": "Create your account now!",
  "validation": {
    "noError": "",
    "email": {
      "required": "Please provide your e-mail address",
      "email": "Please provide a valid email address"
    },
    "password": {
      "required": "Please provide a password",
      "minLength": "You password must be minimum 6 characters"

    },
    "passwordConfirmation": {
      "sameAsPassword": "Your passwords do not match"
    }
  }
}
</i18n>
