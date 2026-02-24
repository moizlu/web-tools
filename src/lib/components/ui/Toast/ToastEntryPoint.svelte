<script lang="ts">
    import InfoIcon from "$lib/assets/icons/info.svelte";
    import CloseIcon from "$lib/assets/icons/close.svelte";

    import { slide } from "svelte/transition";
    import { toast } from "./state.svelte";

    import SvgIcon from "../SvgIcon";
</script>

{#if toast.toast}
    <div transition:slide={{duration: 300, axis: 'y'}} role="status" aria-atomic="true"
        class="z-500 fixed top-0 left-0 mt-5 w-full h-20 flex-center whitespace-pre-wrap">
        <div class="relative w-full h-full max-w-200 m-2 p-2  flex-center bg-base outline-label outline-1 rounded-2xl text-sm sm:text-lg overflow-clip">
            <div class="blink-icon">
                <SvgIcon Svg={InfoIcon} size={40} />
            </div>

            <p class="pr-10 w-full text-center overflow-clip">{(typeof toast.toast.text === 'string') ? toast.toast.text : toast.toast.text()}</p>

            <button title="close" onclick={() => toast.close()} class="absolute top-0 right-0 h-full mr-3 cursor-pointer">
                <SvgIcon Svg={CloseIcon} size={50} />
            </button>
        </div>
    </div>
{/if}

<style>
    p {
        text-overflow: ellipsis;
    }

    @keyframes blink {
        from, to {
            opacity: 0%;
        }
        50% {
            opacity: 100%;
        }
    }

    .blink-icon {
        animation: blink 1.5s ease-in-out infinite;
    }
</style>
