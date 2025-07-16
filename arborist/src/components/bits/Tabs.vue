<template>
    <div class="tab-container">
        <span
            v-for="(tab, i) in internalTabs"
            :class="['tab', tab.active ? 'active' : '']"
            @click="() => activateTab(i)"
        >
            {{ tab.title }}
        </span>
    </div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import FlexRow from './FlexRow.vue';

export default defineComponent({
    components: { FlexRow },
    props: {
        tabs: {
            type: Array as PropType<{ title: String, active: boolean }[]>,
            required: true
        }
    },
    emits: ['tab-selected'],
    data() {
        return {
            internalTabs: this.tabs
        }
    },
    methods: {
        activateTab(index: number) {
            this.internalTabs.forEach((tab, i) => {
                tab.active = i === index;
            })
            this.$emit('tab-selected', index);
        }
    }
})

</script>
<style scoped>
.tab-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 7px 0;
}

.tab {
    padding: 10px 10px 10px 10px;
    background: rgb(245, 245, 245);
    border-radius: 25px 0 25px 0;
    box-sizing: border-box;
    margin-bottom: -13px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .6);
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &.active {
        font-weight: bold;
        background: white;
    }

    &:hover {
        cursor: pointer;
        background: rgb(235, 235, 235);
    }
}
</style>
