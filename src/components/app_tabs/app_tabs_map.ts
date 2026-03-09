import { IconType } from "react-icons";
import {
    FiPlusCircle,
    FiClock,
    FiBarChart2,
    FiSettings,
    FiUser,
} from "react-icons/fi";

import { LogTab } from "./log/log";
import { TimelineTab } from "./timeline/timeline";
import { InsightsTab } from "./insights/insights";
import { SetupTab } from "./setup/setup";
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
    setup: {
        component: SetupTab,
        icon: FiSettings,
        label: "Setup",
    },
    account: {
        component: AccountTab,
        icon: FiUser,
        label: "Account",
    },
};
