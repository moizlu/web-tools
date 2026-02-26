<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        session: 'work' | 'break' | 'longBreak';
        progress: number
    }
    const { session, progress }: Props = $props();

    let progressBarElement: HTMLDivElement | undefined = undefined;
    let styles: {
        progressFillWorkLight: string,
        progressFillWorkDark: string,
        progressFillBreakLight: string,
        progressFillBreakDark: string,
    } = {
        progressFillWorkLight: "",
        progressFillWorkDark: "",
        progressFillBreakLight: "",
        progressFillBreakDark: ""
    };

    $effect(() => {
        if (!progressBarElement) { return; }

        progressBarElement.style.width = `${Math.floor(progress * 100)}%`;

        const isDarkMode = document.body.style.colorScheme === 'dark';
        switch (session) {
            case 'work':
                progressBarElement.style.backgroundColor = (isDarkMode) ? styles.progressFillWorkDark : styles.progressFillWorkLight;
                break;
            case 'break':
            case 'longBreak':
                progressBarElement.style.backgroundColor = (isDarkMode) ? styles.progressFillBreakDark : styles.progressFillBreakLight;
                break;
        }
    });

    onMount(() => {
        const rootStyles = getComputedStyle(document.body);

        styles = {
            progressFillWorkLight: rootStyles.getPropertyValue("--pomodoro-progress-fill-work-light"),
            progressFillWorkDark: rootStyles.getPropertyValue("--pomodoro-progress-fill-work-dark"),
            progressFillBreakLight: rootStyles.getPropertyValue("--pomodoro-progress-fill-break-light"),
            progressFillBreakDark: rootStyles.getPropertyValue("--pomodoro-progress-fill-break-dark"),
        };
    });
</script>

<div class="w-full h-10 rounded-xl inset-shadow-black inset-shadow-sm rotate-180 overflow-clip">
    <div bind:this={progressBarElement} class="transition-all duration-300 h-full bg-label"></div>
</div>
