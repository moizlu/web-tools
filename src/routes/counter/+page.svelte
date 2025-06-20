<script lang="ts">
    import Button from "$lib/components/ui/Button/Button.svelte";

    let count = $state(0);
</script>

<div class="min-h-screen flex flex-col justify-center items-center">
    <p class="text-9xl">{count}</p>
    <div class="flex justify-center items-center m-5 gap-5">
        <Button onclick={() => count++} class="h-15 w-15">
            <p class="text-5xl">+</p>
        </Button>
        <Button onclick={() => count--} class="h-15 w-15">
            <p class="text-5xl">-</p>
        </Button>
    </div>

    <Button onclick={() => count = 0} class="p-1">
        <p class="text-5xl">リセット</p>
    </Button>
</div>