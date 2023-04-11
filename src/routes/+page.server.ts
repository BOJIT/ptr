/**
 * @file +page.server.ts
 * @author James Bennion-Pedley
 * @brief Backend for PTR submission
 * @date 11/04/2023
 *
 * @copyright Copyright (c) 2023
 *
 */

/*-------------------------------- Imports -----------------------------------*/

import type { Actions } from './$types';

import { z } from "zod";

import { sendEmail } from "$lib/email";

/*--------------------------------- State ------------------------------------*/

/*------------------------------- Functions ----------------------------------*/

/*-------------------------------- Exports -----------------------------------*/

export const actions: Actions = {
    default: async (event) => {

        sendEmail(
            "noreply@bojit.org",
            "Reset Password",
            "TEST MESSAGE",
        );

    }
} satisfies Actions;
