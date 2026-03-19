export type Language = "ko" | "ru" | "de" | "fr" | "pt" | "zh-hans" | "zh-hant" | "es" | "it" | "pl" | "uk" | "en";

export type Platform = "pc" | "ps4" | "xbox" | "switch" | "mobile";

export type Scope = "me" | "profile" | "settings" | "contracts" | "ledger" | "reviews";

export type Role = "user" | "moderator" | "admin";

export type Tier = "none" | "bronze" | "silver" | "gold" | "diamond";

export type Status = "invisible" | "offline" | "online" | "ingame" | "in_game";

export type ActivityType =
    | ""
    | "unknown"
    | "dojo"
    | "on_mission"
    | "in_orbiter"
    | "in_relay"
    | "idle"
    | "UNKNOWN"
    | "IDLE"
    | "ON_MISSION"
    | "IN_DOJO"
    | "IN_ORBITER"
    | "IN_RELAY";

export type I18nMap<T> = Partial<Record<Language | string, T>>;

export type Activity = {
    type: ActivityType;
    details?: string;
    startedAt?: string;
};

export type ItemI18N = {
    name: string;
    description?: string;
    wikiLink?: string;
    icon: string;
    thumb: string;
    subIcon?: string;
};

export type Item = {
    id: string;
    slug: string;
    gameRef: string;
    tags?: Array<string>;
    setRoot?: boolean;
    setParts?: Array<string>;
    quantityInSet?: number;
    rarity?: string;
    bulkTradable?: boolean;
    subtypes?: Array<string>;
    maxRank?: number;
    maxCharges?: number;
    maxAmberStars?: number;
    maxCyanStars?: number;
    baseEndo?: number;
    endoMultiplier?: number;
    ducats?: number;
    vosfor?: number;
    reqMasteryRank?: number;
    vaulted?: boolean;
    tradingTax?: number;
    tradable?: boolean;
    i18n?: I18nMap<ItemI18N>;
    amberStars?: number;
    cyanStars?: number;
    rank?: number;
};

export type ItemShort = Item;

export type RivenI18N = {
    itemName?: string;
    wikiLink?: string;
    icon: string;
    thumb: string;
};

export type RivenType = "kitgun" | "melee" | "pistol" | "rifle" | "shotgun" | "zaw";

export type RivenItem = {
    id: string;
    slug: string;
    gameRef: string;
    group?: string;
    rivenType?: RivenType;
    disposition: number;
    reqMasteryRank: number;
    i18n?: I18nMap<RivenI18N>;
};

export type RivenAttributeI18N = {
    effect: string;
    icon: string;
    thumb: string;
};

export type RivenAttribute = {
    id: string;
    slug: string;
    gameRef: string;
    group?: string;
    prefix: string;
    suffix: string;
    exclusiveTo?: Array<string>;
    positiveIsNegative?: boolean;
    unit?: string;
    positiveOnly?: boolean;
    negativeOnly?: boolean;
    i18n?: I18nMap<RivenAttributeI18N>;
};

export type LichWeaponI18N = {
    itemName: string;
    wikiLink?: string;
    icon: string;
    thumb: string;
};

export type LichWeapon = {
    id: string;
    slug: string;
    gameRef: string;
    reqMasteryRank: number;
    i18n?: I18nMap<LichWeaponI18N>;
};

export type LichEphemeraI18N = {
    itemName: string;
    icon: string;
    thumb: string;
};

export type LichEphemera = {
    id: string;
    slug: string;
    gameRef: string;
    animation: string;
    element: string;
    i18n?: I18nMap<LichEphemeraI18N>;
};

export type LichQuirkI18N = {
    itemName: string;
    description?: string;
    icon?: string;
    thumb?: string;
};

export type LichQuirk = {
    id: string;
    slug: string;
    group?: string;
    i18n?: I18nMap<LichQuirkI18N>;
};

export type SisterWeaponI18N = {
    itemName: string;
    wikiLink?: string;
    icon: string;
    thumb: string;
};

export type SisterWeapon = {
    id: string;
    slug: string;
    gameRef: string;
    reqMasteryRank: number;
    i18n?: I18nMap<SisterWeaponI18N>;
};

export type SisterEphemeraI18N = {
    itemName: string;
    icon: string;
    thumb: string;
};

export type SisterEphemera = {
    id: string;
    slug: string;
    gameRef: string;
    animation: string;
    element: string;
    i18n?: I18nMap<SisterEphemeraI18N>;
};

