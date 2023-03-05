<script>
import AppContent from '@/components/Content/Content.vue';
import AppButton from '@/components/Button/Button.vue';
import bannerJpg from '@/assets/banners/contact.jpg';
import BaseInput from '@/components/BaseInput/BaseInput';
import BaseTextarea from '@/components/BaseTextarea/BaseTextarea';
import { mapState } from 'vuex';

export default {
  name: 'Contact',
  components: {
    AppContent,
    AppButton,
    BaseInput,
    BaseTextarea,
  },
  data() {
    return {
      photos: [bannerJpg],
      ratioInfo: {
        height: 700,
        width: 1920,
      },
    };
  },
  computed: {
    ...mapState('site', ['screen']),
    ...mapState('company', ['contact']),
  },
  methods: {
    sendMessage() {},
  },
};
</script>

<template>
  <app-content :class="$style.content">
    <div :class="$style.container">
      <div :class="$style.contactInfo">
        <div :class="$style.addressLine1">{{ contact.address.line[0] }}</div>
        <div :class="$style.city">
          {{ contact.address.city }} | {{ contact.address.state }}
          {{ contact.address.zip }}
        </div>
        <div :class="$style.phone">{{ contact.phone }}</div>
      </div>
      <div :class="$style.form">
        <h1 :class="$style.containerHeading">Inquire</h1>
        <div :class="$style.contactForm">
          <div :class="$style.field">
            <base-input
              type="text"
              id="name"
              name="name"
              label="Name (required)"
            />
          </div>
          <div :class="$style.field">
            <base-input
              type="email"
              id="email"
              required
              label="Email (required)"
              :class="$style.fieldEmail"
            />
          </div>
          <div :class="$style.field">
            <base-input
              type="tel"
              input-id="phone"
              name="phone"
              label="Phone"
              required
            />
          </div>
          <div :class="$style.field">
            <base-textarea
              id="message"
              name="message"
              label="Message"
              required
            />
          </div>
          <div :class="$style.buttonContainer">
            <app-button @click="sendMessage" size="large" label="Submit" />
          </div>
        </div>
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
    color: var(--gray40);
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
