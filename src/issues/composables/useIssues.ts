import { useQuery } from '@tanstack/vue-query'
import { Issue, State } from '../interfaces/issue'
import { gitHubApi } from 'src/api/gitHubApi'
import useStore from './useStore'
// import { useIssuesStore } from 'src/stores/issues'
// import { storeToRefs } from 'pinia'

const getIssues = async ( labels: string[], state:State ): Promise<Issue[]> => {

    const params = new URLSearchParams()
    if (state) params.append('state', state)
    if (labels.length > 0 ) {
        const labelsToString = labels.join(',')
        params.append('labels', labelsToString)
    } 

    params.append('per_page', '10')

    const { data } = await gitHubApi.get<Issue[]>('/issues', {params})

    return data
}


const useIssues = () => {


    // const issuesStore = useIssuesStore()
    // const { labels, state } = storeToRefs(issuesStore)
    const { labels, state } = useStore()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['issues', { labels, state}],
        queryFn: () => getIssues( labels.value, state.value )
    })

 

    return {
        data,
        isLoading,
        isError
    }
}
export default useIssues