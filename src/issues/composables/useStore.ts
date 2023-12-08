import { useIssuesStore } from 'src/stores/issues'
import { storeToRefs } from 'pinia'

const useStore = () => {


    
    const issuesStore = useIssuesStore()
    const { labels, state } = storeToRefs(issuesStore)

    return {
        //reactive properties
        labels, state

        // getters

        // actions
    }
}
export default useStore