
<script setup lang="ts">
import { ref, toRef, watch } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import useIssueMutation from '../composables/useIssueMutation';

interface Props {
    isOpen: boolean,
    labels: string[]
}

const props = defineProps<Props>()

interface Emits {
    (e: 'onClose'): void
}

const emits = defineEmits<Emits>()

const isOpenDialog = ref<boolean>(false)

const title = ref<string>('')
const body = ref<string>('body')
const labelsOptions = ref<string[]>([])

const labels = toRef(props, 'labels')
const { issueMutation } = useIssueMutation()

watch(props, () => {
    isOpenDialog.value = props.isOpen
})

watch(() => issueMutation.isSuccess.value, (isSuccess) => {
    if (isSuccess) {
        title.value = ''
        body.value = ''
        labelsOptions.value = []

        issueMutation.reset()
        emits('onClose')
    }
})


</script>
<template>
    <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="isOpenDialog" position="bottom" persistent>
            <q-card style="width: 500px">
                <q-form @submit="issueMutation.mutate({ title, body, labels: labelsOptions })">
                    <q-linear-progress :value="1" color="primary" />

                    <q-card-section class="column no-wrap">
                        <div>
                            <div class="text-weight-bold">New Issue</div>
                            <div class="text-grey">Add new issue with labels</div>
                        </div>

                        <q-space />
                        <div>
                            <q-input dense filled v-model="title" label="title" placeholder="title" class="q-mb-sm"
                                :rules="[val => !!val || 'Field is required']" />
                            <q-select dense filled v-model="labelsOptions" multiple :options="labels" use-chips stack-label
                                label="Multiple selection" class="q-mb-sm" />

                            <!-- TO DO markdownEditod -->

                            <MdEditor v-model="body" :placeholder="'# Markdown'" lenguage="en-US" />

                        </div>
                    </q-card-section>

                    <q-card-actions align="left">
                        <q-btn :disable="issueMutation.isPending.value" flat label="cancel" v-close-popup color="dark"
                            @click="emits('onClose')" />
                        <q-space />
                        <q-btn :disable="issueMutation.isPending.value" type="submit" flat label="add issue" color="dark" />
                    </q-card-actions>
                </q-form>

            </q-card>
        </q-dialog>
    </div>
</template>

<style scoped></style>