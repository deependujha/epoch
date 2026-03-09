"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

// Mock categories and subcategories
const mockCategories = [
    {
        id: "personal",
        name: "Personal Care",
        subcategories: ["Grooming", "Skincare", "Health"],
    },
    {
        id: "kitchen",
        name: "Kitchen",
        subcategories: ["Appliances", "Cooking", "Utensils"],
    },
    {
        id: "home",
        name: "Home",
        subcategories: ["Furniture", "Decor", "Maintenance"],
    },
];

// Reminder interval options
const reminderOptions = [
    { label: "1 day", value: 1 },
    { label: "3 days", value: 3 },
    { label: "1 week", value: 7 },
    { label: "2 weeks", value: 14 },
    { label: "3 weeks", value: 21 },
    { label: "1 month", value: 30 },
    { label: "6 weeks", value: 42 },
    { label: "2 months", value: 60 },
    { label: "3 months", value: 90 },
];

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
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [isNewSubcategory, setIsNewSubcategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newSubcategoryName, setNewSubcategoryName] = useState("");
    const [reminderInterval, setReminderInterval] = useState("");

    const currentSubcategories = selectedCategory
        ? mockCategories.find((cat) => cat.id === selectedCategory)
              ?.subcategories || []
        : [];

    const handleCreate = () => {
        console.log({
            name,
            category: isNewCategory ? newCategoryName : selectedCategory,
            subcategory: isNewSubcategory
                ? newSubcategoryName
                : selectedSubcategory,
            reminderInterval: reminderInterval
                ? `Every ${reminderOptions.find((opt) => opt.value === parseInt(reminderInterval))?.label}`
                : "No reminder",
        });
        // Reset form
        setName("");
        setSelectedCategory("");
        setSelectedSubcategory("");
        setIsNewCategory(false);
        setIsNewSubcategory(false);
        setNewCategoryName("");
        setNewSubcategoryName("");
        setReminderInterval("");
    };

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
            {/* modal */}
            <Dialog>
                <DialogTrigger asChild>
                    <button
                        className="
            fixed bottom-24 right-6
            h-14 w-14
            rounded-full
            bg-black text-white
            flex items-center justify-center
            shadow-lg hover:bg-neutral-800 transition
          "
                    >
                        <FiPlus size={22} />
                    </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add Item</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 mt-2">
                        {/* Category Dropdown */}
                        <div>
                            <label className="text-sm font-medium text-neutral-700 mb-1 block">
                                Category
                            </label>
                            <select
                                value={isNewCategory ? "new" : selectedCategory}
                                onChange={(e) => {
                                    if (e.target.value === "new") {
                                        setIsNewCategory(true);
                                        setSelectedCategory("");
                                    } else {
                                        setIsNewCategory(false);
                                        setSelectedCategory(e.target.value);
                                        setSelectedSubcategory("");
                                    }
                                }}
                                className="
                w-full
                border border-neutral-200
                rounded-lg
                px-3 py-2
                text-sm
                outline-none
                focus:ring-2 focus:ring-neutral-900
              "
                            >
                                <option value="">Select a category</option>
                                {mockCategories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                                <option value="new">+ New Category</option>
                            </select>
                        </div>

                        {/* New Category Input */}
                        {isNewCategory && (
                            <input
                                value={newCategoryName}
                                onChange={(e) =>
                                    setNewCategoryName(e.target.value)
                                }
                                placeholder="Enter new category name"
                                className="
                w-full
                border border-neutral-200
                rounded-lg
                px-3 py-2
                text-sm
                outline-none
                focus:ring-2 focus:ring-neutral-900
              "
                            />
                        )}

                        {/* Subcategory Dropdown */}
                        <div>
                            <label className="text-sm font-medium text-neutral-700 mb-1 block">
                                Subcategory
                            </label>
                            <select
                                value={
                                    isNewSubcategory
                                        ? "new"
                                        : selectedSubcategory
                                }
                                onChange={(e) => {
                                    if (e.target.value === "new") {
                                        setIsNewSubcategory(true);
                                        setSelectedSubcategory("");
                                    } else {
                                        setIsNewSubcategory(false);
                                        setSelectedSubcategory(e.target.value);
                                    }
                                }}
                                disabled={!selectedCategory && !isNewCategory}
                                className="
                w-full
                border border-neutral-200
                rounded-lg
                px-3 py-2
                text-sm
                outline-none
                focus:ring-2 focus:ring-neutral-900
                disabled:opacity-50 disabled:cursor-not-allowed
              "
                            >
                                <option value="">
                                    {isNewCategory || selectedCategory
                                        ? "Select a subcategory"
                                        : "Select category first"}
                                </option>
                                {currentSubcategories.map((subcat) => (
                                    <option key={subcat} value={subcat}>
                                        {subcat}
                                    </option>
                                ))}
                                {(isNewCategory || selectedCategory) && (
                                    <option value="new">
                                        + New Subcategory
                                    </option>
                                )}
                            </select>
                        </div>

                        {/* New Subcategory Input */}
                        {isNewSubcategory && (
                            <input
                                value={newSubcategoryName}
                                onChange={(e) =>
                                    setNewSubcategoryName(e.target.value)
                                }
                                placeholder="Enter new subcategory name"
                                className="
                w-full
                border border-neutral-200
                rounded-lg
                px-3 py-2
                text-sm
                outline-none
                focus:ring-2 focus:ring-neutral-900
              "
                            />
                        )}

                        {/* Reminder Interval Dropdown */}
                        <div>
                            <label className="text-sm font-medium text-neutral-700 mb-1 block">
                                Remind me after
                            </label>
                            <select
                                value={reminderInterval}
                                onChange={(e) =>
                                    setReminderInterval(e.target.value)
                                }
                                className="
                w-full
                border border-neutral-200
                rounded-lg
                px-3 py-2
                text-sm
                outline-none
                focus:ring-2 focus:ring-neutral-900
              "
                            >
                                <option value="">No reminder</option>
                                {reminderOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Item Name Input */}
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Item name (e.g. Haircut)"
                            className="
                w-full
                border border-neutral-200
                rounded-lg
                px-3 py-2
                text-sm
                outline-none
                focus:ring-2 focus:ring-neutral-900
              "
                        />
                    </div>

                    <DialogFooter className="mt-4">
                        <button
                            onClick={handleCreate}
                            className="
                w-full
                bg-black text-white
                rounded-lg
                py-2
                hover:bg-neutral-800
              "
                        >
                            Save Item
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
