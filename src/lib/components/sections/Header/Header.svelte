<script lang="ts">
    import ToolsIcon from "$lib/assets/icons/tools.svelte";

    import SvgIcon from "$lib/components/ui/SvgIcon";

    import { toolState } from "$lib/state/state.svelte";
    import ThemeButton from "./ThemeButton.svelte";
</script>

<header class="fixed w-full h-12.5 z-1000 bg-base flex justify-between items-center px-3">
    <a href="/" title="ホームに戻る" class="h-full flex-center gap-2">
        <SvgIcon Svg={ToolsIcon} size={30} class="text-label" />
        <p class="hidden sm:block">ツール集</p>
    </a>

    <p class="title-text text-3xl">
        {#if toolState.current}
            {toolState.currentInfo?.name}
        {:else}
            ツール集
        {/if}
    </p>

    <ThemeButton />
</header>

<style>
    .title-text {
        font-size: clamp(5px, 6cqw, 40px);
    }
</style>
