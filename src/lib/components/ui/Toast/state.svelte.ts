export interface ToastItem {
    text: string | (() => string);
    displayTime?: number;
}

export class ToastManager {
    public constructor(defaultDisplayTime: number = 5000) {
        this.DEFAULT_DISPLAY_TIME = defaultDisplayTime;
    }

    public push(items: ToastItem | ToastItem[]) {
        if (Array.isArray(items)) {
            this._queue.push(...items);
        } else {
            this._queue.push(items);
        }

        this.startDisplayToast();
    }

    public close() {
        if (this._queue.length === 0) { return; }

        clearTimeout(this._timerId);
        this._queue.shift();
        this._timerId = undefined;
        this.startDisplayToast();
    }

    public get toast(): ToastItem | undefined {
        return (this._animatingDelay || (this._queue.length === 0)) ? undefined : this._queue[0];
    }

    private startDisplayToast() {
        if (this._timerId || (this._queue.length === 0)) { return; }
        const currentToast = this._queue[0];

        this._timerId = setTimeout(() => {
            this._animatingDelay = true;

            setTimeout(() => {
                this._queue.shift();
                this._timerId = undefined;
                this.startDisplayToast();
                this._animatingDelay = false;
            }, 600);
        }, currentToast?.displayTime ?? this.DEFAULT_DISPLAY_TIME);
    }

    private DEFAULT_DISPLAY_TIME: number = 500;
    private _timerId: NodeJS.Timeout | undefined = undefined;
    private _queue: ToastItem[] = $state([]);
    private _animatingDelay: boolean = $state(false);
}

export const toast = new ToastManager();
