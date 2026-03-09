import { db } from "@/backend/db";
import { categories, subcategories, items } from "@/backend/db/schema";
import { eq } from "drizzle-orm";

type CreateCategoryParams = {
    userId: string;
    name: string;
};

type CreateSubcategoryParams = {
    userId: string;
    categoryId: string;
    name: string;
};

type CreateItemParams = {
    userId: string;
    name: string;
    categoryId: string;
    subcategoryId?: string | null;
    reminderInterval?: number | null;
};

type CreateItemWithHierarchyParams = {
    userId: string;

    itemName: string;

    categoryId?: string;
    categoryName?: string;

    subcategoryId?: string;
    subcategoryName?: string;

    reminderInterval?: number | null;
};

export class ItemLogic {
    /** Create category */
    static async createCategory(params: CreateCategoryParams) {
        const [category] = await db
            .insert(categories)
            .values({
                userId: params.userId,
                name: params.name,
            })
            .returning();

        return category;
    }

    /** Create subcategory */
    static async createSubcategory(params: CreateSubcategoryParams) {
        const [subcategory] = await db
            .insert(subcategories)
            .values({
                userId: params.userId,
                categoryId: params.categoryId,
                name: params.name,
            })
            .returning();

        return subcategory;
    }

    /** Create item */
    static async createItem(params: CreateItemParams) {
        const [item] = await db
            .insert(items)
            .values({
                userId: params.userId,
                name: params.name,
                categoryId: params.categoryId,
                subcategoryId: params.subcategoryId ?? null,
                reminderInterval: params.reminderInterval ?? null,
            })
            .returning();

        return item;
    }

    /**
     * High-level method used by the UI
     * Handles new category / subcategory creation automatically
     */
    static async createItemWithHierarchy(
        params: CreateItemWithHierarchyParams,
    ) {
        let categoryId = params.categoryId;
        let subcategoryId = params.subcategoryId;

        /** Create category if needed */
        if (!categoryId && params.categoryName) {
            const category = await this.createCategory({
                userId: params.userId,
                name: params.categoryName,
            });

            categoryId = category.id;
        }

        if (!categoryId) {
            throw new Error("Category is required");
        }

        /** Create subcategory if needed */
        if (!subcategoryId && params.subcategoryName) {
            const subcategory = await this.createSubcategory({
                userId: params.userId,
                categoryId,
                name: params.subcategoryName,
            });

            subcategoryId = subcategory.id;
        }

        /** Create item */
        return this.createItem({
            userId: params.userId,
            name: params.itemName,
            categoryId,
            subcategoryId,
            reminderInterval: params.reminderInterval,
        });
    }

    /** Fetch all items for search (Fuse.js) */
    static async getItemsForUser(userId: string) {
        return db.select().from(items).where(eq(items.userId, userId));
    }

    static async getItemTree(userId: string) {
        const rows = await db
            .select({
                categoryId: categories.id,
                categoryName: categories.name,

                subcategoryId: subcategories.id,
                subcategoryName: subcategories.name,

                itemId: items.id,
                itemName: items.name,
                reminderInterval: items.reminderInterval,
            })
            .from(items)
            .leftJoin(categories, eq(items.categoryId, categories.id))
            .leftJoin(subcategories, eq(items.subcategoryId, subcategories.id))
            .where(eq(items.userId, userId));

        const categoryMap = new Map();

        for (const row of rows) {
            let category = categoryMap.get(row.categoryId);

            if (!category) {
                category = {
                    id: row.categoryId,
                    name: row.categoryName,
                    subcategories: [],
                };

                categoryMap.set(row.categoryId, category);
            }

            let subcategory = category.subcategories.find(
                (s: any) => s.id === row.subcategoryId,
            );

            if (!subcategory) {
                subcategory = {
                    id: row.subcategoryId,
                    name: row.subcategoryName,
                    items: [],
                };

                category.subcategories.push(subcategory);
            }

            subcategory.items.push({
                id: row.itemId,
                name: row.itemName,
                reminderInterval: row.reminderInterval,
            });
        }

        return Array.from(categoryMap.values());
    }
}
