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
      input: '',
    };
  },
  methods: {
    json2sql(jsonString) {
      /* eslint-disable */
      const commcodes = this.parseJson(jsonString);
      if (!commcodes) {
        console.log('no commdes');
        return;
      }

      for (let entity of commcodes.commcodes) {
        console.log(entity.commcode);
        for (let detail of entity.detailcodes) {
          console.log(detail.detailcode);
          //todo: make insert sql or update sql
        }
      }

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

      if (json.commcodes) {
        console.log('full commcode');
        return json;
      } else if (json.commcode) {
        console.log('partial commcode');
        if (json.detailcodes) {
          console.log('하나의 commcode full set');
          //todo: full commcode set으로 변환
        } else if (json.detailcode) {
          console.log('단독 detailcode');
          //todo: full commcode set으로 변환
        } else {
          alert("정상적인 commcode JSON이 아닙니다");
          return;  
        }
      } else {
        alert("정상적인 commcode JSON이 아닙니다");
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
