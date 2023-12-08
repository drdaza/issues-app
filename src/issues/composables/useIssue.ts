import { gitHubApi } from 'src/api/gitHubApi'
import { Issue } from '../interfaces/issue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
// import { computed } from 'vue'


const getIssue = async (issueNumber: number):Promise<Issue> => {

    const { data } = await gitHubApi.get<Issue>(`/issues/${issueNumber}`)

    return data
}

const getIssueComments = async (issueNumber: number):Promise<Issue[]> => {

    const { data } = await gitHubApi.get<Issue[]>(`/issues/${issueNumber}/comments`)

    return data
}


interface Options {
    autoload?: boolean
}

const useIssue = (issueNumber: number, options?: Options) => {


    const { autoload= true } = options || {}

    const queryClient = useQueryClient()



    const issueQuery = useQuery({
        queryKey: ['issue', issueNumber],
        queryFn: () => getIssue(issueNumber),
        staleTime: 1000 * 60,
        enabled: autoload
    })

    const issueCommentsQuery = useQuery({
        queryKey: ['issue', issueNumber, 'comments'],
        queryFn: () => getIssueComments(issueQuery.data.value?.number || 0),
        staleTime: 1000 * 15,
        enabled: autoload
        // enabled: computed( () => !!issueQuery.data.value)
    })

    const preFetchIssue = ( issueNumber: number ) => {
        queryClient.prefetchQuery(
            {
                queryKey: ['issue', issueNumber],
                queryFn: () => getIssue(issueNumber),
                staleTime: 1000 * 60
            }
        )
        


        queryClient.prefetchQuery({
            queryKey: ['issue', issueNumber, 'comments'],
            queryFn: () => getIssueComments(issueNumber),
            staleTime: 1000 * 15,
            // enabled: computed( () => !!issueQuery.data.value)
        })
    }

    const setIssueCacheData = (issue: Issue) => {
        queryClient.setQueryData(['issue', issue.number], issue)
    }


    return {
        issueQuery,
        issueCommentsQuery,


        // methods
        preFetchIssue,
        setIssueCacheData
    }
}
export default useIssue