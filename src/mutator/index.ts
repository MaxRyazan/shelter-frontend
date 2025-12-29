import {ApiError, BackendError} from "@/api-error";

export const useFetchMutator = async <T>(config: {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: any;
    headers?: Record<string, string>;
}): Promise<T> => {
    const {url, method, data, headers} = config;

    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('shelter-token') ?? '{}')}`,
        },
        body: data ? JSON.stringify(data) : undefined,
    });

    let responseData;
    try {
        responseData = await response.json();
    } catch {
        try {
            responseData = await response.text();
        } catch {
            responseData = null;
        }
    }

    if (!response.ok) {
        // Проверяем, соответствует ли ответ структуре BackendError
        if (responseData &&
            typeof responseData === 'object' &&
            'type' in responseData &&
            'detail' in responseData &&
            'status' in responseData) {
            // Это ошибка с бэкенда в ожидаемом формате
            throw new ApiError(responseData as BackendError);
        } else {
            // Это какая-то другая ошибка
            const errorData: BackendError = {
                type: `https://tools.ietf.org/html/rfc9110#section-15.6.1`,
                title: 'HTTP Error',
                status: response.status,
                detail: typeof responseData === 'string' ? responseData : 'Unknown error',
                instance: url,
                traceId: '',
                exceptionType: 'FetchError'
            };
            throw new ApiError(errorData);
        }
    }

    return responseData as T;
};