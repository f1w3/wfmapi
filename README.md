# wfmapi

A TypeScript client for the [warframe.market](https://warframe.market) API.
Endpoints are defined with types, allowing you to handle path params, query, and body in a type-safe way via `Client#req()`.

## Install

```bash
npm install wfmapi
```

[!NOTE]
A runtime environment with fetch support is assumed.
If globalThis.fetch is not available, pass your own fetch implementation to the Client.

## Quick Start

```typescript
import { Client } from "wfmapi";
import { $_item_$$ } from "wfmapi/api";

const client = new Client({
    platform: "pc",
    crossplay: true,
});

const res = await client.req($_item_$$, ["saryn_prime_set"]);

console.log(res.data);
```

`wfmapi/api` re-exports the `v2` endpoints.
If you want to be explicit, you can import from `wfmapi/api/v2`.

## Usage

### Client

```typescript
import { Client } from "wfmapi";

const client = new Client({
    platform: "pc",
    language: "en",
    crossplay: true,
    headers: {
        "X-Custom-Header": "value",
    },
});
```

Available options:

- `platform`: `"pc" | "ps4" | "xbox" | "switch" | "mobile"`
- `language`: language codes supported by warframe.market (e.g. "en")
- `crossplay`: `true | false`
- `headers`: additional headers
- `fetch`: custom fetch implementation

### Path Params

Path params can be passed either as an array or an object.

```typescript
import { Client } from "wfmapi";
import { $_user_$$ } from "wfmapi/api";

const client = new Client();

await client.req($_user_$$, ["some_user_slug"]);
await client.req($_user_$$, { params: { slug: "some_user_slug" } });
```

### Query Params

For endpoints with query parameters, you can pass them as the second argument or via the options object.

```typescript
import { Client } from "wfmapi";
import { $_orders_item_$$_top } from "wfmapi/api";

const client = new Client();

await client.req($_orders_item_$$_top, ["arcane_energize"], {
    rank: 5,
});

await client.req($_orders_item_$$_top, {
    params: { slug: "arcane_energize" },
    query: { rank: 5 },
});
```

### Request Body

```typescript
import { Client } from "wfmapi";
import { $POST_order } from "wfmapi/api";

const client = new Client({
    headers: {
        "<header>": "<value>",
    },
});

await client.req($POST_order, {
    body: {
        itemId: "item-id",
        type: "sell",
        platinum: 100,
        quantity: 1,
        visible: true,
    },
});
```

For authenticated APIs, pass the required headers via headers.
The header name and value must follow the warframe.market specification.

### Response Shape

Responses have the following structure:

```typescript
type ApiResponse<T> = {
    apiVersion: string;
    data: T;
    error: {
        request?: Array<string>;
        inputs?: Record<string, string>;
    } | null;
};
```

The type of data is automatically inferred from the endpoint definition.

## License

See [MIT LICENSE](/LICENSE).
