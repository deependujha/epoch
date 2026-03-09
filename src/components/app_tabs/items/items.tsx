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
import { useItems } from "@/context/items-context";
import { toast } from "sonner";

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
    { label: "6 months", value: 180 },
];

export const ItemsTab = () => {
    const { tree, loading, refresh } = useItems();

    const [open, setOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");

    const [isNewCategory, setIsNewCategory] = useState(false);
    const [isNewSubcategory, setIsNewSubcategory] = useState(false);

    const [newCategoryName, setNewCategoryName] = useState("");
    const [newSubcategoryName, setNewSubcategoryName] = useState("");

    const [reminderInterval, setReminderInterval] = useState("");

    const categories = tree;

    const currentSubcategories = selectedCategory
        ? categories.find((cat) => cat.id === selectedCategory)
              ?.subcategories || []
        : [];

    const resetForm = () => {
        setName("");
        setSelectedCategory("");
        setSelectedSubcategory("");
        setIsNewCategory(false);
        setIsNewSubcategory(false);
        setNewCategoryName("");
        setNewSubcategoryName("");
        setReminderInterval("");
    };

    const handleCreate = async () => {
        setIsSaving(true);
        try {
            const payload = {
                itemName: name,
                categoryId: isNewCategory ? undefined : selectedCategory,
                categoryName: isNewCategory ? newCategoryName : undefined,
                subcategoryId: isNewSubcategory
                    ? undefined
                    : selectedSubcategory,
                subcategoryName: isNewSubcategory
                    ? newSubcategoryName
                    : undefined,
                reminderInterval: reminderInterval
                    ? parseInt(reminderInterval)
                    : null,
            };

            const res = await fetch("/api/items/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const text = await res.text();
                toast.error("Failed to create item. Please try again.");
                console.error("Failed to create item:", text);
                setIsSaving(false);
                return;
            }

            const item = await res.json();

            toast.success("Item created successfully!");
            console.log("Item created successfully:", item);

            await refresh();

            resetForm();
            setOpen(false);
        } catch (err) {
            console.error("Error creating item:", err);
            toast.error("Failed to create item. Please try again.");
        }
        setIsSaving(false);
    };

    if (loading) {
        return (
            <div className="text-neutral-500 h-full w-full text-center flex items-center justify-center">
                Loading items...
            </div>
        );
    }

    return (
        <div className="relative h-full max-w-xl mx-auto flex flex-col">
            <div className="p-5 pb-2">
                <h2 className="text-2xl font-semibold">Items</h2>
            </div>

            {tree.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-neutral-500">
                    <div>
                        <p className="text-lg font-medium">No items yet</p>
                        <p className="text-sm mt-1">
                            Add your first item to start tracking events.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-8">
                    {tree.map((cat) => (
                        <div key={cat.id}>
                            <div className="text-lg font-semibold mb-3 text-neutral-900">
                                {cat.name}
                            </div>

                            <div className="space-y-5">
                                {cat.subcategories.map((subcat) => (
                                    <div key={subcat.id}>
                                        <div className="text-sm font-medium text-neutral-500 mb-2">
                                            {subcat.name}
                                        </div>

                                        <div className="space-y-2">
                                            {subcat.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition"
                                                >
                                                    <div className="font-medium text-neutral-900">
                                                        {item.name}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 border-b border-neutral-200" />
                        </div>
                    ))}
                </div>
            )}

            <Dialog open={open} onOpenChange={setOpen}>
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
                                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
                            >
                                <option value="">Select a category</option>

                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}

                                <option value="new">+ New Category</option>
                            </select>
                        </div>

                        {isNewCategory && (
                            <input
                                value={newCategoryName}
                                onChange={(e) =>
                                    setNewCategoryName(e.target.value)
                                }
                                placeholder="Enter new category name"
                                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
                            />
                        )}

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
                                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900 disabled:opacity-50"
                            >
                                <option value="">
                                    {isNewCategory || selectedCategory
                                        ? "Select a subcategory"
                                        : "Select category first"}
                                </option>

                                {currentSubcategories.map((subcat) => (
                                    <option key={subcat.id} value={subcat.id}>
                                        {subcat.name}
                                    </option>
                                ))}

                                {(isNewCategory || selectedCategory) && (
                                    <option value="new">
                                        + New Subcategory
                                    </option>
                                )}
                            </select>
                        </div>

                        {isNewSubcategory && (
                            <input
                                value={newSubcategoryName}
                                onChange={(e) =>
                                    setNewSubcategoryName(e.target.value)
                                }
                                placeholder="Enter new subcategory name"
                                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
                            />
                        )}

                        <div>
                            <label className="text-sm font-medium text-neutral-700 mb-1 block">
                                Remind me after
                            </label>

                            <select
                                value={reminderInterval}
                                onChange={(e) =>
                                    setReminderInterval(e.target.value)
                                }
                                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
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

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Item name (e.g. Haircut)"
                            className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
                        />
                    </div>

                    <DialogFooter className="mt-4">
                        <button
                            onClick={isSaving ? undefined : handleCreate}
                            className="w-full bg-black text-white rounded-lg py-2 hover:bg-neutral-800"
                        >
                            {isSaving ? (
                                <div className="flex justify-center">
                                    <div className="loader"></div>
                                </div>
                            ) : (
                                "Save Item"
                            )}
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
