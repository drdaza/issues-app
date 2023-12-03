<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { RouterLink, useRoute } from 'vue-router';
import IssueCard from '../components/IssueList/IssueCard.vue';


const route = useRoute()

const { id } = route.params

</script>

<template>
    <LoaderSpinner />

    <RouterLink class="text-white" to="/">Go Back</RouterLink>
    <!-- header -->
    <IssueCard />
    <!-- Comments -->
    <LoaderSpinner :thickness="1" size="1rem" :showText="false" />
    <div class="column">
        <span class="text-h3 q-mb-md"> Comments {{ 5 }}</span>
        <IssueCard v-for="comment of 5" :key="comment" />

    </div>
</template>

<style scoped></style>