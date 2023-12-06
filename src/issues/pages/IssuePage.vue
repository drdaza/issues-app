<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { RouterLink, useRoute } from 'vue-router';
import IssueCard from '../components/IssueList/IssueCard.vue';
import useIssue from '../composables/useIssue';
// import type { Issue } from '../interfaces/issue';


const route = useRoute()

const { id } = route.params

const { issueQuery, issueCommentsQuery } = useIssue(+id)

</script>

<template>
    <RouterLink class="text-white" to="/">Go Back</RouterLink>


    <LoaderSpinner v-if="issueQuery.isLoading.value" />

    <!-- header -->
    <IssueCard v-else-if="issueQuery.data.value" :issue="issueQuery.data.value" />
    <p v-else>....</p>
    <!-- Comments -->
    <LoaderSpinner v-if="issueCommentsQuery.isLoading.value" :thickness="1" size="1rem" :showText="false" />
    <div v-else-if="issueCommentsQuery.data.value" class="column">
        <span class="text-h3 q-mb-md"> Comments {{ issueCommentsQuery.data.value.length }}</span>
        <IssueCard v-for="comment of issueCommentsQuery.data.value" :key="comment.id" :issue="comment" />
    </div>
</template>

<style scoped></style>