<script>
import AppContent from '@/components/Content/Content.vue';
import AppButton from '@/components/Button/Button.vue';
import bannerJpg from '@/assets/banners/contact.jpg';
import BaseInput from '@/components/BaseInput/BaseInput';
import BaseTextarea from '@/components/BaseTextarea/BaseTextarea';
import { mapState } from 'vuex';
import { VueRecaptcha } from 'vue-recaptcha';
import config from '@/config';

const { api, recaptcha } = config;

export default {
  name: 'Contact',
  components: {
    AppContent,
    AppButton,
    BaseInput,
    BaseTextarea,
    VueRecaptcha,
  },
  data() {
    return {
      photos: [bannerJpg],
      ratioInfo: {
        height: 700,
        width: 1920,
      },
      name: '',
      email: '',
      phone: '',
      message: '',
      isSuccess: false,
      isError: false,
      errorMessage: '',
      disableSubmitButton: false,
    };
  },
  computed: {
    ...mapState('site', ['screen']),
    ...mapState('company', ['contact']),
    recaptchaKey() {
      return recaptcha.key;
    },
    isButtonDisabled() {
      return this.name === '' || this.email === '' || this.disableSubmitButton;
    },
  },
  methods: {
    submit: function () {
      console.log('start captcha');
      this.$refs.recaptcha.execute();
    },
    sendMessage(recaptchaToken) {
      const vm = this;
      const { name, email, phone, message } = vm;

      vm.disableSubmitButton = true;

      // We use JSON.stringify here so the data can be sent as a string via HTTP
      const body = JSON.stringify({
        name,
        email,
        phone,
        message,
        token: recaptchaToken,
      });
      const requestOptions = {
        method: 'POST',
        body,
      };

      fetch(api.contact.url, requestOptions)
        .then((response) => {
          if (!response.ok) throw new Error('Error in fetch');
          console.log('raw', response);
          return response.json();
        })
        .then((response) => {
          console.log('parsed', response);
          vm.isSuccess = true;
        })
        .catch((error) => {
          console.log('recaptcha error', error);

          vm.isError = true;
          vm.errorMessage = error.message;
        })
        .finally(() => {
          if (!vm.isError) {
            vm.errorMessage = undefined;
          }
        });
    },
    resetForm() {
      this.isSuccess = false;
      this.isError = false;
      this.disableSubmitButton = false;
      this.name = '';
      this.email = '';
      this.phone = '';
      this.message = '';
      const recaptcha = this.$refs.recaptcha;

      try {
        if (recaptcha != null) {
          recaptcha.reset();
        }
      } catch (e) {
        console.log('Error in reset: ', e);
      }
    },
    onCaptchaVerified: function (recaptchaToken) {
      this.$refs.recaptcha.reset();
      this.sendMessage(recaptchaToken);
    },
    onCaptchaExpired: function () {
      this.$refs.recaptcha.reset();
    },
  },
};
</script>

<template>
  <app-content :class="$style.content">
    <div :class="$style.container">
      <div :class="$style.contactInfo">
        <div :class="$style.addressLine1">{{ contact.address.line[0] }}</div>
        <div :class="$style.city">
          {{ contact.address.city }}
          <span :class="$style.separator"></span>
          {{ contact.address.state }}
          {{ contact.address.zip }}
        </div>
        <div :class="$style.phone">{{ contact.phone }}</div>
      </div>
      <div :class="$style.form">
        <h1 :class="$style.containerHeading">Inquire</h1>
        <div v-if="isError" :class="$style.form">
          <h3>Uh Oh! There was an error!</h3>
          <p>{{ errorMessage }}</p>
        </div>
        <div v-if="isSuccess" :class="$style.form">
          <h3>Success!</h3>
          <p>Your message has been sent!</p>
          <p>
            <app-button @click="resetForm" label="reset" size="medium" />
          </p>
        </div>
        <form
          v-if="!isSuccess"
          @submit.prevent="submit"
          :class="$style.contactForm"
        >
          <div :class="$style.contactForm">
            <div :class="$style.field">
              <base-input
                v-model="name"
                type="text"
                id="name"
                name="name"
                label="Name (required)"
              />
            </div>
            <div :class="$style.field">
              <base-input
                v-model="email"
                type="email"
                id="email"
                required
                label="Email (required)"
                :class="$style.fieldEmail"
              />
            </div>
            <div :class="$style.field">
              <base-input
                v-model="phone"
                type="tel"
                input-id="phone"
                name="phone"
                label="Phone"
                required
              />
            </div>
            <div :class="$style.field">
              <base-textarea
                v-model="message"
                id="message"
                name="message"
                label="Message"
                required
              />
            </div>
            <div :class="$style.buttonContainer">
              <app-button
                type="submit"
                size="large"
                label="Submit"
                :disabled="isButtonDisabled"
              />
            </div>
            <div :class="$style.field">
              <vue-recaptcha
                ref="recaptcha"
                @verify="onCaptchaVerified"
                @expired="onCaptchaExpired"
                size="invisible"
                :sitekey="recaptchaKey"
              >
              </vue-recaptcha>
            </div>
          </div>
        </form>
      </div>
    </div>
  </app-content>
</template>

<style module>
.content {
  max-width: unset;
}
h1.containerHeading {
  margin-bottom: 34px;
}
.contactInfo {
  display: none;
  font-size: 24px;
}
.separator {
  display: inline-block;
  width: 14px;
  height: 13.5px;
  background-color: var(--tan50);
}
.form {
  width: 100%;
}
.contactForm {
  position: relative;
}
.field,
.field input,
.field textarea {
  width: 100%;
  box-sizing: border-box;
}
.field input,
.field textarea {
  border: none;
  border-radius: 0;
  font-family: var(--font-family);
  font-size: 16px;
  font-weight: var(--font-weight-regular);
  height: 42px;
  margin-bottom: 25px;
  max-width: 964px;
  outline: none;
}
.field textarea {
  height: 100px;
}
.buttonContainer {
  margin-bottom: 92px;
}
@media screen and (min-width: 768px) {
  .content {
    padding-right: 10.9375vw;
    padding-left: 10.9375vw;
  }
  .container {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 8.3333vw;
    text-align: left;
  }
  h1.containerHeading {
    margin-top: 0;
    text-align: left;
    margin-bottom: 34px !important;
  }
  .contactInfo {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 80px;
  }
  .addressLine1,
  .addressLine2,
  .city,
  .state,
  .phone {
    padding: 0;
    line-height: 1.5;
    letter-spacing: 1px;
    white-space: nowrap;
  }
  .phone {
    border-right: 0;
  }
}
@media screen and (min-width: 1920px) {
  .content {
    padding-right: 210px;
    padding-left: 210px;
  }
  .container {
    gap: 160px;
  }
  .field input,
  .field textarea {
    font-size: 24px;
  }
}
</style>
