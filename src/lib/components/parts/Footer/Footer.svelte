<script lang="ts">
    import LinkButton from "$lib/components/ui/LinkButton/LinkButton.svelte";
</script>

<footer class="fixed bottom-0 left-0 flex justify-center items-center m-5">
    <img src="/logo/light/moizlu.svg" alt="logo" width={50} class="drop-shadow-primary drop-shadow-sm">

    <LinkButton href="https://moiz.lu/" target="_blank" isInvert={true} class="m-2 p-1">
        <p class="">リンク集</p>
    </LinkButton>
</footer>
