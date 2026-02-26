import { browser } from "$app/environment";

import { toast } from "$lib/components/ui/Toast";

interface PiPState {
    currentSession: 'work' | 'break' | 'longBreak';
    sessionSec: number;
    elapsedSec: number;
    remainingSec: number;
    count: number;
    paused: boolean;
}

const getSilentStream = () => {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const dst = ctx.createMediaStreamDestination();
    oscillator.connect(dst);
    oscillator.start();
    return dst.stream.getAudioTracks()[0];
}

export class DrawPiP {
    public constructor({ onPlay, onPause }: {  onPlay?: (() => void), onPause?: (() => void) }) {
        if (!browser) { throw new Error("クライアントサイド以外では利用できません。"); }

        this._canvas = document.createElement('canvas');
        const ctx = this._canvas.getContext('2d');
        if (!ctx) {
            throw new Error("PiP用キャンバスのコンテキストの取得に失敗しました。");
        }
        this._ctx = ctx;

        this._video = document.createElement('video');

        this._canvas.width = 640;
        this._canvas.height = 360;
        this._video.muted = true;
        this._video.playsInline = true;

        this._video.addEventListener('enterpictureinpicture', () => { this._isPiPOpened = true; });
        this._video.addEventListener('leavepictureinpicture', () => { this._isPiPOpened = false; })

        this._audioTrack = getSilentStream();

        navigator.mediaSession.setActionHandler('play', () => {
            onPlay?.();
            this.start();
            this._video.play();
            navigator.mediaSession.playbackState = 'playing';
        });
        navigator.mediaSession.setActionHandler('pause', () => {
            onPause?.();
            this._video.pause();
            navigator.mediaSession.playbackState = 'paused';
        });
    }

    public draw() {
        const rootStyles = getComputedStyle(document.body);

        const colorScheme = document.body.style.colorScheme;

        // `light-dark()`が処理されない(TT)
        const styles = {
            light: rootStyles.getPropertyValue("--color-base-light").trim(),
            dark: rootStyles.getPropertyValue("--color-base-dark").trim(),
        };

        const theme = {
            base: (colorScheme === 'dark') ? styles.dark : styles.light,
            label: (colorScheme === 'dark') ? styles.light :styles.dark
        }

        this._ctx.fillStyle = theme.base;
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);

        this._ctx.fillStyle = theme.label;
        this._ctx.fillRect(50, 50, this._canvas.width - 100, 50);
        this._ctx.fillStyle = theme.base;
        this._ctx.fillRect(50, 50, (this._canvas.width - 100) * (this.state.elapsedSec / this.state.sessionSec), 50);

        this._ctx.fillStyle = theme.label;
        this._ctx.font = "bold 80px monospace";
        this._ctx.textAlign = 'center';
        this._ctx.fillText(`${`${Math.floor(this.state.remainingSec / 60)}`.padStart(2, '0')}:${`${this.state.remainingSec % 60}`.padStart(2, '0')}`, 150, 200);

        this._ctx.font = "bold 40px monospace";
        this._ctx.fillText(`${this.state.count}ポモドーロ`, 150, 300);

        this._ctx.font = "bold 100px monospace";
        this._ctx.fillText(`${(() => {
                    switch (this.state.currentSession) {
                        case 'work': return "作業";
                        case 'break': return "小休憩";
                        case 'longBreak': return "休憩";
                    }
        })()}`, 460, 250);

        requestAnimationFrame(this.draw.bind(this));
    }

    public async start() {
        const isFirstStarted = this._video.srcObject === null;
        const stream = this._canvas.captureStream(30);
        this._video.srcObject = stream;
        // stream.addTrack(this._audioTrack);

        this.draw();

        navigator.mediaSession.playbackState = 'paused';

        try {
            await this._video.play();
            await this._video.requestPictureInPicture();

            if (isFirstStarted) {
                this._video.pause();
                navigator.mediaSession.playbackState = 'paused';
            }
        } catch {
            toast.push({ text: "PiPの起動に失敗しました。" });
        }
    }

    public get state() { return this._state; }
    public set state(newState: PiPState) {
        const lastPaused = this._state.paused;
        this._state = newState;

        if (this._isPiPOpened && (lastPaused !== this._state.paused)) {
            if (this._state.paused) {
                this._video.pause();
                navigator.mediaSession.playbackState = 'paused';
            } else {
                this.start();
                this._video.play();
                navigator.mediaSession.playbackState = 'playing';
            }
        }
    }

    private readonly _canvas: HTMLCanvasElement;
    private readonly _ctx: CanvasRenderingContext2D;
    private readonly _video: HTMLVideoElement;
    private readonly _audioTrack: MediaStreamTrack;

    private _isPiPOpened: boolean = false;

    private _state: PiPState = {
        currentSession: 'work',
        sessionSec: 0,
        elapsedSec: 0,
        remainingSec: 0,
        count: 0,
        paused: true
    };
};
