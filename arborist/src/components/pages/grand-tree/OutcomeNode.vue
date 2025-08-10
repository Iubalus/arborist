<template>
    <div>
        <details :open="!selectedType">
            <summary>Type {{ selectedType || "Unset" }}</summary>
            <Selct
                label="Type"
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
        }
    }
})
</script>
<style scoped></style>
