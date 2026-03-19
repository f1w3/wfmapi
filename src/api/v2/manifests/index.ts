import type { Location, Mission, Npc } from "../../../type";
import { endpoint } from "../../../wfm";

/**
 * GET \
 * https://api.warframe.market/v2/locations
 * @description Get list of all locations ~~(that are known to WFM)~~
 */
export const $_locations = endpoint("v2/locations").response<Array<Location>>();

/**
 * GET \
 * https://api.warframe.market/v2/missions
 * @description Get list of all Missions ~~(that are known to WFM)~~
 */
export const $_missions = endpoint("v2/missions").response<Array<Mission>>();

/**
 * GET \
 * https://api.warframe.market/v2/npcs
 * @description Get list of all NPC’s ~~(that are known to WFM)~~
 */
export const $_npcs = endpoint("v2/npcs").response<Array<Npc>>();

/**
 * GET \
 * https://api.warframe.market/v2/versions
 * @description This endpoint retrieves the current version number of the server's resources, formatted either as a semVer string or as an arbitrary version identifier. \
 * Whenever the server database is updated or new versions of mobile apps are released, the version number for relevant resources is also updated. \
 * Client applications can check this endpoint periodically to fetch the current server version. \
 * A discrepancy between the server's version number and the client's indicates that an update has occurred. \
 * In such cases, clients should refresh their local data, like re-downloading item lists, to stay synchronized with the server's latest updates.
 */
export const $_versions = endpoint("v2/versions").response<{
    apps: {
        ios: string;
        android: string;
        minIos: string;
        minAndroid: string;
    };
    collections: {
        items: string;
        rivens: string;
        liches: string;
        sisters: string;
        missions: string;
        npcs: string;
        locations: string;
    };
    updatedAt: string;
}>();
