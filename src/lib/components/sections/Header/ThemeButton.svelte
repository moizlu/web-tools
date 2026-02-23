<script lang="ts">
    import LightIcon from "$lib/assets/icons/light.svelte";
    import DarkIcon from "$lib/assets/icons/dark.svelte";

    import { theme } from "$lib/state";

    import SvgIcon from "$lib/components/ui/SvgIcon";

    const onclick = () => {
        theme.theme = (theme.theme === 'dark') ? 'light' : 'dark';
    }
</script>

<button {onclick} class="m-2 w-10 h-10 overflow-clip cursor-pointer">
    <div class={["transition-all duration-300 w-full h-full", theme.theme === 'light' && '-translate-y-10']}>
        <SvgIcon Svg={DarkIcon} size={40} />
        <SvgIcon Svg={LightIcon} size={40} />
    </div>
</button>
