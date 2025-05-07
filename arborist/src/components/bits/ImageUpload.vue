<template>
    <div>
        <input @change="handleImage" type="file" accept="image/*">
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        value: {
            type: String,
            required: true
        }
    },
    emits: ["update:value"],
    data() {
        return {
            internalEncodedImage: this.value
        }
    },
    methods: {
        handleImage(e: any) {
            const reader = new FileReader();
            reader.onload = () => {
                // this.encoded = e.target.result;
                if (reader.result) {
                    this.internalEncodedImage = reader.result.toString();
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    },
    watch: {
        value: {
            handler: function (v) {
                this.internalEncodedImage = v;
            }
        },
        internalEncodedImage: {
            handler: function (v) {
                if(this.value !== v){
                    this.$emit("update:value", v);                    
                }
            }
        }
    }
})

</script>
<style scoped></style>
