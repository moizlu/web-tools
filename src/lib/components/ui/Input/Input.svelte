<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";

    interface Props extends HTMLInputAttributes {}
    let { placeholder, value=$bindable(), class: className, ...props }: Props = $props();
</script>

<div class={[className, "relative"]}>
    <input type="text" id="input" class="pt-5 p-2 w-full border-1 border-accent focus:outline-none peer" bind:value={value} placeholder=" " />
    <label for="input" class="z-10 absolute pointer-events-none duration-300 start-1
                                          transform -translate-y-4 scale-85 top-3 px-2 origin-[0]
                                          peer-focus:-translate-y-4 peer-focus:scale-85 peer-focus:top-3
                                          peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2">
        {placeholder}
    </label>
</div>
