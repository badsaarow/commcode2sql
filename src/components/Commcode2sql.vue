<template>
  <div class="commcode">
    <h1>{{ msg }}</h1>
     <textarea
      placeholder="여기에 commcode json 붙여넣으시오"
      cols="100"
      rows="10"
      v-model="jsonString">
     </textarea>
     <br/>
     <button v-on:click="json2sql('insert')">INSERT문 만들기</button>&nbsp;
     <button v-on:click="json2sql('update')">UPDATE문 만들기</button>&nbsp;
     <input type="checkbox" id="checkbox" v-model="isSingleLineSQL">
     <label for="checkbox">한줄SQL</label>
     &nbsp;&nbsp;&nbsp;
     <button type="button"
      v-clipboard:copy="sqlString"
      v-clipboard:success="onCopy"
      v-clipboard:error="onCopyError">Copy!</button>
     <br/>
     <br/>
     <textarea
      readonly
      cols="100"
      rows="10"
      v-model="sqlString">
     </textarea>
  </div>
</template>

<script>
export default {
  name: 'Commcode2sql',
  data() {
    return {
      msg: '공통코드 SQL 만들기',
      jsonString: '',
      sqlString: '',
      isSingleLineSQL: false,
    };
  },
  methods: {
    onCopy(e) {
      /* eslint-disable */
      console.log('copied : ' + e.text);
    },
    onCopyError() {
      /* eslint-disable */
      console.log('failed to copy texts');
      alert('failed to copy texts');
    },
    json2sql(crud) {
      /* eslint-disable */
      this.sqlString = '';
      const commcodes = this.parseJson(this.jsonString);
      if (!commcodes) {
        console.log('no commcodes');
        return;
      }

      for (let entity of commcodes.commcodes) {
        console.log(entity);
        for (let detail of entity.detailcodes) {
          console.log(detail);
          let commcode = this.makeCommcodeEntity(entity.commcode, detail);
          let sql;
          if (crud === 'insert') {
            sql  = `
                  INSERT INTO [dbo].[CommCodeTBL]
                              ([CommCode]
                              ,[DetailCode]
                              ,[CName]
                              ,[CValue]
                              ,[CMemo]
                              ,[COrder]
                              ,[DelYN]
                              ,[Creator])
                          VALUES
                              ('${commcode.commcode}'
                              ,'${commcode.detailcode}'
                              ,'${commcode.cname}'
                              ,'${commcode.cvalue}'
                              ,'${commcode.cmemo}'
                              ,${commcode.corder}
                              ,${commcode.delyn}
                              ,'system');
                `;
          } else if (crud === 'update') {
              sql = `
                    UPDATE [dbo].[CommCodeTBL]
                      SET [CName] = '${commcode.cname}'
                          ,[CValue] = '${commcode.cvalue}'
                          ,[CMemo] = '${commcode.cmemo}'
                          ,[COrder] = ${commcode.corder}
                          ,[DelYN] = ${commcode.delyn}
                          ,[Updater] = 'system'
                          ,[UpdateDate] = getdate()
                    WHERE CommCode = '${commcode.commcode}'
                      AND DetailCode = '${commcode.detailcode}';
              `;
          } else {
            console.log(`invalid crud: ${crud}`);
            return;
          }
          if (this.isSingleLineSQL) {
            this.sqlString += this.makeFlatSql(sql) + '\n';
          } else {
            this.sqlString += sql + '\n';
          }

        }
      }

    },
    makeCommcodeEntity(commcode, detail) {
      //ex. commcode:'OPT', detail: {"detailcode":"AC","cname":...}
      let commcodeEntity = {};
      commcodeEntity["commcode"] = commcode;
      commcodeEntity["detailcode"] = detail.detailcode;
      commcodeEntity["cname"] = detail.cname;
      commcodeEntity["cvalue"] = !detail.cvalue ? '': detail.cvalue;
      commcodeEntity["cmemo"] = !detail.cmemo ? '': detail.cmemo;
      commcodeEntity["corder"] = detail.corder;
      commcodeEntity["delyn"] = detail.delyn ? 1: 0;
      return commcodeEntity;
    },
    makeFlatSql(sql) {
      return sql.replace(/\r?\n?/g, '').replace(/\s\s+/g, ' ');
    },
    parseJson(jsonString) {
      /* eslint-disable */
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
        let newjson = {};
        newjson["commcodes"] = [];
        newjson["commcodes"].push([]);
        newjson["commcodes"][0]["commcode"] = json.commcode;
        if (json.detailcodes) {
          console.log('하나의 commcode full set');
          newjson["commcodes"][0]["detailcodes"] =  JSON.parse(JSON.stringify(json.detailcodes));
          return newjson;
        } else if (json.detailcode) {
          console.log('단독 detailcode');
          newjson["commcodes"][0]["detailcodes"] = [];
          newjson["commcodes"][0]["detailcodes"].push(JSON.parse(JSON.stringify(json)));
          return newjson;
        } else {
          alert("정상적인 commcode JSON이 아닙니다");
          return;
        }
      } else {
        alert("정상적인 commcode JSON이 아닙니다");
        return;
      }
    }
  }
};
</script>
