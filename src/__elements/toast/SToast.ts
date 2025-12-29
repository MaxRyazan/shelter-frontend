import {ref} from "vue";

export type ToastType = 'success' | 'error' | 'warning' | 'info'

type ToastData = {
    type: ToastType,
    message: string | undefined,
}

export class Toast {
    public static toast = ref<ToastData>({
        type: 'info',
        message: undefined,
    })

    private static timer: ReturnType<typeof setTimeout> | null = null

    static success(message: string | null | undefined, durationMs: number = 3000) {
        Toast.show(message, 'success', durationMs)
    }

    static error(message: string | null | undefined, durationMs: number = 3000) {
        Toast.show(message, 'error', durationMs)
    }

    static warning(message: string | null | undefined, durationMs: number = 3000) {
        Toast.show(message, 'warning', durationMs)
    }

    static info(message: string | null | undefined, durationMs: number = 3000) {
        Toast.show(message, 'info', durationMs)
    }

    static hide() {
        if (Toast.timer) {
            clearTimeout(Toast.timer)
            Toast.timer = null
        }
        Toast.toast.value.message = undefined
    }

    private static show(message: string | null | undefined, type: ToastType, durationMs: number) {
        // Очищаем предыдущий таймер
        if (Toast.timer) {
            clearTimeout(Toast.timer)
            Toast.timer = null
        }

        // Показываем новый тост
        Toast.toast.value = {
            type: type,
            message: message ?? 'Ошибка...',
        }

        // Устанавливаем таймер закрытия
        if (durationMs > 0) {
            Toast.timer = setTimeout(() => {
                Toast.hide()
            }, durationMs)
        }
    }
}