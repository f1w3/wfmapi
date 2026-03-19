import type { DashboardShowcase } from "../../type";
import { endpoint } from "../../wfm";

/**
 * GET \
 * https://api.warframe.market/v2/dashboard/showcase
 * @description Mobile app main screen dashboard with featured items.
 */
export const $_dashboard_showcase = endpoint("v2/dashboard/showcase").response<Array<DashboardShowcase>>();
