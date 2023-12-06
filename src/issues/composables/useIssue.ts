import { gitHubApi } from 'src/api/gitHubApi'
import { Issue } from '../interfaces/issue'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'


const getIssue = async (issueNumber: number):Promise<Issue> => {

    const { data } = await gitHubApi.get<Issue>(`/issues/${issueNumber}`)

    return data
}

const getIssueComments = async (issueNumber: number):Promise<Issue[]> => {

    const { data } = await gitHubApi.get<Issue[]>(`/issues/${issueNumber}/comments`)

    return data
}


const useIssue = (issueNumber: number) => {

    const issueQuery = useQuery({
        queryKey: ['issue', issueNumber],
        queryFn: () => getIssue(issueNumber),
        staleTime: 1000 * 60
    })

    const issueCommentsQuery = useQuery({
        queryKey: ['issue', issueNumber, 'comments'],
        queryFn: () => getIssueComments(issueQuery.data.value?.number || 0),
        staleTime: 1000 * 15,
        enabled: computed( () => !!issueQuery.data.value)
    })


    return {
        issueQuery,
        issueCommentsQuery
    }
}
export default useIssue