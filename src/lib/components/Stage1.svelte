<!--
 * @file Stage1.svelte
 * @author James Bennion-Pedley
 * @brief Stage 1 component
 * @date 11/04/2023
 *
 * @copyright Copyright (c) 2023
 *
-->

<script lang="ts">
    /*-------------------------------- Imports -------------------------------*/

    import { Slider } from "@bojit/svelte-components/smelte";

    /*--------------------------------- Props --------------------------------*/

    export let finished: boolean = false;

    let value = 50;

    /*-------------------------------- Methods -------------------------------*/

    /*------------------------------- Lifecycle ------------------------------*/

    $: finished = value === 30;
</script>

<h2 class:finished>Create Design Item</h2>
<Slider bind:value />
<p>{value}</p>

<style>
    .finished {
        color: var(--color-success-600);
    }
</style>
