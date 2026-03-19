import type { RivenAttribute, RivenItem } from "../../../type";
import { endpoint } from "../../../wfm";

/**
 * GET \
 * https://api.warframe.market/v2/riven/weapons
 * @description Get list of all tradable riven items
 */
export const $_riven_weapons = endpoint("v2/riven/weapons").response<Array<RivenItem>>();

/**
 * GET \
 * https://api.warframe.market/v2/riven/weapon/:slug
 * @description Get full info about one, particular riven item
 * @param slug `slug` field from {@link RivenItem.slug} model
 */
export const $_riven_weapon_$$ = endpoint("v2/riven/weapon/:slug").response<RivenItem>();

/**
 * GET \
 * https://api.warframe.market/v2/riven/attributes
 * @description Get list of all attributes for riven weapons
 */
export const $_riven_attributes = endpoint("v2/riven/attributes").response<Array<RivenAttribute>>();
