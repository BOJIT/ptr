<!--
 * @file Stage3.svelte
 * @author James Bennion-Pedley
 * @brief Stage 3 component
 * @date 11/04/2023
 *
 * @copyright Copyright (c) 2023
 *
-->

<script lang="ts">
    /*-------------------------------- Imports -------------------------------*/

    /*--------------------------------- Props --------------------------------*/

    export let finished: boolean = false;

    /*-------------------------------- Methods -------------------------------*/

    /*------------------------------- Lifecycle ------------------------------*/
</script>

<h2 class:finished>Attach Prototype File</h2>

<style>
    .finished {
        color: var(--color-success-600);
    }
</style>
