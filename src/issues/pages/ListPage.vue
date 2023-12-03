<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from '../components/filterSelector/FilterSelector.vue';
import IssueList from '../components/IssueList/IssueList.vue';


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
            <LoaderSpinner />
            <!-- issues list -->
            <IssueList />
        </div>
    </div>
</template>

<style scoped></style>