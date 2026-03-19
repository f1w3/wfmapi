import type { Item, ItemShort, Order, OrderWithUser, Transaction, User, UserShort } from "../../type";
import { endpoint } from "../../wfm";

/**
 * GET \
 * https://api.warframe.market/v2/orders/recent
 * @description Get the most recent orders. \
 * 500 max, for the last 4 hours, sorted by `createdAt` \
 * Cached, with 1min refresh interval.
 */
export const $_orders_recent = endpoint("v2/orders/recent").response<Array<OrderWithUser>>();

/**
 * GET \
 * https://api.warframe.market/v2/orders/item/:slug
 * @description Get a list of all orders for an item from users who was online within the last 7 days.
 * @param slug `slug` field from {@link Item.slug} and {@link ItemShort.slug} models
 */
export const $_orders_item_$$ = endpoint("v2/orders/item/:slug").response<Array<OrderWithUser>>();

/**
 * GET \
 * https://api.warframe.market/v2/orders/item/:slug/top
 * @description This endpoint is designed to fetch the top 5 buy and top 5 sell orders for a specific item, exclusively from online users. \
 * Orders are sorted by price.
 * @param slug `slug` field from {@link Item.slug} and {@link ItemShort.slug} models
 */
export const $_orders_item_$$_top = endpoint("v2/orders/item/:slug/top")
    .query<{
        /**
         * @description Filters orders by the **exact** rank specified.
         * @remarks To retrieve all orders for “Arcane Energize” with a rank of **4**, include `rank=4` in the query. \
         * This parameter is ignored if the `rankLt` parameter is provided. \
         * Accepts value between 0 and Max possible rank of an {@link Item.rank}.
         */
        rank?: number;

        /**
         * @description Filters orders with a rank **less than** the specified value.
         * @remarks To retrieve all orders for “Arcane Energize” with a rank less than the maximum possible value of **5** \
         * include `rankLt=5` in the query. \
         * If both `rank` and `rankLt` are provided, `rankLt` takes precedence. \
         * Accepts value between 1 and Max possible rank of an {@link Item.rank}.
         */
        rankLt?: number;

        /**
         * @description Filters orders by the **exact** number of charges left.
         * @remarks To retrieve all orders for “Lohk” with exactly 2 charges left, include `charges=2` in the query. \
         * This parameter is ignored if the `chargesLt` parameter is provided. \
         * Accepts value between 0 and maximum possible charges for the {@link Item.maxCharges}.
         */
        charges?: number;

        /**
         * @description Filters orders where the number of charges left **is less than** the specified value.
         * @remarks To retrieve all orders for “Lohk” with a charges less than the maximum possible value of **3**, include `chargesLt=3` in the query. \
         * If both `charges` and `chargesLt` are provided, `chargesLt` takes precedence. \
         * Accepts value between 1 and maximum possible charges for the {@link Item.maxCharges}.
         */
        chargesLt?: number;

        /**
         * @description Filters orders by the **exact** number of amber stars.
         * @remarks To retrieve all orders for “Ayatan Anasa Sculpture” with exactly 1 amber star, include `amberStars=1` in the query. \
         * This parameter is ignored if the `amberStarsLt` parameter is provided. \
         * Accepts value between 0 and maximum possible amount of amber stars for the {@link Item.amberStars}.
         */
        amberStars?: number;

        /**
         * @description Filters orders where the number of amber stars **is less than** the specified value.
         * @remarks To retrieve all orders for “Ayatan Anasa Sculpture” with an amber stars less than the maximum possible value of 2, include `amberStarsLt=2` in the query. \
         * If both `amberStars` and `amberStarsLt` are provided, `amberStarsLt` takes precedence. \
         * Accepts value between 1 and maximum possible amount of amber stars for the {@link Item.amberStars}.
         */
        amberStarsLt?: number;

        /**
         * @description Filters orders by the **exact** number of cyan stars.
         * @remarks To retrieve all orders for “Ayatan Anasa Sculpture” with exactly 1 cyan star, include `cyanStars=1` in the query. \
         * This parameter is ignored if the `cyanStarsLt` parameter is provided. \
         * Accepts value between 0 and maximum possible amount of cyan stars for the {@link Item.cyanStars}.
         */
        cyanStars?: number;

        /**
         * @description Filters orders where the number of cyan stars **is less than** the specified value.
         * @remarks To retrieve all orders for “Ayatan Anasa Sculpture” with an cyan stars less than the maximum possible value of 2, include `cyanStarsLt=2` in the query. \
         * If both `cyanStars` and `cyanStarsLt` are provided, `cyanStarsLt` takes precedence. \
         * Accepts value between 1 and maximum possible amount of cyan stars for the {@link Item.cyanStars}.
         */
        cyanStarsLt?: number;

        /**
         * @description controls the filtering of orders based on item `subtype` field.
         * @remarks To retrieve all orders for crafted “Ambassador Receiver”, include `subtype=crafted` in the query. \
         * Accepts any valid subtype form an {@link Item.subtypes}.
         */
        subtype?: string;
    }>()
    .response<{
        buy: Array<OrderWithUser>;
        sell: Array<OrderWithUser>;
    }>();

