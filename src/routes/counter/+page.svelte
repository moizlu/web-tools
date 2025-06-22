<script lang="ts">
    import { browser } from "$app/environment";
    import Icon from "$lib/components/ui/Icon/Icon.svelte";
    import Button from "$lib/components/ui/Button/Button.svelte";
    import Input from "$lib/components/ui/Input/Input.svelte";

    let count = $state(0);
    let incremental = $state(1);

    if (browser) {
        if (localStorage.getItem("counter.count")) {
            count = parseInt(localStorage.getItem("counter.count")!);
        }

        if (localStorage.getItem("counter.incremental")) {
            incremental = parseInt(localStorage.getItem("counter.incremental")!);
        }
    }
</script>

<div class="min-h-screen flex flex-col justify-center items-center">
    <p class="text-9xl">{count}</p>

    <Input placeholder="増分" bind:value={
            () => incremental,
            (v) => {
                incremental = parseInt(v as unknown as string);
                localStorage.setItem("counter.incremental", incremental.toString());
            }
        } type="number" class="m-2 w-40" />

    <div class="flex justify-center items-center m-5 gap-5">
        <Button onclick={() => {
            count += incremental;
            localStorage.setItem("counter.count", count.toString());
        }}>
            <Icon lightSrc="/icons/light/plus.svg" darkSrc="/icons/dark/plus.svg" width={70} class="m-2 drop-shadow-primary drop-shadow-sm" />
        </Button>
        <Button onclick={() => {
            count -= incremental;
            localStorage.setItem("counter.count", count.toString());
        }}>
            <Icon lightSrc="/icons/light/minus.svg" darkSrc="/icons/dark/minus.svg" width={70} class="m-2 drop-shadow-primary drop-shadow-sm" />
        </Button>
    </div>

    <Button onclick={() => {
        count = 0;
        localStorage.setItem("counter.count", count.toString());
    }} class="">
        <Icon lightSrc="/icons/light/reset.svg" darkSrc="/icons/dark/reset.svg" width={60} class="m-2 drop-shadow-primary drop-shadow-sm" />
    </Button>
</div>
