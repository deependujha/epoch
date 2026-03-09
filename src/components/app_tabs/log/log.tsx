"use client";

import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { useItems } from "@/context/items-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FlatItem = {
    id: string;
    name: string;
    category: string;
    subcategory?: string;
};

export const LogTab = () => {
    const router = useRouter();
    const { tree } = useItems();

    const [query, setQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState<FlatItem | null>(null);

    const [history, setHistory] = useState<string[]>([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    /** Flatten tree for Fuse search */
    const items: FlatItem[] = useMemo(() => {
        return tree.flatMap((cat) =>
            cat.subcategories.flatMap((sub) =>
                sub.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    category: cat.name,
                    subcategory: sub.name,
                })),
            ),
        );
    }, [tree]);

    /** Fuse instance */
    const fuse = useMemo(
        () =>
            new Fuse(items, {
                keys: ["name", "category", "subcategory"],
                threshold: 0.35,
            }),
        [items],
    );

    /** Search results */
    const results = useMemo(() => {
        if (!query.trim()) return [];
        return fuse.search(query).map((r) => r.item);
    }, [query, fuse]);

    /** Load history when item selected */
    useEffect(() => {
        if (!selectedItem) return;

        const loadHistory = async () => {
            setHistory([]);
            setHistoryLoading(true);

            try {
                const res = await fetch(
                    `/api/events/history?itemId=${selectedItem.id}`,
                );

                if (!res.ok) {
                    const text = await res.text();
                    console.error("Failed to load history:", text);
                    toast.error("Failed to load history");
                    return;
                }

                const data = await res.json();
                setHistory(data);
            } catch (err) {
                console.error("History fetch error:", err);
                toast.error("Failed to load history");
            } finally {
                setHistoryLoading(false);
            }
        };

        loadHistory();
    }, [selectedItem]);

    /** Log event */
    const handleLog = async () => {
        if (!selectedItem) return;

        try {
            const res = await fetch("/api/events/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    itemId: selectedItem.id,
                }),
            });

            if (!res.ok) {
                toast.error("Failed to log event");
                console.error("Failed to log event");
                return;
            }

            console.log("Logged:", selectedItem.name);

            toast.success("Event logged successfully!");

            setQuery("");
            setSelectedItem(null);
            setHistory([]);

            router.refresh();
        } catch (err) {
            console.error("Log error:", err);
            toast.error("Failed to log event");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-5 space-y-6">
            <h2 className="text-2xl font-semibold">Log</h2>

            {/* Search */}
            <input
                autoFocus
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedItem(null);
                    setHistory([]);
                }}
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

            {/* Suggestions */}
            {query && !selectedItem && (
                <div className="space-y-2">
                    {results.length === 0 && (
                        <div className="text-sm text-neutral-500">
                            No matching items
                        </div>
                    )}

                    {results.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="
                            p-4
                            rounded-xl
                            border
                            border-neutral-200
                            cursor-pointer
                            hover:bg-neutral-50
                            transition
                            "
                        >
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-neutral-500">
                                {item.category} • {item.subcategory}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Selected Item Card */}
            {selectedItem && (
                <div className="border border-neutral-200 rounded-xl p-4 space-y-4">
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

                        {historyLoading ? (
                            <div className="flex items-center gap-2 text-sm text-neutral-500">
                                <div className="h-4 w-4 border-2 border-neutral-300 border-t-black rounded-full animate-spin" />
                                Loading history...
                            </div>
                        ) : history.length === 0 ? (
                            <div className="text-sm text-neutral-400">
                                No logs yet
                            </div>
                        ) : (
                            <div className="text-sm text-neutral-500 space-y-1">
                                {history.map((h, i) => (
                                    <div key={i}>{h}</div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleLog}
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
