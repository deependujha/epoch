import { IconType } from "react-icons";
import {
    FiPlusCircle,
    FiClock,
    FiBarChart2,
    FiShoppingCart,
    FiUser,
} from "react-icons/fi";

import { LogTab } from "./log/log";
import { TimelineTab } from "./timeline/timeline";
import { InsightsTab } from "./insights/insights";
import { ItemsTab } from "./items/items";
import { AccountTab } from "@/components/app_tabs/account/account";

type AppTabConfig = {
    component: React.FC;
    icon: IconType;
    label: string;
};

export const AppTabMap: Record<string, AppTabConfig> = {
    log: {
        component: LogTab,
        icon: FiPlusCircle,
        label: "Log",
    },
    timeline: {
        component: TimelineTab,
        icon: FiClock,
        label: "Timeline",
    },
    insights: {
        component: InsightsTab,
        icon: FiBarChart2,
        label: "Insights",
    },
    items: {
        component: ItemsTab,
        icon: FiShoppingCart,
        label: "Items",
    },
    account: {
        component: AccountTab,
        icon: FiUser,
        label: "Account",
    },
};
