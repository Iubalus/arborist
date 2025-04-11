<template>
    <div class="snapshot">
        <h1>{{ internalProfile.name }} at {{ internalProfile.company }}</h1>
        <span class="when">{{ internalProfile.when }}</span>
        <div class="overview">
            <div class="profile">
                <img :src="internalProfile.profile" alt="profile"></img>
            </div>
            <div>
                <span v-for="memorableQuote in internalProfile.memorableQuotes" class="quote">
                    {{ memorableQuote }}
                </span>
            </div>
        </div>
        <div class="present">
            <span class="float-label">Present</span>
            <span v-for="name in internalProfile.present">
                {{ name }}
            </span>
        </div>
        <div class="interview-question">
            <span class="float-label">Interview Question</span>
            <textarea v-model="internalProfile.interviewQuestion"></textarea>
        </div>
        <div class="lists">
            <div>
                <span class="float-label">Quick Facts</span>
                <ul>
                    <li v-for="quickFact in internalProfile.quickFacts">
                        {{ quickFact }}
                    </li>
                </ul>
            </div>
            <div>
                <span class="float-label">Insights</span>
                <ul>
                    <li v-for="insight in internalProfile.insights">
                        {{ insight }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="experience-map">
            <span class="float-label">Experience Map</span>
            <div>
                <img :src="internalProfile.experienceMap" alt="experience map"></img>
            </div>
            <textarea v-model="internalProfile.story">
            </textarea>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Profile } from '../data'

export default defineComponent({
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        }
    },
    emits: ['update'],
    data() {
        return {
            internalProfile: this.profile            
        }
    },
    watch: {
        internalProfile: {
            handler: function (v: Profile) {
                //@ts-ignore
                this.$emit('update', v);
            },
            deep: true
        }
    }
})

</script>
<style scoped>
.snapshot {
    border: dashed 1px gray;
    padding: 10px;
    box-shadow: 5px 5px 5px gray;
    position: relative;

    .when {
        position: absolute;
        top: 5px;
        right: 5px;
    }

    .float-label {
        position: absolute;
        font-size: 0.8em;
        top: 0;
        left: 5px;
        font-style: normal;

        &:after {
            content: ':'
        }
    }

    .overview {
        .profile {
            display: inline-block;
            width: 500px;
            height: 500px;
            border-radius: 100%;
            overflow: hidden;
            background: black;

            img {
                max-height: 100%;
                max-width: 100%;
            }
        }

        .quote {
            display: block;

            &:before {
                content: "\""
            }

            &:after {
                content: "\""
            }
        }
    }

    .interview-question {
        border-radius: 5px;
        position: relative;
        margin: 15px 20px 0 20px;
        background: #ebebeb;
        padding: 10px;
        font-style: italic;
        padding: 20px 10px 10px 10px;
        box-shadow: 5px 5px 10px gray;

        textarea {
            width: 100%;
            min-height: 100px;
            box-sizing: border-box;
            background: transparent;
            border-radius: 5px;
            margin: 0;
            font-style: italic;
            padding: 10px;

            &:before {
                content: "\""
            }

            &:after {
                content: "\""
            }
        }


        span {
            position: absolute;
            top: 0;
            left: 5px;
        }
    }

    .present {

        display: flex;
        gap: .3em;
        padding-top: 20px;
        padding-left: 20px;
        position: relative;

        span:first-of-type {
            &:after {
                content: ''
            }
        }

        span {
            &:after {
                content: ","
            }

            &:last-of-type:after {
                content: ''
            }
        }
    }

    .lists {
        margin-top: 20px;
        display: flex;
        gap: 10px;
        align-content: center;

        >div {
            position: relative;
        }

        ul {
            flex-grow: 1;
            padding-top: 20px;
            margin: 0;

            li {
                text-align: left;
            }
        }
    }

    .experience-map {
        position: relative;
        padding-top: 20px;
        margin-top: 15px;
        display: block;

        div {
            width: 100%;
            max-height: 500px;
            overflow: hidden;
            background: white;
            border: dashed 1px gray;
            border-radius: 5px;

            img {
                max-height: 100%;
                max-width: 100%;
            }
        }

        textarea {
            display: block;
            border-radius: 5px;
            margin-top: 10px;
            padding: 10px;
            width: 100%;
            min-height: 150px;
            box-sizing: border-box;
        }
    }
}
</style>
