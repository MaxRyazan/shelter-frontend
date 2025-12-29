export interface BackendError {
    type: string;           // "https://tools.ietf.org/html/rfc9110#section-15.6.1"
    title: string;          // "Bad Request"
    status: number;         // 400
    detail: string;         // "Not enough planet buildings to deconstruct"
    instance: string;       // "/api/planet/building-operation"
    traceId: string;        // "00-f671b94bea2e329ee3b2cc5b14e34916-5e0737936f0bf0c8-00"
    exceptionType: string;  // "Microsoft.AspNetCore.Http.BadHttpRequestException"
    stackTrace?: string;    // стек трейс
}

export class ApiError extends Error {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
    traceId: string;
    exceptionType: string;
    stackTrace?: string;

    constructor(errorData: BackendError) {
        // Используем detail как основное сообщение ошибки
        super(errorData.detail || errorData.title || `HTTP error ${errorData.status}`);

        this.name = 'ApiError';
        this.type = errorData.type;
        this.title = errorData.title;
        this.status = errorData.status;
        this.detail = errorData.detail;
        this.instance = errorData.instance;
        this.traceId = errorData.traceId;
        this.exceptionType = errorData.exceptionType;
        this.stackTrace = errorData.stackTrace;

        // Сохраняем stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
}