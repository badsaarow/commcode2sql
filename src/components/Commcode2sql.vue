<template>
  <div class="commcode">
    <h1>{{ msg }}</h1>
     <textarea v-model="input"></textarea>
     <br/>
     <button v-on:click="json2sql(input)">Add 1</button>
  </div>
</template>

<script>
export default {
  name: 'Commcode2sql',
  data() {
    return {
      msg: 'Commcode2sql',
      input: ''
    };
  },
  methods: {
    json2sql(jsonString) {
      this.parseJson(jsonString);
    },
    parseJson(jsonString) {
      /* eslint-disable */
      console.log(jsonString);
      let json;
      try {
        json = JSON.parse(jsonString);
      } catch(e) {
        console.log(e);
        alert('failed to parsing json : ' +  e.name);
        return;
      }
      
      console.log(json);
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
