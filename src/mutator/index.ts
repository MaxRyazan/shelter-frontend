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

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json() as T;
};