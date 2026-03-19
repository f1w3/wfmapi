import { Client } from "wfmapi";
import { $_item_$$, $_orders_item_$$_top } from "wfmapi/api";

const client = new Client({
    platform: "pc",
    crossplay: true,
});

const res = await client.req($_item_$$, ["saryn_prime_set"]);
/*
const res = await client.req($_item_$$, { slug: "saryn_prime_set" });
const res = await client.req($_item_$$, { params: { slug: "saryn_prime_set" } });
*/

console.log(res.data);

await client.req($_orders_item_$$_top, ["arcane_energize"], {
    rank: 5,
});
