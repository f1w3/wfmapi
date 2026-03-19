/** biome-ignore-all lint/suspicious/noExplicitAny: required for generic type constraints  */
/** biome-ignore-all lint/complexity/noBannedTypes: uses `{}` and other broad types intentionally for structural type checks */

import type { Language, Platform } from "./type";

type HeaderMap = Record<string, string>;

type ResponseLike = {
    ok: boolean;
    status: number;
    statusText: string;
    json(): Promise<unknown>;
};

type FetchLike = (
    input: string,
    init?: {
        method?: string;
        headers?: HeaderMap;
        body?: string;
    }
) => Promise<ResponseLike>;

type QueryPrimitive = string | number | boolean;
type QueryValue = QueryPrimitive | ReadonlyArray<QueryPrimitive> | null | undefined;
type QueryParamsDef = Record<string, QueryValue>;
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

type ApiErrorResponse = {
    request?: Array<string>;
    inputs?: Record<string, string>;
};

export interface ApiResponse<TData> {
    apiVersion: string;
    data: TData;
    error: ApiErrorResponse | null;
}

export interface ClientOptions {
    platform?: Platform;
    language?: Language;
    crossplay?: boolean;
    headers?: HeaderMap;
    fetch?: FetchLike;
}

declare const responseTypeSymbol: unique symbol;
declare const paramsTypeSymbol: unique symbol;
declare const queryTypeSymbol: unique symbol;
declare const bodyTypeSymbol: unique symbol;

type ExtractPathParamNames<Path extends string> = Path extends `${string}:${infer Param}/${infer Rest}`
    ? [Param, ...ExtractPathParamNames<`/${Rest}`>]
    : Path extends `${string}:${infer Param}`
      ? [Param]
      : [];

type StrictPathParamList<Path extends string> =
    ExtractPathParamNames<Path> extends infer Keys extends ReadonlyArray<string>
        ? { readonly [K in keyof Keys]: string }
        : never;

type PathParamMap<Path extends string> =
    ExtractPathParamNames<Path> extends infer Keys extends ReadonlyArray<string>
        ? Keys[number] extends never
            ? never
            : { readonly [K in Keys[number]]: string }
        : never;

type PathParams<Path extends string> =
    ExtractPathParamNames<Path> extends []
        ? readonly []
        : StrictPathParamList<Path> | ReadonlyArray<string> | PathParamMap<Path>;

export type EndpointDef<
    Path extends string = string,
    TResponse = unknown,
    TQuery = never,
    TMethod extends HttpMethod = "GET",
    TBody = never,
> = {
    readonly path: Path;
    readonly method: TMethod;
    readonly hasBody: boolean;
    readonly [responseTypeSymbol]?: TResponse;
    readonly [paramsTypeSymbol]?: PathParams<Path>;
    readonly [queryTypeSymbol]?: TQuery;
    readonly [bodyTypeSymbol]?: TBody;
};

type EndpointBuilder<Path extends string, TMethod extends HttpMethod = "GET", TQuery = never, TBody = never> = {
    query<TNextQuery extends QueryParamsDef>(): EndpointBuilder<Path, TMethod, TNextQuery, TBody>;
    body<TNextBody>(): EndpointBuilder<Path, TMethod, TQuery, TNextBody>;
    response<TResponse>(): EndpointDef<Path, TResponse, TQuery, TMethod, TBody>;
};

function createEndpointBuilder<const Path extends string, TMethod extends HttpMethod, TQuery = never, TBody = never>(
    path: Path,
    method: TMethod,
    hasBody = false
): EndpointBuilder<Path, TMethod, TQuery, TBody> {
    return {
        query<TNextQuery extends QueryParamsDef>() {
            return createEndpointBuilder<Path, TMethod, TNextQuery, TBody>(path, method, hasBody);
        },
        body<TNextBody>() {
            return createEndpointBuilder<Path, TMethod, TQuery, TNextBody>(path, method, true);
        },
        response<TResponse>() {
            return { path, method, hasBody } as EndpointDef<Path, TResponse, TQuery, TMethod, TBody>;
        },
    };
}

