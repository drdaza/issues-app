
<script setup lang="ts">
import { toRef } from 'vue';


interface Props {
    color?: string,
    size?: string,
    thickness?: number,
    showText?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    color: 'primary',
    size: '3rem',
    thickness: 5,
    showText: true
})

const color = toRef(props, 'color')
const size = toRef(props, 'size')
const thickness = toRef(props, 'thickness')
const showText = toRef(props, 'showText')

</script>

<template>
    <div class="columns items-center">
        <q-spinner :color="color" :size="size" :thickness="thickness" />
        <span v-if="showText" class="q-mt-sm">Loading...</span>
    </div>
</template>
<style scoped></style>