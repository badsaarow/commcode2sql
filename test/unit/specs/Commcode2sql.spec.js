import Vue from 'vue';
import Commcode2sql from '@/components/Commcode2sql';

describe('Commcode2sql.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Commcode2sql);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('h1').textContent)
      .to.equal('공통코드 SQL 만들기');
  });
});
