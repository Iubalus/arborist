<template>
    <div class="float-tab">
        <div class="branding">
            <img src="/image/arborist-full.png"></img>
        </div>
        <table>
            <tbody>
                <tr
                    v-for="(tab, i) in internalTabs"
                    @click="() => activateTab(i)"
                >
                    <td :class="['tab', tab.active ? 'active' : '']">{{ tab.title }}</td>
                </tr>
            </tbody>
        </table>
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
.float-tab {
    position: fixed;
    top: 20px;
    left: 20px;
    width: 230px;
    z-index: 2;
    overflow: hidden;

    .branding {
        margin-left: 10px;

        img {
            height: 150px;
        }
    }

    table {
        width: 100%;
    }
}



.tab {
    padding: 10px 10px 10px 10px;
    background: rgb(245, 245, 245);
    border-radius: 25px 0 0 25px;
    box-sizing: border-box;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .6);
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: right;
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
