
<script setup lang="ts">
import useLabels from 'src/issues/composables/useLabels';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';


const { labels, isLoading, toggleLabel, selectedLabels } = useLabels()

</script>
<template>
    <div class="q-mt-md">
        <LoaderSpinner v-if="isLoading" size="50px" :thickness="1" :showText="false" />
        <template v-else>
            <q-chip v-for="label of labels" :key="label.id" :style="{ color: ` #${label.color}` }" :label="label.name"
                :outline="!selectedLabels.includes(label.name)" clickable @click="toggleLabel(label.name)" />
        </template>
    </div>
</template>

<style scoped></style>