export function endpoint<const Path extends string, const TMethod extends HttpMethod = "GET">(
    path: Path,
    method?: TMethod
) {
    return createEndpointBuilder(path, method ?? ("GET" as TMethod));
}

export type ParamsOf<TEndpoint extends EndpointDef<any, any, any, any, any>> =
    TEndpoint extends EndpointDef<infer Path, any, any, any, any> ? PathParams<Path> : never;

export type ResponseOf<TEndpoint extends EndpointDef<any, any, any, any, any>> =
    TEndpoint extends EndpointDef<any, infer TResponse, any, any, any> ? TResponse : never;

export type QueryOf<TEndpoint extends EndpointDef<any, any, any, any, any>> =
    TEndpoint extends EndpointDef<any, any, infer TQuery, any, any> ? TQuery : never;

export type BodyOf<TEndpoint extends EndpointDef<any, any, any, any, any>> =
    TEndpoint extends EndpointDef<any, any, any, any, infer TBody> ? TBody : never;

//type EndpointOfMethod<TMethod extends HttpMethod> = EndpointDef<any, any, any, TMethod, any>;

type RequiredKeys<T extends object> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type HasQuery<TQuery> = [TQuery] extends [never] ? false : true;
type HasBody<TBody> = [TBody] extends [never] ? false : true;
type HasRequiredQuery<TQuery> = TQuery extends object ? (RequiredKeys<TQuery> extends never ? false : true) : false;

type LegacyRequestArgs<TEndpoint extends EndpointDef<any, any, any, any, any>> =
    ParamsOf<TEndpoint> extends readonly []
        ? HasQuery<QueryOf<TEndpoint>> extends true
            ? HasRequiredQuery<QueryOf<TEndpoint>> extends true
                ? [query: QueryOf<TEndpoint>]
                : [query?: QueryOf<TEndpoint>]
            : []
        : HasQuery<QueryOf<TEndpoint>> extends true
          ? HasRequiredQuery<QueryOf<TEndpoint>> extends true
              ? [params: ParamsOf<TEndpoint>, query: QueryOf<TEndpoint>]
              : [params: ParamsOf<TEndpoint>, query?: QueryOf<TEndpoint>]
          : [params: ParamsOf<TEndpoint>];

type RequestOptions<TEndpoint extends EndpointDef<any, any, any, any, any>> = (ParamsOf<TEndpoint> extends readonly []
    ? {}
    : { params: ParamsOf<TEndpoint> }) &
    (HasQuery<QueryOf<TEndpoint>> extends true
        ? HasRequiredQuery<QueryOf<TEndpoint>> extends true
            ? { query: QueryOf<TEndpoint> }
            : { query?: QueryOf<TEndpoint> }
        : {}) &
    (HasBody<BodyOf<TEndpoint>> extends true ? { body: BodyOf<TEndpoint> } : {});

type RequestArgs<TEndpoint extends EndpointDef<any, any, any, any, any>> =
    HasBody<BodyOf<TEndpoint>> extends true
        ? [options: RequestOptions<TEndpoint>]
        : LegacyRequestArgs<TEndpoint> | [options: RequestOptions<TEndpoint>];

function normalizeHeaders(headers?: HeaderMap): HeaderMap {
    return headers ? { ...headers } : {};
}

function setHeader(headers: HeaderMap, name: string, value: string): void {
    const existingKey = Object.keys(headers).find((key) => key.toLowerCase() === name.toLowerCase());
    if (existingKey && existingKey !== name) {
        delete headers[existingKey];
    }
    headers[name] = value;
}

function resolveFetch(fetchImpl?: FetchLike): FetchLike {
    if (fetchImpl) {
        return fetchImpl;
    }

    if (typeof globalThis.fetch === "function") {
        return globalThis.fetch.bind(globalThis) as FetchLike;
    }

    throw new Error("Fetch API is not available in this runtime. Pass `fetch` in ClientOptions.");
}

type PathParamsLike = ReadonlyArray<string> | Record<string, string>;

