<!--
 * @file +page.svelte
 * @author James Bennion-Pedley
 * @brief Homepage
 * @date 11/04/2023
 *
 * @copyright Copyright (c) 2023
 *
-->

<script lang="ts">
    /*-------------------------------- Imports -------------------------------*/

    import { invalidateAll, goto } from "$app/navigation";
    import { applyAction, deserialize } from "$app/forms";

    import { Button } from "@bojit/svelte-components/smelte";
    import { Content } from "@bojit/svelte-components/layout";
    import { Tabs } from "@bojit/svelte-components/widgets";

    import logo from "$lib/img/bojcenter.png";

    /*--------------------------------- Props --------------------------------*/

    /*-------------------------------- Methods -------------------------------*/

    async function handleSubmit(event: FormDataEvent) {
        const data = new FormData(this);

        const response = await fetch(this.action, {
            method: "POST",
            body: data,
        });

        const result: ActionResult = deserialize(await response.text());

        if (result.type === "success") {
            // re-run all `load` functions, following the successful update
            await invalidateAll();
        }

        applyAction(result);
    }

    /*------------------------------- Lifecycle ------------------------------*/
</script>

<svelte:head>
    <title>BOJCenter</title>
</svelte:head>

<Content>
    <div class="brand">
        <img src={logo} alt="bojcenter" />
        <h1>BOJCenter</h1>
    </div>

    <hr />

    <Tabs
        tabs={[
            {
                label: "Stage 1",
            },
            {
                label: "Stage 2",
            },
        ]}
    />

    <form method="POST" on:submit|preventDefault={handleSubmit}>
        <Button type="submit">Submit</Button>
    </form>
</Content>

<style>
    .brand {
        height: 8rem;
        display: flex;

        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .brand h1 {
        padding-top: 1rem;
        font-size: 6rem;
    }

    img {
        margin: 0px !important;
        height: 6rem;
        width: 7rem;
    }
</style>
