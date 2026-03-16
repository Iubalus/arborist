<template>
  <Page title="Outcomes">
    <LabelText
        v-model:value="rawRevenueFormula"
        label="Revenue Formula"
    />
    <LabelText
        v-model:value="rawCostFormula"
        label="Cost Formula"
    />
    <div>Total Revenue</div>
    <div class="revenue-formula">
      <span
          v-for="(v, i) in revenueFragments"
          :class="v.type"
          :key="`${i}_${v.text}`"
      >{{ v.text }}</span>
      <span class="operator">-</span>
      <span
          v-for="(v, i) in costFragments"
          :class="v.type"
          :key="`${i}_${v.text}`"
      >{{ v.text }}</span>
    </div>
  </Page>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import {LabelText, Page} from '@/components/bits';

export default defineComponent({
  components: {LabelText, Page},
  data() {
    return {
      rawRevenueFormula: "",
      rawCostFormula: ""
    }
  },
  computed: {
    revenueFragments() {
      if (!this.rawRevenueFormula) {
        return [{text: "Revenue", type: "revenue-outcome"}]
      }
      return this.tokenize(this.rawRevenueFormula, "revenue-outcome");
    },
    costFragments() {
      if (!this.rawCostFormula) {
        return [{text: "Cost", type: "cost-outcome"}]
      }
      return this.tokenize(this.rawCostFormula, "cost-outcome")
    }
  },
  methods:{
    tokenize(source:string, outcome: string){
      let operators = "()+-/*";
      let operatorSubstitutes = {
        "*": "x"
      } as any
      let stream = [];
      let word = "";
      for (let i = 0; i < source.length; i++) {
        if (operators.includes(source[i])) {
          if (!!word && !!word.trim()) {
            stream.push({
              text: word,
              type: outcome
            })
            word = "";
          }
          let op = source[i];
          stream.push({
            text: operatorSubstitutes[op] || op,
            type: "operator"
          })
        } else {
          word += source[i];
        }
      }
      if (!!word && !!word.trim()) {
        stream.push({
          text: word,
          type: outcome
        })
      }
      return stream;
    }
  }
})
</script>
<style scoped>
.revenue-formula {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  .revenue-outcome {
    background: #BCE1F7;
    padding: 2px 5px;
    border-radius: 3px;
  }

  .cost-outcome {
    background: #d5dfef;
    padding: 2px 5px;
    border-radius: 3px;
  }

  .operator {
    font-weight: bold;
    font-size: 16px;
    color: blue;
  }
}

</style>
