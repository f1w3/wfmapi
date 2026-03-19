import type { LichEphemera, LichQuirk, LichWeapon } from "../../../type";
import { endpoint } from "../../../wfm";

/**
 * GET \
 * https://api.warframe.market/v2/lich/weapons
 * @description Get list of all tradable lich weapons
 */
export const $_lich_weapons = endpoint("v2/lich/weapons").response<Array<LichWeapon>>();

/**
 * GET \
 * https://api.warframe.market/v2/lich/weapon/:slug
 * @description Get full info about one, particular lich weapon
 * @param slug `slug` field from {@link LichWeapon.slug} model
 */
export const $_lich_weapon_$$ = endpoint("v2/lich/weapon/:slug").response<LichWeapon>();

/**
 * GET \
 * https://api.warframe.market/v2/lich/ephemeras
 * @description Get list of all tradable lich ephemeras
 */
export const $_lich_ephemeras = endpoint("v2/lich/ephemeras").response<Array<LichEphemera>>();

/**
 * GET \
 * https://api.warframe.market/v2/lich/quirks
 * @description Get list of all tradable lich quirks
 */
export const $_lich_quirks = endpoint("v2/lich/quirks").response<Array<LichQuirk>>();
