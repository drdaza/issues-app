import { useQuery } from '@tanstack/vue-query'
import { Issue } from '../interfaces/issue'
import { gitHubApi } from 'src/api/gitHubApi'

const getIssues = async (): Promise<Issue[]> => {

    const params = new URLSearchParams()

    params.append('per_page', '10')

    const { data } = await gitHubApi.get<Issue[]>('/issues', {params})

    return data
}


const useIssues = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['issues'],
        queryFn: getIssues
    })





    return {
        data,
        isLoading,
        isError
    }
}
export default useIssues