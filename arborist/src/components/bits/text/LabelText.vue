<template>
    <Labelled :label="label">
        <textarea
            v-if="bigText"
            v-model="internalValue"
            type="text"
            :disabled="readOnly"
        ></textarea>
        <input
            v-else
            :class="[transparent ? 'transparent-back' : '']"
            v-model="internalValue"
            type="text"
            :disabled="readOnly"
        />
    </Labelled>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Labelled from '../container/Labelled.vue';

export default defineComponent({
    components: { Labelled },
    props: {
        label: {
            type: String,
            default: () => null
        },
        value: {
            type: String,
            default: () => null
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        bigText: {
            type: Boolean,
            default: false
        },
        transparent: {
            type: Boolean,
            default: true
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
input {
    padding: 5px 10px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    border: solid 1px black;

    &.transparent-back {
        background: transparent;
    }
}

textarea {
    width: 100%;
    min-height: 100px;
    box-sizing: border-box;
    background: transparent;
    border-radius: 5px;
    margin: 0;
    padding: 10px;
}
</style>
