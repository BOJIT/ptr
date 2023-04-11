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

function getRandomDate(from: Date, to: Date) {
    const fromTime = from.getTime();
    const toTime = to.getTime();
    return new Date(fromTime + Math.random() * (toTime - fromTime));
}

async function randomNames(): Promise<string[]> {
    let url = "https://en.wikipedia.org/w/api.php";

    // Timestamp used for range selection
    const random = getRandomDate(new Date('1999-02-12T01:57:45.271Z'), new Date('2022-02-12T01:57:45.271Z'))

    const params: { [key: string]: string } = {
        action: "query",
        format: "json",
        list: "categorymembers",
        cmsort: 'timestamp',
        cmstart: random.toISOString(),
        cmtitle: "Category:Living+people",
        cmlimit: "10",
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

    console.log(url);

    const response = await fetch(url);
    const payload = await response.json();

    let names = payload.query.categorymembers.map((c: any) => { return c.title });

    return names;
}

/*-------------------------------- Exports -----------------------------------*/

export const actions: Actions = {
    default: async (event) => {

        const names = await randomNames();
        const contacts = names.sort(() => Math.random() - 0.5);

        for (let i = 0; i < names.length; i++) {
            const now = new Date();
            const then = new Date();
            then.setDate(now.getDate() + 21);
            const ooo = getRandomDate(now, then)

            // Don't await promise: sends in parallel
            sendEmail(
                "noreply@bojit.org",
                names[i],
                "Automatic Reply: Out of Office till xxxx",
                `Hi, I'm out of office until ${ooo.toLocaleDateString()}. Please contact ${contacts[i]} for enquirys`,
            );
        }
    }
} satisfies Actions;
