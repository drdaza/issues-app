
<script setup lang="ts">
import { toRef } from 'vue';
import { Button } from '../interfaces/utils';



interface Props {
    buttons: Button[]
}


const props = defineProps<Props>()

const buttons = toRef(props, 'buttons')


// const executeAction = (action: string) => {
//     console.log(action);

// }
</script>

<template>
    <div class="fab">
        <q-btn v-for="(button, index) of buttons" :key="index" round :color="button.color" :icon="button.icon"
            :size="button.size" @click="button.action" />
    </div>
</template>

<style lang="scss" scoped>
.fab {
    position: fixed;
    bottom: 30px;
    right: 30px;
}
</style>