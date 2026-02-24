<script lang="ts">
    import VolumeIcon from "$lib/assets/icons/volume.svelte";
    import MuteIcon from "$lib/assets/icons/mute.svelte";
    import PlayIcon from "$lib/assets/icons/play.svelte";
    import PauseIcon from "$lib/assets/icons/pause.svelte";
    import ResetIcon from "$lib/assets/icons/reset.svelte";

    import BreakAlarmSound from "$lib/assets/sounds/alarm1.mp3";
    import WorkAlarm2Sound from "$lib/assets/sounds/alarm2.mp3";

    import { z } from "zod";

    import { toast } from "$lib/components/ui/Toast";
    import SvgIcon from "$lib/components/ui/SvgIcon";
    import { theme } from "$lib/state";

    const POMODORO_TIME_MAX = 90;
    const BREAK_TIME_MAX = 30;
    const LONG_BREAK_TIME_MAX = 60;
    const LONG_BREAK_INTERVAL_MAX = 10;

    const StateSchema = z.object({
        pomodoroMin: z.number().min(1).max(POMODORO_TIME_MAX),
        breakMin: z.number().min(1).max(BREAK_TIME_MAX),
        longBreakMin: z.number().min(1).max(LONG_BREAK_TIME_MAX),
        longBreakInterval: z.number().min(1).max(LONG_BREAK_INTERVAL_MAX),
        elapsedSec: z.number(),
        currentSession: z.enum(['work', 'break', 'longBreak']),
        count: z.number(),
        volume: z.number().min(0).max(1),
        alarmMuted: z.boolean()
    });

    import { toolState } from "$lib/state/state.svelte";
    import { onMount } from "svelte";

    let breakAlarmAudio: HTMLAudioElement | undefined = $state(undefined);
    let workAlarmAudio: HTMLAudioElement | undefined = $state(undefined);

    let pageState = $state({
        pomodoroMin: 25,
        breakMin: 5,
        longBreakMin: 15,
        longBreakInterval: 4,
        elapsedSec: 0,
        currentSession: 'work' as ('work' | 'break' | 'longBreak'),
        count: 0,
        volume: 0.5,
        alarmMuted: false
    });

    // 範囲外の値がUIやLocalStorageに反映されないようにするためのバッファー
    const inputValues = $state({
        pomodoroMin: 0,
        breakMin: 0,
        longBreakMin: 0,
        longBreakInterval: 0,
    });

    let lastUpdatedTime = $state(0);
    let paused = $state(true);
    let sessionSec = $derived.by(() => {
        switch (pageState.currentSession) {
            case 'work':
                return pageState.pomodoroMin * 60;
            case 'break':
                return pageState.breakMin * 60;
            case 'longBreak':
                return pageState.longBreakMin * 60;
        }
    });

    const getRemainingTime = () => {
        return Math.max(0, sessionSec - pageState.elapsedSec);
    }

    const onPlayPauseClick = () => {
        paused = !paused;
        if (!paused) {
            lastUpdatedTime = Date.now();
        }
    }

    const onResetClick = () => {
        pageState.elapsedSec = 0;
        pageState.currentSession = 'work';
        pageState.count = 0;
        paused = true;
    }

    // 設定が変更された時に値をクランプしたうえで適用する
    const onNumberChange = (name: keyof typeof inputValues, max: number, min?: number) => {
        if (!min) { min = 1; }

        return (e: Event & { currentTarget: HTMLInputElement }) => {
            const element = e.currentTarget;

            if (Number(element.value) > max) {
                toast.push({ text: () => {
                    let itemName = "N/A";
                    switch (name) {
                        case 'pomodoroMin': itemName = "作業時間"; break;
                        case 'breakMin': itemName = "小休憩時間"; break;
                        case 'longBreakMin': itemName = "休憩時間"; break;
                        case 'longBreakInterval': itemName = "休憩頻度"; break;
                    }

                    return `${itemName}の値は${max}以下である必要があります。`;
                } })

                inputValues[name] = max;

            } else if (Number(element.value) < min) {
                toast.push({ text: () => {
                    let itemName = "N/A";
                    switch (name) {
                        case 'pomodoroMin': itemName = "作業時間"; break;
                        case 'breakMin': itemName = "小休憩時間"; break;
                        case 'longBreakMin': itemName = "休憩時間"; break;
                        case 'longBreakInterval': itemName = "休憩頻度"; break;
                    }

                    return `${itemName}の値は${min}以上である必要があります。`;
                } })

                inputValues[name] = min;
            }

            pageState[name] = inputValues[name];
        }
    }

    onMount(() => {
        toolState.current = 'pomodoro';

        // キーボードショートカット(スペースで開始/停止)
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === ' ') {
                onPlayPauseClick();
                event.preventDefault();
            }
        }

        document.addEventListener('keypress', onKeyDown);

        // アラーム
        breakAlarmAudio = new Audio(BreakAlarmSound);
        workAlarmAudio = new Audio(WorkAlarm2Sound);

        // タイマーを更新する関数
        const updateTimer = () => {
            // 実行中&1秒経過でカウントを進める
            const now = Math.floor(Date.now() / 1000);
            if (paused || (lastUpdatedTime === now)) { return; }
            lastUpdatedTime = now;

            pageState.elapsedSec++;

            // セッションの時間を経過した時
            if (pageState.elapsedSec >= sessionSec) {
                pageState.elapsedSec = 0;

                breakAlarmAudio!.currentTime = 0;
                workAlarmAudio!.currentTime = 0;

                // チカッとさせる
                document.body.style.colorScheme = (theme.theme === 'dark') ? 'light' : 'dark';
                setTimeout(() => {
                    document.body.style.colorScheme = (theme.theme === 'dark') ? 'dark' : 'light';
                }, 600)

                // 状態遷移
                switch (pageState.currentSession) {
                    case 'work':
                        pageState.count++;
                        if (pageState.count % pageState.longBreakInterval === 0) {
                            pageState.currentSession = 'longBreak';
                        } else {
                            pageState.currentSession = 'break';
                        }

                        breakAlarmAudio!.play();
                        break;
                    case 'break':
                    case 'longBreak':
                        pageState.currentSession = 'work';
                        workAlarmAudio!.play();
                        break;
                }
            }
        }

        const intervalTimer = setInterval(updateTimer, 100);

        // LocalStorageからの値の読み出し
        try {
            const savedState = localStorage.getItem('pomodoroState');
            if (savedState) {
                const validatedState = StateSchema.parse(JSON.parse(savedState));
                pageState = validatedState;
            }
        } catch (e) {
            // 初期値を使うだけなので無視
            console.log(e)
        } finally {
            localStorage.setItem('pomodoroState', JSON.stringify(pageState));
        }

        Object.entries(inputValues).forEach((prop) => {
            if (prop[0] in pageState) {
                (inputValues as any)[prop[0]] = (pageState as any)[prop[0]];
            }
        });

        breakAlarmAudio.volume = pageState.volume;
        workAlarmAudio.volume = pageState.volume;
        breakAlarmAudio.muted = pageState.alarmMuted;
        workAlarmAudio.muted = pageState.alarmMuted;

        return () => {
            document.removeEventListener('keypress', onKeyDown);
            clearInterval(intervalTimer);
        }
    });

    // 変更があった時に設定をLocalStorageに保存する
    $effect(() => {
        localStorage.setItem('pomodoroState', JSON.stringify(pageState));
    });
