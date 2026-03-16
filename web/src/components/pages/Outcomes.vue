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
      <div
          v-for="(v, i) in revenueFragments"
          :key="`${i}_${v.text}`"
          style="display: grid; gap:10px;"
      >
        <span :class="v.type">{{ v.text }}</span>
        <div v-if="v.children && v.children.length > 0" class="revenue-formula">
          <span v-for="(c, j) in v.children" :key="`${j}_${c.text}`" :class="c.type">{{ c.text }}</span>
        </div>
      </div>
      <span class="operator">-</span>
      <div
          v-for="(v, i) in costFragments"
          :key="`${i}_${v.text}`"
      >
        <span :class="v.type">{{ v.text }}</span>
        <div v-if="v.children && v.children.length > 0" class="revenue-formula">
          <span v-for="(c, j) in v.children" :key="`${j}_${c.text}`" :class="c.type">{{ c.text }}</span>
        </div>
      </div>
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
        return [{text: "Revenue", type: "revenue-outcome", children: []}]
      }
      return this.tokenize(this.rawRevenueFormula, "revenue-outcome");
    },
    costFragments() {
      if (!this.rawCostFormula) {
        return [{text: "Cost", type: "cost-outcome", children: []}]
      }
      return this.tokenize(this.rawCostFormula, "cost-outcome")
    }
  },
  methods: {
    tokenize(source: string, outcome: string): any {
      let operators = "()+-/*";
      let operatorSubstitutes = {
        "*": "x"
      } as any
      let stream = [];
      let word = "";
      let inSubParse = false;
      let subParse = "";
      let children = [];
      let depth = 0;
      for (let i = 0; i < source.length; i++) {
        if (!inSubParse && source[i] === '[') {
          inSubParse = true;
          continue;
        }
        if (inSubParse && source[i] == ']') {
          inSubParse = false;
          children = this.tokenize(subParse, outcome);
          subParse = "";
          continue;
        }
        if (inSubParse) {
          subParse += source[i];
          continue;
        }
        if (operators.includes(source[i])) {
          if (source[i] === '(') {
            depth++;
          }
          if (!!word && !!word.trim()) {
            stream.push({
              text: word,
              type: outcome,
              children: children
            })
            word = "";
            children = [];
          }
          let op = source[i];
          stream.push({
            text: operatorSubstitutes[op] || op,
            type: `operator depth-${depth}`
          })
          if (source[i] === ')') {
            depth--;
          }
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
  align-items: start;
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

    &.depth-1 {
      color: gold;
    }

    &.depth-2 {
      color: magenta;
    }

    &.depth-3 {
      color: limegreen;
    }

    &.depth-4 {
      color: cyan;
    }

    &.depth-5 {
      color: red;
    }
  }
}

</style>
