import { ref } from "vue";

export type ToastType = 'success' | 'error' | 'warning' | 'info'

type ToastData = {
    id: number;
    type: ToastType;
    message: string;
}

export class Toast {
    private static counter = 0;
    public static toasts = ref<ToastData[]>([]);
    private static MAX_TOASTS = 3;
    private static timers = new Map<number, ReturnType<typeof setTimeout>>();

    static success(message: string | null | undefined, durationMs: number = 3000) {
        Toast.add(message, 'success', durationMs);
    }

    static error(message: string | null | undefined, durationMs: number = 3000) {
        Toast.add(message, 'error', durationMs);
    }

    static warning(message: string | null | undefined, durationMs: number = 3000) {
        Toast.add(message, 'warning', durationMs);
    }

    static info(message: string | null | undefined, durationMs: number = 3000) {
        Toast.add(message, 'info', durationMs);
    }

    static hide(id: number) {
        // Удаляем тост по id
        const index = Toast.toasts.value.findIndex(toast => toast.id === id);
        if (index !== -1) {
            Toast.toasts.value.splice(index, 1);

            // Очищаем таймер
            const timer = Toast.timers.get(id);
            if (timer) {
                clearTimeout(timer);
                Toast.timers.delete(id);
            }
        }
    }

    private static add(
        message: string | null | undefined,
        type: ToastType,
        durationMs: number
    ) {
        const id = ++Toast.counter;
        const toastMessage = message ?? (type === 'error' ? 'Ошибка...' : 'Уведомление');

        // Если достигли максимума, удаляем самый старый (первый в массиве)
        if (Toast.toasts.value.length >= Toast.MAX_TOASTS) {
            const oldestToast = Toast.toasts.value[0];
            Toast.hide(oldestToast.id);
        }

        // Добавляем новый тост в конец массива
        Toast.toasts.value.push({
            id,
            type,
            message: toastMessage,
        });

        // Устанавливаем таймер для удаления ЭТОГО тоста
        if (durationMs > 0) {
            const timer = setTimeout(() => {
                Toast.hide(id);
            }, durationMs) as unknown as ReturnType<typeof setTimeout>;

            Toast.timers.set(id, timer);
        }

        return id;
    }
}