function buildPath(path: string, params?: PathParamsLike): string {
    let index = 0;

    return path.replace(/:([^/]+)/g, (_, name: string) => {
        const value = Array.isArray(params) ? params[index++] : (params as Record<string, string> | undefined)?.[name];
        if (value == null) {
            throw new Error(`Missing path param "${name}" for "${path}"`);
        }
        return encodeURIComponent(value);
    });
}

function buildQueryString(query?: QueryParamsDef): string {
    if (!query) {
        return "";
    }

    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
        if (value == null) {
            continue;
        }

        if (Array.isArray(value)) {
            for (const item of value) {
                searchParams.append(key, String(item));
            }
            continue;
        }

        searchParams.set(key, String(value));
    }

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
}

type RequestParts = {
    params: PathParamsLike | undefined;
    query: QueryParamsDef | undefined;
    body: unknown;
};

type RequestOptionsLike = {
    params?: PathParamsLike;
    query?: QueryParamsDef;
    body?: unknown;
};

function isRequestOptionsLike(value: unknown): value is RequestOptionsLike {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        ("params" in value || "query" in value || "body" in value)
    );
}

const PATHPARAM_REGEX = /:([^/]+)/;

function resolveRequestParts<TEndpoint extends EndpointDef<any, any, any, any, any>>(
    endpoint: TEndpoint,
    args: RequestArgs<TEndpoint>
): RequestParts {
    const firstArg = args[0];

    if (endpoint.hasBody || isRequestOptionsLike(firstArg)) {
        const options = args[0] as RequestOptionsLike;
        return {
            params: options.params,
            query: options.query,
            body: options.body,
        };
    }

    const hasPathParams = PATHPARAM_REGEX.test(endpoint.path);
    return {
        params: hasPathParams ? (firstArg as PathParamsLike | undefined) : undefined,
        query: (hasPathParams ? args[1] : firstArg) as QueryParamsDef | undefined,
        body: undefined,
    };
}

function buildRequestBody(body: unknown, headers: HeaderMap): string | undefined {
    if (body === undefined) {
        return;
    }

    if (typeof body === "string") {
        return body;
    }

    setHeader(headers, "Content-Type", "application/json");
    return JSON.stringify(body);
}

async function parseJson<T>(res: ResponseLike): Promise<T> {
    return (await res.json()) as T;
}

export class Client {
    private static readonly BASE_URL = "https://api.warframe.market/";

    private readonly defaultHeaders: HeaderMap;
    private readonly fetchImpl: FetchLike;

    constructor(options: ClientOptions = {}) {
        const { platform = "pc", language, crossplay = true, headers, fetch } = options;

        const mergedHeaders = normalizeHeaders(headers);
        setHeader(mergedHeaders, "Platform", platform);
        setHeader(mergedHeaders, "Crossplay", String(crossplay));

        if (language) {
            setHeader(mergedHeaders, "Language", language);
        }

        this.defaultHeaders = mergedHeaders;
        this.fetchImpl = resolveFetch(fetch);
    }

    async req<TEndpoint extends EndpointDef<any, any, any, any, any>>(
        endpoint: TEndpoint,
        ...args: RequestArgs<TEndpoint>
    ): Promise<ApiResponse<ResponseOf<TEndpoint>>> {
        const { params, query, body } = resolveRequestParts(endpoint, args);
        const path = buildPath(endpoint.path, params);
        const headers = normalizeHeaders(this.defaultHeaders);
        const requestBody = buildRequestBody(body, headers);
        const init: { method?: string; headers?: HeaderMap; body?: string } = {
            method: endpoint.method,
            headers,
        };

        if (requestBody !== undefined) {
            init.body = requestBody;
        }

        const res = await this.fetchImpl(`${Client.BASE_URL}${path}${buildQueryString(query)}`, init);

        if (!res.ok) {
            throw new Error(`API error: ${res.status} ${res.statusText}`);
        }

        return await parseJson<ApiResponse<ResponseOf<TEndpoint>>>(res);
    }
}
