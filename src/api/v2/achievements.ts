import type { Achievement, User, UserShort } from "../../type";
import { endpoint } from "../../wfm";

/**
 * GET \
 * https://api.warframe.market/v2/achievements
 * @description Get list of all available achievements, except secret ones.
 */
export const $_achievements = endpoint("v2/achievements").response<Array<Omit<Achievement, "state">>>();

/**
 * GET \
 * https://api.warframe.market/v2/achievements/user/:slug
 * @description Get a list of all user achievements
 * @param slug - slug field form {@link User.slug} or {@link UserShort.slug} models
 */
export const $_achievements_user_$$ = endpoint("v2/achievements/user/:slug").response<Array<Achievement>>();

/**
 * GET \
 * https://api.warframe.market/v2/achievements/userId/:userId
 * @description Get a list of all user achievements
 * @param userId - id field form {@link User.id} or {@link UserShort.id} models
 */
export const $_achievements_userId_$$ = endpoint("v2/achievements/userId/:userId").response<Array<Achievement>>();
