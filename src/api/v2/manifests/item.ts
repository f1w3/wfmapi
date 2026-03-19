import type { Item, ItemShort } from "../../../type";
import { endpoint } from "../../../wfm";

/**
 * GET \
 * https://api.warframe.market/v2/items
 * @description Get list of all tradable items
 */
export const $_items = endpoint("v2/items").response<Array<Item>>();

/**
 * GET \
 * https://api.warframe.market/v2/item/:item
 * @description Get full info about one, particular item
 * @param item `slug` field from {@link Item.slug} and {@link ItemShort.slug} models
 */
export const $_item_$$ = endpoint("v2/item/:slug").response<Item>();

/**
 * GET \
 * https://api.warframe.market/v2/item/:item/set
 * @description Retrieve Information on Item Sets
 * @remarks In WFM, items can either be standalone or part of a set. A set is a collection of related items that are often traded together. \
 * 1.If the queried item is not part of any set, the response will contain an array with just that one item. \
 * 2.If the item is part of a set or is a set itself, the response will include an array of all items within that set.
 * @param slug `slug` field from {@link Item.slug} and {@link ItemShort.slug} models
 */
export const $_item_$$_set = endpoint("v2/item/:slug/set").response<{
    /**
     * id of an item you requested.
     */
    id: string;
    /**
     * array of items
     */
    items: Array<Item>;
}>();
