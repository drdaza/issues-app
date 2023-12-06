<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { RouterLink, useRoute } from 'vue-router';
import IssueCard from '../components/IssueList/IssueCard.vue';
import useIssue from '../composables/useIssue';
// import type { Issue } from '../interfaces/issue';


const route = useRoute()

const { id } = route.params

const { issueQuery } = useIssue(+id)

</script>

<template>
    <RouterLink class="text-white" to="/">Go Back</RouterLink>


    <LoaderSpinner v-if="issueQuery.isLoading.value" />

    <!-- header -->
    <IssueCard v-else-if="issueQuery.data.value" :issue="issueQuery.data.value" />
    <p v-else>....</p>
    <!-- Comments -->
    <LoaderSpinner :thickness="1" size="1rem" :showText="false" />
    <div class="column">
        <span class="text-h3 q-mb-md"> Comments {{ 5 }}</span>
        <!-- <IssueCard v-for="comment of issueQuery.data.value?.comments ||" :key="comment" /> -->

    </div>
</template>

<style scoped></style>