<template>
  <div class="custom-input-wrapper">
    <div
      class="custom-input"
      :class="{ disabled: disabled }"
      @click="focusInput"
      @focus="focusInput"
      ref="box"
      autofocus="false">
      <input
        spellcheck="true"
        autocapitalize="off"
        autocorrect="on"
        ref="input"
        :id="keyInputComponent"
        :value="value"
        :type="type"
        :name="nameInput"
        :disabled="disabled"
        @blur="blurInput"
        @input="submitValue($event)"
        x-webkit-speech
      />
      <label :for="keyInputComponent" ref="label">
        {{ placeholder }}
      </label>
    </div>
    <p class="error-message" ref="error"></p>
  </div>
</template>

<script>

export default {
  name: 'customInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: 'label'
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    timerMSG: false,
    errorMessage: '',
  }),
  computed: {
    typeInput(){
      let type = ''
      switch (this.type) {
        case 'tel':
          type = true
          break;
        case 'pass':
          type = true
          break;
        case 'number':
          type = false
          break;

        default:
          type = false
          break;
      }
      return type
    },
    keyInputComponent() {
      return this.$vnode.key || this.hashGenerator(6)
    },
    nameInput() {
      return this.$vnode.key ? this.$vnode.key : this.hashGenerator(10)
    }
  },
  methods: {
    hashGenerator(sumString) {
      const symbolArr = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
      var randomString = "";
      for (let i = 0; i < sumString; i++) {
        var index = Math.floor(Math.random() * symbolArr.length);
        randomString += symbolArr[index];
      }
      return randomString;
    },
    submitValue(e){
      if(e.target.value.length > 0){
        localStorage.setItem(e.target.name, e.target.value)
      }
      if (this._events?.get) {
        this.$emit('get', e?.target ? e.target : e);
      }
    },
    focusInput() {
      this.$refs.input.focus()
      this.$refs.label.classList.add('active')
    },
    blurInput() {
      if (this.$refs.input.value.length <= 0) {
        this.$refs.label.classList.remove('active')
      }
      if (this.type === 'pass') {
        regSMS.test(this.$refs.input.value) ? this.setErrorMessage('') : this.setErrorMessage('Не верный формат');
      }
      else if (this.type === 'tel') {
        regTell.test(this.$refs.input.value) ? this.setErrorMessage('') : this.setErrorMessage('Не верный формат телефона');
      }
    }
  },
  mounted() {
    const saveData = localStorage.getItem(this.$refs.input.name)
    if (this.value !== '' && this.value != 0) {
      this.$refs.label.classList.add('active')
    } else if (saveData !== null) {
      this.$refs.input.value = saveData
      this.$refs.label.classList.add('active')
    }
  }
}
</script>

<style scoped lang="scss">

.custom-input-wrapper {
  // margin-bottom: 0.5em;
  display: flex;
  justify-content: center;
  width: calc(100% - 40px);
  margin: 0 auto 2em;
}
.custom-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid #5C5C5C;
  width: inherit;
  overflow: hidden;
  line-height: 1em;
  height: 2.8em;
  align-items: flex-end;

  & > input {
    border: none;
    outline: none;
    font-size: 1em;
    font-family: "AGOptCyrillic";
    width: fit-content;
    padding: 14px 0 4px;
    overflow: hidden;
    padding: 0 0 0 5px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    --moz-appearance: textfield;
  }
  & > label {
    position: absolute;
    color: #C0C0C0;
    top: 2em;
    left: 1em;
    font-size: 1rem;
    font-family: "AGOptCyrillic";
    cursor: text;
    transition: transform 0.2s ease-out, color 0.2s ease-out;
    width: 100%;
    text-align: left;
  }
  .active {
    transform: translate(-4em, -1.2em) scale(0.6);
    color: #C0C0C0;
  }
}

.error-message {
  color: var(--red-dark-fon);
  font-size: 1em;
}
</style>
