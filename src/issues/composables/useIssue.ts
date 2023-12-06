import { gitHubApi } from 'src/api/gitHubApi'
import { Issue } from '../interfaces/issue'
import { useQuery } from '@tanstack/vue-query'


const getIssue = async (issueNumber: number):Promise<Issue> => {

    const { data } = await gitHubApi.get(`/issues/${issueNumber}`)

    return data
}


const useIssue = (issueNumber: number) => {

    const issueQuery = useQuery({
        queryKey: ['issue', issueNumber],
        queryFn: () => getIssue(issueNumber),
        staleTime: 1000 * 60
    })


    return {
        issueQuery
    }
}
export default useIssue