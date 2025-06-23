<script lang="ts">
  import { browser } from "$app/environment";
    import Button from "$lib/components/ui/Button/Button.svelte";

    interface Now {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
    }

    const now: Now = $state({
        year:   0,
        month:  0,
        day:    0,
        hour:   0,
        minute: 0,
        second: 0,
    });

    let is12HourFormat = $state(true);

    if (browser) {
        if (localStorage.getItem("clock.is12HourFormat")) {
            is12HourFormat = localStorage.getItem("clock.is12HourFormat")! === 'true';
        }
    }

    setInterval(() => {
        const date = new Date();

        now.year   = date.getFullYear();
        now.month  = date.getMonth() + 1;
        now.day    = date.getDate();
        now.hour   = date.getHours();
        now.minute = date.getMinutes();
        now.second = date.getSeconds();
    }, 300);

    const alignDigit = (num: number): string => {
        return num.toString().padStart(2, '0');
    }

</script>

<div class="min-h-screen flex flex-col justify-center items-center">
    <p class="text-2xl sm:text-6xl lg:text-6xl">{`${now.year}年${now.month}月${now.day}日`}</p>
    <p class="text-3xl sm:text-7xl lg:text-8xl">{`${(is12HourFormat) ? `${now.hour > 12 ? "午後" : "午前"}${alignDigit(now.hour % 12)}` : alignDigit(now.hour)}時${alignDigit(now.minute)}分${alignDigit(now.second)}秒`}</p>
    <Button onclick={() => {
            is12HourFormat = !is12HourFormat
            localStorage.setItem("clock.is12HourFormat", (is12HourFormat) ? "true" : "false");
        }} class="p-2 m-2">
        <p class="text-5xl">{(is12HourFormat) ? "12H" : "24H"}</p>
    </Button>
</div>