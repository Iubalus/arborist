<template>
    <div class="label-container">
        <label v-show="!!label">{{ label }}</label>
        <input v-model="internalValue" type="text" :disabled="readOnly" />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        label: {
            type: String,
            default: () => null
        },
        value: {
            type: String,
            required: true
        },
        readOnly: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:value'],
    data() {
        return {
            internalValue: this.value
        }
    },
    watch: {
        internalValue: {
            handler: function (v: string) {
                //@ts-ignore
                this.$emit('update:value', v);
            }
        }
    }
})

</script>
<style scoped>
.label-container {
    margin-top: 10px;
    width: 100%;
    box-sizing: border-box;

    label {
        font-size: 0.8em;
        display: block;
        margin-bottom: 3px;
    }

    input {
        padding: 5px 10px;
        width: 100%;
    }
}
</style>
