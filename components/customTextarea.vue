<template>
  <div class="custom-textarea-wrapper">
    <div class="custom-textarea"  
    autofocus="false"
    @click="focusTextarea"
    @focus="focusTextarea"
    >
    <!-- :cols="cols" -->
    <textarea class="textarea" 
      :rows="rows"
      :cols="cols"
      autocomplete="on"
      autocorrect="on"
      wrap="soft"
      ref="textarea"
      :id="keyTextareaComponent"
      :name="nameTextarea"
      @blur="blurTextarea"
      :disabled="disabled"
      :form="form"
      @input="getValue($event)"
      >{{ value }}</textarea>
      <label :for="keyTextareaComponent" ref="label">
        {{ placeholder }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'customTextarea',
  components: {
  },
  props: {
    rows:{
      type: String,
      default: 2
    },
    cols:{
      type: String,
      default: 4
    },
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: 'text'
    },
    form: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
  }),
  computed: {
    keyTextareaComponent() {
      return this.$vnode.key || this.hashGenerator(6)
    },
    nameTextarea() {
      return this.$vnode.key ? this.$vnode.key : this.hashGenerator(10)
    }
  },
  methods:{
    hashGenerator(sumString) {
      const symbolArr = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
      var randomString = "";
      for (let i = 0; i < sumString; i++) {
        var index = Math.floor(Math.random() * symbolArr.length);
        randomString += symbolArr[index];
      }
      return randomString;
    },
    focusTextarea() {
      this.$refs.textarea.focus()
      this.$refs.label.classList.add('active')
      this.getValue(this.$refs.textarea)
    },
    blurTextarea() {
      if (this.$refs.textarea.value.length <= 0) {
        this.$refs.label.classList.remove('active')
      }
    },
    getValue(e){
      const textarea = e?.target || e
      if(textarea.value.length < 20){
        textarea.setAttribute('rows', 1)
      } else if(textarea.value.length > 20 && textarea.value.length < 40){
        textarea.setAttribute('rows', 2)
      } else if(textarea.value.length > 40) {
        textarea.setAttribute('rows', 3)
      }
      this.submitValue(textarea)
    },
    submitValue(e){
      if(e.value.length > 0){
        localStorage.setItem(e.name, e.value)
      }
      if (this._events?.get) {
        this.$emit('get', e?.target ? e.target : e);
      }
    },
  },
  watch:{
  },
  mounted() {
    const saveData = localStorage.getItem(this.$refs.textarea.name)
    if (this.value !== '' && this.value != 0) {
      this.$refs.label.classList.add('active')
    } else if (saveData !== null) {
      this.$refs.textarea.value = saveData
      this.$refs.label.classList.add('active')
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-textarea-wrapper{
  // margin-bottom: 0.5em;
  display: flex;
  justify-content: center;
  // padding: 10px 0 0 0;
  width: calc(100% - 40px);
  margin: 0 auto 2em;
  .custom-textarea{
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    border-bottom: 1px solid #5C5C5C;
    width: inherit;
    line-height: 1em;
    height: 2.8em;
    align-items: flex-end;
  
    textarea {
      border: none;
      outline: none;
      font-size: 1em;
      font-family: "AGOptCyrillic";
      overflow: hidden;
      resize: none;
    }
    label {
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
      transform: translate(-4em, -3em) scale(0.6);
      color: #C0C0C0;
    }
  }
}
</style>