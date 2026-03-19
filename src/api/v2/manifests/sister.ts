import type { SisterEphemera, SisterQuirk, SisterWeapon } from "../../../type";
import { endpoint } from "../../../wfm";

/**
 * GET \
 * https://api.warframe.market/v2/sister/weapons
 * @description Get list of all tradable sister weapons
 */
export const $_sister_weapons = endpoint("v2/sister/weapons").response<Array<SisterWeapon>>();

/**
 * GET \
 * https://api.warframe.market/v2/sister/weapon/:slug
 * @description Get full info about one, particular sister weapon
 * @param slug `slug` field from {@link SisterWeapon.slug} model
 */
export const $_sister_weapon_$$ = endpoint("v2/sister/weapon/:slug").response<SisterWeapon>();

/**
 * GET \
 * https://api.warframe.market/v2/sister/ephemeras
 * @description Get list of all tradable sister ephemera’s
 */
export const $_sister_ephemeras = endpoint("v2/sister/ephemeras").response<Array<SisterEphemera>>();

/**
 * GET \
 * https://api.warframe.market/v2/sister/quirks
 * @description Get list of all tradable sister quirks
 */
export const $_sister_quirks = endpoint("v2/sister/quirks").response<Array<SisterQuirk>>();