export type SisterQuirkI18N = {
    itemName: string;
    description?: string;
    icon: string;
    thumb: string;
};

export type SisterQuirk = {
    id: string;
    slug: string;
    group?: string;
    i18n?: I18nMap<SisterQuirkI18N>;
};

export type NpcI18N = {
    name: string;
    icon: string;
    thumb: string;
};

export type Npc = {
    id: string;
    slug: string;
    gameRef: string;
    i18n?: I18nMap<NpcI18N>;
};

export type LocationI18N = {
    nodeName: string;
    systemName?: string;
    icon: string;
    thumb: string;
};

export type Location = {
    id: string;
    slug: string;
    gameRef: string;
    faction?: string;
    minLevel?: number;
    maxLevel?: number;
    i18n?: I18nMap<LocationI18N>;
};

export type MissionI18N = {
    name: string;
    icon?: string;
    thumb?: string;
};

export type Mission = {
    id: string;
    slug: string;
    gameRef: string;
    i18n?: I18nMap<MissionI18N>;
};

export type OrderType = "buy" | "sell";

export type Order = {
    id: string;
    type: OrderType;
    platinum: number;
    quantity: number;
    perTrade?: number;
    rank?: number;
    charges?: number;
    subtype?: string;
    amberStars?: number;
    cyanStars?: number;
    visible: boolean;
    createdAt: string;
    updatedAt: string;
    itemId: string;
    group: string;
};

export type UserShort = {
    id: string;
    ingameName: string;
    avatar?: string;
    reputation: number;
    locale: string;
    platform: Platform | string;
    crossplay: boolean;
    status: Status;
    activity: Activity;
    lastSeen: string;
};

export type OrderWithUser = Order & {
    user: UserShort;
};

export type TxItem = {
    id?: string;
    rank?: number;
    charges?: number;
    subtype?: string;
    amberStars?: number;
    cyanStars?: number;
};

export type Transaction = {
    id: string;
    type: OrderType;
    originId: string;
    platinum: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    item?: TxItem;
    user?: UserShort;
};

export type AchievementState = {
    featured?: boolean;
    hidden?: boolean;
    progress?: number;
    completedAt?: string;
};

export type AchievementI18N = {
    name: string;
    description?: string;
    icon?: string;
    thumb?: string;
};

export type Achievement = {
    id: string;
    slug: string;
    type: string;
    secret?: boolean;
    reputationBonus?: number;
    goal?: number;
    i18n: I18nMap<AchievementI18N>;
    state?: AchievementState;
};

export type LinkedAccounts = Record<string, unknown>;

export type User = {
    id: string;
    ingameName: string;
    avatar?: string;
    background?: string;
    about?: string;
    reputation: number;
    masteryLevel?: number;
    platform: Platform | string;
    crossplay: boolean;
    locale: string;
    achievementShowcase: Array<Achievement>;
    status: Status;
    activity: Activity;
    lastSeen: string;
    banned?: boolean;
    banUntil?: string;
    warned?: boolean;
    warnMessage?: string;
    banMessage?: string;

    slug?: string;
};

export type UserPrivate = {
    id: string;
    role: Role | string;
    ingameName: string;
    avatar?: string;
    background?: string;
    about?: string;
    aboutRaw?: string;
    reputation: number;
    masteryRank: number;
    credits: number;
    platform: Platform | string;
    crossplay: boolean;
    locale: string;
    theme: string;
    achievementShowcase: Array<Achievement>;
    verification: boolean;
    checkCode: string;
    tier: Tier | string;
    subscription: boolean;
    warned?: boolean;
    warnMessage?: string;
    banned?: boolean;
    banUntil?: string;
    banMessage?: string;
    reviewsLeft: number;
    unreadMessages: number;
    ignoreList: Array<string>;
    deleteInProgress?: boolean;
    deleteAt?: string;
    linkedAccounts: LinkedAccounts;
    hasEmail: boolean;
    lastSeen: string;
    createdAt: string;
};

export type DashboardShowcaseI18N = {
    title: string;
    description?: string;
};

export type DashboardShowcaseItem = {
    item: string;
    background: string;
    bigCard: boolean;
};

export type DashboardShowcase = {
    i18n?: I18nMap<DashboardShowcaseI18N>;
    items: Array<DashboardShowcaseItem>;
};
