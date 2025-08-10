<template>
    <div :class="['outcome-node', outcomeClass]">
        <details :open="!selectedType">
            <summary>{{ selectedType || "Unset" }}</summary>
            <Selct
                v-model:selected="innerContent.type"
                :options="typeOptions"
            />
        </details>
        <LabelText
            v-model:value="innerContent.text"
            label="Outcome"
            big-text
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { LabelText, Page, Tree, Selct } from '@/components/bits';
export default defineComponent({
    components: { Page, Tree, LabelText, Selct },
    props: {
        content: {
            type: Object,
            default: () => { }
        }
    },
    emits: ['update:content'],
    watch: {
        innerContent: {
            handler(v) {
                if (JSON.stringify(v) !== JSON.stringify(this.content)) {
                    this.$emit("update:content", v);
                }
            },
            deep: true
        },
        content: {
            handler(v) {
                this.innerContent = v;
            },
            deep: true
        }
    },
    data() {
        return {
            innerContent: this.content
        }
    },
    computed: {
        typeOptions() {
            return [{ value: 'BUSINESS', label: 'Business' }, { value: 'PRODUCT', label: 'Product' }];
        },
        selectedType() {
            return (this.typeOptions.find(v => v.value === this.innerContent.type) || {}).label;
        },
        outcomeClass() {
            if (this.innerContent.type === 'BUSINESS') {
                return 'business-outcome'
            }
            if (this.innerContent.type === 'PRODUCT') {
                return 'product-outcome'
            }
            return null;
        }
    }
})
</script>
<style scoped>
.outcome-node {
    display: grid;
    justify-items: start;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 0 3px rgba(0, 0, 0, .6);

    >details {
        width: 100%;
        text-align: left;
    }

    &.business-outcome {
        background: linear-gradient(white 20%, rgba(205, 195, 238, 0.5));
    }

    &.product-outcome {
        background: linear-gradient(white 20%, rgba(255, 237, 205, 0.5));
    }
}
</style>
