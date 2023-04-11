<!--
 * @file Stage5.svelte
 * @author James Bennion-Pedley
 * @brief Stage 5 component
 * @date 11/04/2023
 *
 * @copyright Copyright (c) 2023
 *
-->

<script lang="ts">
    /*-------------------------------- Imports -------------------------------*/

    import { Button } from "@bojit/svelte-components/smelte";

    /*--------------------------------- Props --------------------------------*/

    export let finished: boolean = false;

    /*-------------------------------- Methods -------------------------------*/

    /*------------------------------- Lifecycle ------------------------------*/
</script>

<h2 class:finished>Submit PTR</h2>

<Button type="submit">Submit</Button>

<style>
    .finished {
        color: var(--color-success-600);
    }
</style>
