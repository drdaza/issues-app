import { defineStore } from 'pinia' 
import { ref } from 'vue' 


export const useIssuesStore = defineStore('Issues', () => {

    //TODO add dataType
    // state
    const state = ref<string>('') // all= '' open, closed
    const labels= ref<string[]>([])


    return {
        state,
        labels,
        // actions 
        toggleLabel(labelName: string) {

            if(labels.value.includes(labelName)){
                labels.value = labels.value.filter(label => label !== labelName)
                return
            }
            labels.value.push(labelName)
        },   

        //modifyState( newState: Number){
        //    state.value = 2
        //},
        // getters
        // selectedLabels: computed(() => labels)
        //getState: computed(() => {
        //    return state.value
        //})
    }
})