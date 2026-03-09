"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

type Item = {
    id: string;
    name: string;
    reminderInterval?: number | null;
};

type Subcategory = {
    id: string;
    name: string;
    items: Item[];
};

type Category = {
    id: string;
    name: string;
    subcategories: Subcategory[];
};

type ItemsContextType = {
    tree: Category[];
    loading: boolean;
    refresh: () => Promise<void>;
};

const ItemsContext = createContext<ItemsContextType | null>(null);

export function ItemsProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const [tree, setTree] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        if (!session?.user?.id) return;

        try {
            const res = await fetch("/api/items/tree");

            if (!res.ok) {
                console.error("Failed to fetch items:", res.status);
                return;
            }

            const data = await res.json();
            setTree(data);
        } catch (err) {
            console.error("ItemsProvider load error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            load();
        }
    }, [status]);

    return (
        <ItemsContext.Provider
            value={{
                tree,
                loading,
                refresh: load,
            }}
        >
            {children}
        </ItemsContext.Provider>
    );
}

export function useItems() {
    const ctx = useContext(ItemsContext);

    if (!ctx) {
        throw new Error("useItems must be used inside ItemsProvider");
    }

    return ctx;
}
