<script lang="ts">
    import Icon from "$lib/components/ui/Icon/Icon.svelte";

    import ThemeButton from "$lib/components/ui/ThemeButton/ThemeButton.svelte";
</script>

<header class="pointer-events-none fixed w-full top-0 left-0 flex justify-between items-center">
    <a href="/">
        <Icon lightSrc="/icons/light/home.svg" darkSrc="/icons/dark/home.svg" width={50} class="pointer-events-auto m-3" />
    </a>
    <ThemeButton class="pointer-events-auto" />
</header>
