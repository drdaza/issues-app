import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { Issue } from '../interfaces/issue'
import { gitHubApi } from 'src/api/gitHubApi'

interface Args {
    title: string, 
    body?: string,
    labels?: string[]
}

const addIssue = async({title, body = '', labels = []}:Args):Promise<Issue>=>{

    const newIssueData = {
        title, 
        body,
        labels
    }

    const { data } = await gitHubApi.post<Issue>('/issues', newIssueData)

    // console.log({data});
    
    return data
}

const useIssueMutation = () => {

    const queryClient = useQueryClient()

    const issueMutation = useMutation({
        mutationFn: addIssue,
        onSuccess: ( issue )=> {
            // console.log('onSucces');
            queryClient.invalidateQueries({
                queryKey: ['issues'],
                exact: false
            })

            queryClient.refetchQueries({
                queryKey: ['issues'],
                exact: false
            })

            queryClient.setQueryData(['issue', issue.number],
             issue)
        },
        onSettled: ()=> {
            console.log('onSettled');
            
        }
    })

    return {
        issueMutation
    }
}
export default useIssueMutation