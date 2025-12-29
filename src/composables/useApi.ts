import {ref} from "vue";
import {ApiError} from "@/api-error";

export function useApiLazy<T = any>() {
    const data = ref<T | null>(null)
    const isFetching = ref(false)
    const error = ref<ApiError | null>(null)

    const execute = async (apiFn: (...args: any[]) => Promise<T>, ...args: any[]): Promise<T | null> => {
        isFetching.value = true
        error.value = null
        data.value = null

        try {
            const result = await apiFn(...args)
            data.value = result
            return result
        } catch (err) {
            if (err instanceof ApiError) {
                error.value = err
            } else {
                // Создаем общую ApiError для других типов ошибок
                error.value = new ApiError({
                    type: 'https://tools.ietf.org/html/rfc9110#section-15.6.1',
                    title: 'Client Error',
                    status: 0,
                    detail: err instanceof Error ? err.message : 'Unknown error',
                    instance: '',
                    traceId: '',
                    exceptionType: err?.constructor?.name || 'UnknownException'
                })
            }
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