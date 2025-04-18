<template>
    <div class="canvas">
        <div v-for="(card, i) in cards" :key="i" class="card" :style="`top:${card.y}px;left:${card.x}px;z-index:${card.z};`">
            <div class="grab-arrow" draggable="true" v-on:dragstart="(e) => dragStart(e, i)"
                v-on:drag="(e) => drag(e, i)">
                &#10021;
            </div>
            {{ card.text }}
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            dragStartX: 0,
            dragStartY: 0,
            lastMoved: 0,
            canvasWidth: 1000,
            canvasHeight: 1000,
            cards: [
                {
                    text: "Card 1",
                    z: 0,
                    x: 100,
                    y: 100
                },
                {
                    text: "Card 2",
                    z: 1,
                    x: 30,
                    y: 30
                }
            ]
        }
    },
    methods: {
        dragStart(e: any, i: number) {
            this.dragStartX = e.pageX;
            this.dragStartY = e.pageY;
            this.cards[this.lastMoved].z = 0;
            this.cards[i].z = 1;
            this.lastMoved = i;
        },
        drag(e: any, i: number) {
            let xDelta = e.pageX - this.dragStartX;
            let yDelta = e.pageY - this.dragStartY;
            this.dragStartX = e.pageX;
            this.dragStartY = e.pageY;

            let newX = this.cards[i].x + xDelta;
            if (newX >= 0 && newX < this.canvasWidth && Math.abs(xDelta) < 100) {
                this.cards[i].x = newX;
            }
            let newY = this.cards[i].y + yDelta;
            if (newY >= 0 && newY < this.canvasHeight && Math.abs(yDelta) < 100) {
                this.cards[i].y = newY;
            }
        }
    }
})

</script>
<style scoped>
.canvas {
    position: relative;
    width: 1000px;
    height: 1000px;
    border: dashed 2px rgb(165, 165, 243);
    margin: 10px;

    .card {
        position: absolute;
        width: 100px;
        height: 100px;
        background: rgb(218, 218, 255);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, .6);
    }

    .grab-arrow {
        position: absolute;
        top: 5px;
        left: 5px;
        line-height: 14px;

        &:hover {
            cursor: grab;
        }
    }

}
</style>
