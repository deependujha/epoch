"use client";

import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

const mockItems = [
    {
        id: 1,
        name: "Haircut",
        category: "Personal Care",
        subcategory: "Groom",
        history: ["Apr 20 • 7:10 PM", "Mar 22 • 6:40 PM", "Feb 18 • 5:30 PM"],
    },
    {
        id: 2,
        name: "Beard Trim",
        category: "Personal Care",
        subcategory: "Groom",
        history: ["Apr 24 • 9:10 PM", "Apr 20 • 9:20 PM"],
    },
    {
        id: 3,
        name: "Gas Cylinder",
        category: "Kitchen",
        subcategory: "Cooking",
        history: ["Apr 1 • 10:30 AM", "Feb 14 • 9:00 AM"],
    },
];

export const LogTab = () => {
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    const fuse = useMemo(
        () =>
            new Fuse(mockItems, {
                keys: ["name", "category", "subcategory"],
                threshold: 0.35,
            }),
        [],
    );

    const results = query ? fuse.search(query).map((r) => r.item) : mockItems;

    const selectedItem = results[selectedIndex];

    const handleLog = (item: any) => {
        console.log("Logged:", item.name);
        setQuery("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!results.length) return;

        if (e.key === "Enter") {
            handleLog(results[selectedIndex]);
        }

        if (e.key === "ArrowDown") {
            setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
        }

        if (e.key === "ArrowUp") {
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
        }
    };

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    return (
        <div className="max-w-xl mx-auto p-5 space-y-6">
            <h2 className="text-2xl font-semibold">Log</h2>

            {/* Search */}
            <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type item name..."
                className="
          w-full
          border border-neutral-200
          rounded-xl
          px-4 py-3
          text-lg
          outline-none
          focus:ring-2 focus:ring-neutral-900
        "
            />

            {/* Search results */}
            <div className="space-y-2">
                {results.map((item, i) => (
                    <div
                        key={item.id}
                        onClick={() => handleLog(item)}
                        className={`
              p-4 rounded-xl border cursor-pointer transition
              ${
                  i === selectedIndex
                      ? "border-black bg-neutral-50"
                      : "border-neutral-200 hover:bg-neutral-50"
              }
            `}
                    >
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-neutral-500">
                            {item.category} • {item.subcategory}
                        </div>
                    </div>
                ))}
            </div>

            {/* Selected item detail */}
            {selectedItem && (
                <div className="border border-neutral-200 rounded-xl p-4 space-y-3">
                    <div>
                        <div className="text-lg font-medium">
                            {selectedItem.name}
                        </div>
                        <div className="text-sm text-neutral-500">
                            {selectedItem.category} • {selectedItem.subcategory}
                        </div>
                    </div>

                    {/* History */}
                    <div>
                        <div className="text-sm font-medium mb-1">
                            Previous logs
                        </div>
                        <div className="text-sm text-neutral-500 space-y-1">
                            {selectedItem.history.map(
                                (h: string, i: number) => (
                                    <div key={i}>{h}</div>
                                ),
                            )}
                        </div>
                    </div>

                    {/* Log button */}
                    <button
                        onClick={() => handleLog(selectedItem)}
                        className="
              w-full
              py-3
              rounded-lg
              bg-black
              text-white
              hover:bg-neutral-800
            "
                    >
                        Log Now
                    </button>
                </div>
            )}
        </div>
    );
};
