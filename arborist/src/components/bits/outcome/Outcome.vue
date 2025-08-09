<template>
    <div :class="['outcome', styleClass]">
        <div class="outcome-options-wrap">
            <LabelText
                v-model:value="internalValue.leading"
                label="Joiner"
            />
            <Selct
                v-model:selected="internalValue.type"
                label="Type"
                :options="typeOptions"
            ></Selct>
        </div>
        <LabelText
            v-model:value="internalValue.text"
            label="Outcome"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Outcome } from '../../types/Outcome';
import Selct from '@/components/bits/select/Selct.vue';
import LabelText from '@/components/bits/text/LabelText.vue';

export default defineComponent({
    components: { LabelText, Selct },
    props: {
        value: {
            type: Object as PropType<Outcome>,
            default: () => null
        }
    },
    emits: ['update:value'],
    data() {
        return {
            internalValue: this.value,
            typeOptions: [
                {
                    value: "PRODUCT",
                    label: "Product Outcome"
                },
                {
                    value: "BUSINESS",
                    label: "Business Outcome"
                }
            ],
        }
    },
    computed: {
        styleClass(): string {
            if (this.internalValue.type === 'PRODUCT') {
                return 'product-outcome'
            }
            if (this.internalValue.type === 'BUSINESS') {
                return 'business-outcome'
            }
            return ""
        }
    },
    watch: {
        internalValue: {
            handler: function (v: string) {
                //@ts-ignore
                this.$emit('update:value', v);
            },
            deep: true
        }
    }
})

</script>
<style scoped>
.outcome {
    margin: -10px -10px 0 -10px;
    padding: 10px;
    border-bottom: solid 2px rgba(0, 0, 0, .1);

    &.product-outcome {
        background: rgb(255, 249, 213);
    }

    &.business-outcome {
        background: rgb(218, 221, 255);
    }
}

.outcome-options-wrap {
    display: flex;
    gap: 10px;
    align-content: center;
}
</style>
