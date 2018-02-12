<template>
  <div class="commcode">
    <h1>{{ msg }}</h1>
    <p style="white-space: pre-inline;">{{ input }}: {{ counter }}</p>
    <br/>
     <textarea v-model="input"></textarea>
     <br/>
     <button v-on:click="pop">Add 1</button>
  </div>
</template>

<script>
export default {
  name: 'Commcode2sql',
  data() {
    return {
      msg: 'Commcode2sql',
      input: '',
      counter: 0,
    };
  },
  methods: {
    pop() {
      /* eslint-disable */
      console.log('helele');
      alert('helele');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