</script>

<svelte:head>
    <title>ポモドーロタイマー | moizlu</title>
</svelte:head>

<main class="mx-auto px-5 w-full max-w-150 h-full min-h-svh overflow-y-auto flex-col-center overflow-x-clip">

    <!-- タイマー表示 -->
    <div class="-z-1 w-fit h-fit">
        <progress value={1.0 - (pageState.elapsedSec / sessionSec)} class="w-full h-10 rotate-180"></progress>
        <h1 class="timer-text mb-10">{`${`${Math.floor(getRemainingTime() / 60)}`.padStart(2, '0')}:${`${getRemainingTime() % 60}`.padStart(2, '0')}`}</h1>
    </div>

    <p class="text-2xl">{pageState.count}ポモドーロ</p>

    <!-- 現在のセッション -->
    <p class="text-5xl mb-5">{(() => {
                    switch (pageState.currentSession) {
                        case 'work':
                            return "作業";
                        case 'break':
                            return "小休憩";
                        case 'longBreak':
                            return "休憩";
                    }
                })()}</p>

    <!-- 開始/停止、リセット -->
    <div class="flex-center gap-10 m-10">
        <button onclick={onPlayPauseClick} class="w-20 h-20 overflow-clip cursor-pointer border-label border-2 rounded-full">
            <div class={["transition-all duration-300 w-full h-fit flex-col-center", (!paused) && "-translate-y-20"]}>
                <SvgIcon Svg={PlayIcon} size={80} />
                <SvgIcon Svg={PauseIcon} size={80} />
            </div>
        </button>

        <button onclick={onResetClick} class="border-label border-2 rounded-full cursor-pointer">
            <SvgIcon Svg={ResetIcon} size={80} />
        </button>
    </div>

    <!-- アラームの音量 -->
    {#if breakAlarmAudio && workAlarmAudio}
        <div class="mt-2 flex-center gap-2">
            <button title="ミュート切り替え" onclick={() => { pageState.alarmMuted = !pageState.alarmMuted; breakAlarmAudio!.muted = pageState.alarmMuted; workAlarmAudio!.muted = pageState.alarmMuted }} class="cursor-pointer">
                {#if pageState.alarmMuted}
                    <SvgIcon Svg={MuteIcon} size={30} />
                {:else}
                    <SvgIcon Svg={VolumeIcon} size={30} />
                {/if}
            </button>
            <input type="range" min={0} max={1} step={0.1} bind:value={breakAlarmAudio.volume} onchange={() => { pageState.volume = breakAlarmAudio!.volume; }}>
            <button title="音量テスト" onclick={() => { breakAlarmAudio!.currentTime = 0; breakAlarmAudio!.play() }} class="p-2 button-general cursor-pointer">
                <p class="text-sm">テスト</p>
            </button>
        </div>

        <p class="m-2 text-xs">※作業開始時と休憩開始時で効果音が違います。</p>
    {/if}

    <!-- 設定 -->
    <div class="w-full flex-col sm:flex-row flex-center gap-2">
        <div class="flex-col-center gap-2">
            <label class="w-full flex-center gap-2">
                <p class="w-35 text-nowrap">作業</p>
                <input type="number" placeholder="" min={1} max={POMODORO_TIME_MAX} step={1} onchange={onNumberChange('pomodoroMin', POMODORO_TIME_MAX)} disabled={!paused} bind:value={inputValues.pomodoroMin} class="w-full text-right">
                <p>分</p>
            </label>
            <label class="w-full flex-center gap-2">
                <p class="w-35 text-nowrap">小休憩</p>
                <input type="number" placeholder="" min={1} max={BREAK_TIME_MAX} step={1} onchange={onNumberChange('breakMin', BREAK_TIME_MAX)} disabled={!paused} bind:value={inputValues.breakMin} class="w-full text-right">
                <p>分</p>
            </label>
        </div>
        <div class="border p-2 rounded-xl -mr-2 flex-col-center gap-2">
            <label class="w-full flex-center gap-2">
                <p class="w-35 text-nowrap">休憩</p>
                <input type="number" placeholder="" min={1} max={LONG_BREAK_TIME_MAX} step={1} onchange={onNumberChange('longBreakMin', LONG_BREAK_TIME_MAX)} disabled={!paused} bind:value={inputValues.longBreakMin} class="w-full text-right">
                <p>分</p>
            </label>
            <label class="w-full flex-center gap-2">
                <p class="w-35 text-nowrap">頻度</p>
                <input type="number" placeholder="" min={1} max={LONG_BREAK_INTERVAL_MAX} step={1} onchange={onNumberChange('longBreakInterval', LONG_BREAK_INTERVAL_MAX)} disabled={!paused} bind:value={inputValues.longBreakInterval} class="w-full text-right">
                <p>回</p>
            </label>
        </div>
    </div>
</main>

<style>
    @reference "../layout.css";

    progress {
        @apply rounded-xl bg-transparent inset-shadow-black inset-shadow-sm/50;
    }

    progress::-webkit-progress-bar {
        @apply rounded-xl bg-transparent;
    }

    progress::-webkit-progress-value {
        @apply rounded-xl transition-all duration-300 bg-label;
    }
    progress::-moz-progress-bar {
        @apply rounded-xl transition-all duration-300 bg-label;
    }

    .timer-text {
        font-size: clamp(10px, 25cqw, 150px);
    }
</style>
