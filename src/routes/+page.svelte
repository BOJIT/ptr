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

    import { invalidateAll } from "$app/navigation";
    import { applyAction, deserialize } from "$app/forms";

    import { message } from "@bojit/svelte-components/core";
    import { Content } from "@bojit/svelte-components/layout";
    import { Tabs } from "@bojit/svelte-components/widgets";

    import logo from "$lib/img/bojcenter.png";

    import Stage1 from "$lib/components/Stage1.svelte";
    import Stage2 from "$lib/components/Stage2.svelte";
    import Stage3 from "$lib/components/Stage3.svelte";
    import Stage4 from "$lib/components/Stage4.svelte";
    import Stage5 from "$lib/components/Stage5.svelte";

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

        message.push({
            type: "info",
            title: "PTR Submitted",
            message: "PTR submitted to workflow",
            timeout: 10,
        });
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
            { label: "Stage 1" },
            { label: "Stage 2" },
            { label: "Stage 3" },
            { label: "Stage 4" },
            { label: "Stage 5" },
        ]}
    >
        <div class="tab">
            <Stage1 />
        </div>

        <div class="tab">
            <Stage2 />
        </div>

        <div class="tab">
            <Stage3 />
        </div>

        <div class="tab">
            <Stage4 />
        </div>

        <div class="tab">
            <form method="POST" on:submit|preventDefault={handleSubmit}>
                <Stage5 />
            </form>
        </div>
    </Tabs>
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

    .brand img {
        margin: 0px !important;
        height: 6rem;
        width: 7rem;
    }

    @media (max-width: 768px) {
        .brand {
            height: 4rem;
        }

        .brand h1 {
            padding-top: 0rem;
            font-size: 3rem;
        }

        .brand img {
            height: 2.8rem;
            width: 3.4rem;
        }
    }
</style>
