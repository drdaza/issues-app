<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from '../components/filterSelector/FilterSelector.vue';
import IssueList from '../components/IssueList/IssueList.vue';
import useIssues from '../composables/useIssues';
import FloatingButtons from '../components/FloatingButtons.vue';
import { Button } from '../interfaces/utils';
import NewIssueDialog from '../components/NewIssueDialog.vue';
import { computed, ref } from 'vue';
import useLabels from '../composables/useLabels';
// import { Button } from '../interfaces/utils';

const { data, isLoading } = useIssues()
const { labels } = useLabels()


const isOpen = ref<boolean>(false)


const openDialog = () => {
    isOpen.value = !isOpen.value
}

const buttons = [{
    icon: 'add',
    color: 'primary',
    size: 'md',
    action: openDialog
}] as Button[]


const test = computed(() => {
    const cosas: string[] = []
    const test = labels.value

    for (const key in test) {
        cosas.push(test[parseInt(key)].name)
    }
    return cosas
})


</script>

<template>
    <div class="row q-mb-md">
        <div class="col-12">
            <span class="text-h4">Git Hub Issues</span>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 col-md-4">
            <FilterSelector />
        </div>
        <div class="col-xs-12 col-md-8">
            <!-- Loader -->
            <LoaderSpinner v-if="isLoading" />
            <!-- issues list -->
            <IssueList :issues="data || []" />
        </div>
    </div>

    <FloatingButtons :buttons="buttons" />

    <NewIssueDialog v-if="labels" :isOpen="isOpen" :labels="test" @onClose="openDialog" />
</template>

<style scoped></style>