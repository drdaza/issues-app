import { useQuery } from '@tanstack/vue-query'
import { gitHubApi } from 'src/api/gitHubApi'
import { Label } from '../interfaaces/label'
import { computed, ref, watch } from 'vue'
import { useIssuesStore } from 'src/stores/issues'



const getLabels = async (): Promise<Label[]> => {

    const { data } = await gitHubApi<Label[]>('/labels?per_page=100')
    return data
}


const useLabels = () => {

    const issuesStore = useIssuesStore()


    const labels = ref<Label[]>()

    const { data, isLoading, isError } = useQuery({
        queryKey:['labels'],
        queryFn: getLabels,
        staleTime: 1000 * 60 * 60 // one hour
    })

    watch(data , ()=>{
        if(data.value){
            labels.value = { ...data.value }
        }
    }, {immediate: true})

    return {
        labels,
        isLoading,
        isError,

        selectedLabels:  computed( () => issuesStore.labels ),
        
        
        toggleLabel: issuesStore.toggleLabel
    }
}
export default useLabels