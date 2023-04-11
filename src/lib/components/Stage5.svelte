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

    import { Button, TextField } from "@bojit/svelte-components/smelte";

    /*--------------------------------- Props --------------------------------*/

    export let finished: boolean = false;

    let invalid_name: boolean = false;
    let invalid_email: boolean = false;

    let name: string = "";
    let email: string = "";

    /*-------------------------------- Methods -------------------------------*/

    function validate_name(s: string) {
        return s !== null && s !== "";
    }

    function validate_email(email: string) {
        var re =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    /*------------------------------- Lifecycle ------------------------------*/
</script>

<h2 class:finished>Submit PTR</h2>

<TextField
    label="name"
    name="name"
    error={invalid_name ? "Name cannot be empty" : ""}
    bind:value={name}
    on:input={(e) => {
        invalid_name = !validate_name(e.target.value);
    }}
/>

<TextField
    label="email"
    name="email"
    error={invalid_email ? "Email address is invalid" : ""}
    bind:value={email}
    on:input={(e) => {
        invalid_email = !validate_email(e.target.value);
    }}
/>

<div class="fullwidth">
    <Button
        type="submit"
        outlined
        block
        disabled={invalid_name || invalid_email || name === "" || email == ""}
    >
        Submit
    </Button>
</div>

<style>
    h2 {
        text-align: center;
    }

    .finished {
        color: var(--color-success-600);
    }

    .fullwidth {
        display: flex;
        width: 100%;
    }
</style>
