import {ref} from 'vue'

export function useApiLazy<T = any>() {
    const data = ref<T | null>(null)
    const isFetching = ref(false)
    const error = ref<Error | null>(null)

    const execute = async (apiFn: (...args: any[]) => Promise<T>, ...args: any[]): Promise<T | null> => {
        isFetching.value = true
        error.value = null
        data.value = null

        try {
            const result = await apiFn(...args)
            data.value = result
            return result
        } catch (err) {
            error.value = err as Error
            return null
        } finally {
            isFetching.value = false
        }
    }

    return {
        data,
        isFetching,
        error,
        execute
    }
}