/**
 * GET \
 * https://api.warframe.market/v2/orders/user/:slug
 * @description Getting public orders from specified user.
 * @param slug `slug` field form {@link User.slug} or {@link UserShort.slug} models
 */
export const $_orders_user_$$ = endpoint("v2/orders/user/:slug").response<Array<Order>>();

/**
 * GET \
 * https://api.warframe.market/v2/orders/userId/:userId
 * @description Getting public orders from specified user.
 * @param userId `id` field form {@link User.id} or {@link UserShort.id} models
 */
export const $_orders_userId_$$ = endpoint("v2/orders/userId/:userId").response<Array<Order>>();

/**
 * GET (!) Require authentication \
 * https://api.warframe.market/v2/orders/my
 * @description This endpoint retrieves all orders associated with the currently authenticated user.
 */
export const $_orders_my = endpoint("v2/orders/my").response<Array<Order>>();

/**
 * GET \
 * https://api.warframe.market/v2/order/:id
 * @param id id of an Order
 */
export const $_order_$$ = endpoint("v2/order/:id").response<OrderWithUser>();

/**
 * POST (!) Require authentication \
 * https://api.warframe.market/v2/order
 * @description Create a new order
 */
export const $POST_order = endpoint("v2/order", "POST")
    .body<{
        /**
         * The ID of an item. You can obtain it from {@link Item.id} or {@link ItemShort.id}.
         */
        itemId: string;

        /**
         * The type of order
         */
        type: "buy" | "sell";

        /**
         * The price of the item
         */
        platinum: number;

        /**
         * Your stock, representing how many you have and can sell or buy
         */
        quantity: number;

        /**
         * Determines if the order should be visible or hidden
         */
        visible: boolean;

        /**
         *  The minimum number of items required per transaction or trade
         */
        perTrade?: number;

        /**
         * The rank of the item, such as a mod rank
         */
        rank?: number;

        /**
         * The number of charges remaining (e.g., for parazon mods)
         */
        charges?: number;

        /**
         * The item's subtype. Refer to the Item model for the possible subtypes an item may have (if applicable)
         */
        subtype?: string;

        /**
         * The number of installed amber stars
         */
        amberStars?: number;

        /**
         * The number of installed cyan stars
         */
        cyanStars?: number;
    }>()
    .response<Order>();

/**
 * PATCH (!) Require authentication \
 * https://api.warframe.market/v2/order/:id
 * @description Patch already existing order.
 * @param id `id` field form Order model. {@link Order.id}
 */
export const $PATCH_order_$$ = endpoint("v2/order/:id", "PATCH")
    .body<{
        /**
         * The price of the item
         */
        platinum?: number;

        /**
         * Your stock, representing how many you have and can sell or buy
         */
        quantity?: number;

        /**
         * Determines if the order should be visible or hidden
         */
        visible?: boolean;

        /**
         * The minimum number of items required per transaction or trade
         */
        perTrade?: number;

        /**
         * The rank of the item, such as a mod rank
         */
        rank?: number;

        /**
         * The number of charges remaining (e.g., for parazon mods)
         */
        charges?: number;

        /**
         * The item's subtype. Refer to the Item model for the possible subtypes an item may have (if applicable)
         */
        subtype?: string;

        /**
         * The number of installed amber stars
         */
        amberStars?: number;

        /**
         * The number of installed cyan stars
         */
        cyanStars?: number;
    }>()
    .response<Order>();

/**
 * DELETE (!) Require authentication \
 * https://api.warframe.market/v2/order/:id
 * @param id `id` field form Order model. {@link Order.id}
 */
export const $DELETE_order_$$ = endpoint("v2/order/:id", "DELETE").response<Order>();

/**
 * POST (!) Require authentication \
 * https://api.warframe.market/v2/order/:id/close
 * @description Close a portion or all of an existing order. \
 * Allows you to close part of an open order by specifying a quantity to reduce. \
 * For example, if your order was initially created with a quantity of 20, and you send a request to close 8 units, the remaining quantity will be 12. \
 * If you close the entire remaining quantity, the order will be considered fully closed and removed.
 * @param id `id` field form Order model. {@link Order.id}
 */
export const $POST_order_close_$$ = endpoint("v2/order/:id/close", "POST")
    .body<{
        /**
         * The number of units to close (subtract from the order's current quantity).
         */
        quantity: number;
    }>()
    .response<Transaction>();

/**
 * PATCH (!) Require authentication \
 * https://api.warframe.market/v2/orders/group/:id
 * @description Update group of orders
 * @param id Group Id, **for now only all and ungrouped are available**
 */
export const $PATCH_orders_group_$$ = endpoint("v2/orders/group/:id", "PATCH")
    .body<{
        /**
         * visibility state of all orders withing a group
         */
        visible: boolean;

        /**
         *  target only specific type of orders within a group
         */
        type: "sell" | "buy";
    }>()
    .response<{
        /**
         * How many orders were updated
         */
        updated: number;
    }>();
