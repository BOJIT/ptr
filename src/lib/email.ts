/**
 * @file email.ts
 * @author James Bennion-Pedley
 * @brief Send an email using the MailChannels API
 * @date 11/04/2023
 *
 * @copyright Copyright (c) 2023
 *
 */

/*-------------------------------- Imports -----------------------------------*/

import { dev } from "$app/environment";

/*--------------------------------- State ------------------------------------*/

/*------------------------------- Functions ----------------------------------*/

/*-------------------------------- Exports -----------------------------------*/

/**
 * Sends an email using the MailChannels API
 * @param to
 * @param subject
 * @param body
 */
export async function sendEmail(to: string, from: string, subject: string, body: string) {
    let fromAddress = from.replace(/[^a-zA-Z0-9]/g, '.');

    const request = new Request("https://api.mailchannels.net/tx/v1/send", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            personalizations: [
                {
                    to: [{ email: to }]
                }
            ],
            from: {
                email: fromAddress.concat("@bojit.org"),
                name: from
            },
            subject,
            content: [
                {
                    type: "text/plain",
                    value: body
                }
            ]
        })
    });

    if (dev) {
        console.log(`Sending email:
            To: ${to}
            Subject: ${subject}
            Body:
            ${body}`);
    } else {
        const response = await fetch(request);
        if (response.status >= 400) {
            console.error(
                `Error sending email: ${response.status} ${response.statusText} ${await response.text()}`
            );
        }
    }
}
