<script lang="ts">
    import LinkButton from "$lib/components/ui/LinkButton/LinkButton.svelte";
    import Icon from "$lib/components/ui/Icon/Icon.svelte";
</script>

{#snippet toolLink(href: string, text: string, lightSrc: string, darkSrc: string)}
    <LinkButton {href} class="m-2 p-2 flex justify-start items-center">
        <Icon {lightSrc} {darkSrc} width={30} class="m-2 drop-shadow-primary drop-shadow-sm" />
        <p class="text-xl">{text}</p>
    </LinkButton>
{/snippet}

<div class="min-h-screen flex flex-col justify-center items-center">
    <h1>ツール</h1>
    <div class="w-70 flex flex-col justify-center items-stretch">
        {@render toolLink("/counter", "カウンター", "/icons/light/swap-vertical.svg", "/icons/dark/swap-vertical.svg")}
        {@render toolLink("/clock", "時計", "/icons/light/clock.svg", "/icons/dark/clock.svg")}
    </div>
</div>
