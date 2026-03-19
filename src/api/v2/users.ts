import type { User, UserPrivate, UserShort } from "../../type";
import { endpoint } from "../../wfm";

/**
 * GET (!) Require authentication \
 * https://api.warframe.market/v2/me
 * @description Getting information about current authenticated user.
 */
export const $_me = endpoint("v2/me").response<UserPrivate>();

/**
 * PATCH (!) Require authentication \
 * https://api.warframe.market/v2/me
 * @description Updating your own user record
 */
export const $PATCH_me = endpoint("v2/me", "PATCH")
    .body<{
        /**
         * profile description
         */
        about?: string;
        /**
         * main platform you are playing on
         */
        platform?: string;
        /**
         * is crossplay enabled for your warframe account
         */
        crossplay?: boolean;
        /**
         * UI locale and preferable communication language
         */
        locale?: string;
        /**
         * UI theme
         */
        theme?: "light" | "dark" | "system";
        /**
         * should we sync locale across devices
         */
        syncLocale?: boolean;
        /**
         * should we sync theme across devices
         */
        syncTheme?: boolean;
    }>()
    .response<UserPrivate>();

/**
 * GET \
 * https://api.warframe.market/v2/user/:slug
 * @description Getting information about particular user
 * @param slug field form {@link User.slug} or {@link UserShort.slug} models
 */
export const $_user_$$ = endpoint("v2/user/:slug").response<User>();

/**
 * GET \
 * https://api.warframe.market/v2/userId/:userId
 * @description Getting information about particular user
 * @param userId `id` field form {@link User.id} or {@link UserShort.id} models
 */
export const $_userId_$$ = endpoint("v2/userId/:userId").response<User>();
