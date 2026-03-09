"use client";

import { FiPlus } from "react-icons/fi";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const mockData = [
    {
        category: "Personal Care",
        groups: [
            {
                subcategory: "Groom",
                items: [
                    { name: "Haircut", last: "28 days ago" },
                    { name: "Beard Trim", last: "4 days ago" },
                ],
            },
            {
                subcategory: "Skin Care",
                items: [
                    { name: "Cleanser", last: "Yesterday" },
                    { name: "Sunscreen", last: "2 days ago" },
                    { name: "Sunscreen", last: "2 days ago" },
                    { name: "Sunscreen", last: "2 days ago" },
                    { name: "Sunscreen", last: "2 days ago" },
                    { name: "Sunscreen", last: "2 days ago" },
                    { name: "Sunscreen", last: "2 days ago" },
                    { name: "Sunscreen", last: "2 days ago" },
                    { name: "Sunscreen", last: "2 days ago" },
                    { name: "Sunscreen", last: "2 days ago" },
                    { name: "Sunscreen", last: "2 days ago" },
                    { name: "Sunscreen", last: "2 days ago" },
                    { name: "Sunscreen", last: "2 days ago" },
                    { name: "Sunscreen", last: "2 days ago" },
                ],
            },
        ],
    },
    {
        category: "Kitchen",
        groups: [
            {
                subcategory: "Cooking",
                items: [{ name: "Gas Cylinder", last: "41 days ago" }],
            },
        ],
    },
];

export const ItemsTab = () => {
    return (
        <div className="relative h-full max-w-xl mx-auto flex flex-col">
            {/* Header */}
            <div className="p-5 pb-2">
                <h2 className="text-2xl font-semibold">Items</h2>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-8">
                {mockData.map((cat) => (
                    <div key={cat.category}>
                        {/* Category */}
                        <div className="text-lg font-semibold mb-3 text-neutral-900">
                            {cat.category}
                        </div>

                        <div className="space-y-5">
                            {cat.groups.map((group) => (
                                <div key={group.subcategory}>
                                    {/* Subcategory */}
                                    <div className="text-sm font-medium text-neutral-500 mb-2">
                                        {group.subcategory}
                                    </div>

                                    {/* Items */}
                                    <div className="space-y-2">
                                        {group.items.map((item, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition cursor-pointer"
                                            >
                                                <div>
                                                    <div className="font-medium text-neutral-900">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-xs text-neutral-500">
                                                        Last: {item.last}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Category divider */}
                        <div className="mt-6 border-b border-neutral-200" />
                    </div>
                ))}
            </div>

            {/* Floating add button */}
            <button
                className="
        fixed bottom-24 right-6
        h-14 w-14
        rounded-full
        bg-black
        text-white
        flex items-center justify-center
        shadow-lg
        hover:bg-neutral-800
        transition
      "
            >
                <FiPlus size={22} />
            </button>
            <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};
