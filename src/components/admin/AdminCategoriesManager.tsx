"use client";

import type { Category } from "@/types";
import { useMemo, useState } from "react";

interface AdminCategoriesManagerProps {
  initialCategories: Category[];
}

export function AdminCategoriesManager({ initialCategories }: AdminCategoriesManagerProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = useMemo(
    () => [...categories].sort((a, b) => a.name.localeCompare(b.name)),
    [categories]
  );

  async function handleCreateCategory() {
    const name = newCategoryName.trim();
    if (!name) return;

    setIsSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Failed to create category.");
      }

      setCategories((prev) => [...prev, data as Category]);
      setNewCategoryName("");
      setMessage("Category created.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to create category.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdateCategory(categoryId: number) {
    const name = editingCategoryName.trim();
    if (!name) return;

    setIsSubmitting(true);
    setMessage("");
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Failed to update category.");
      }

      const updated = data as Category;
      setCategories((prev) => prev.map((category) => (category.id === updated.id ? updated : category)));
      setEditingCategoryId(null);
      setEditingCategoryName("");
      setMessage("Category updated.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to update category.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteCategory(category: Category) {
    setIsSubmitting(true);
    setMessage("");
    try {
      const response = await fetch(`/api/categories/${category.id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Failed to delete category.");
      }

      setCategories((prev) => prev.filter((item) => item.id !== category.id));
      setMessage("Category deleted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to delete category.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <span className="eyebrow">Admin</span>
        <h1 className="section-title">Categories</h1>
      </div>

      {message ? (
        <p className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/85">{message}</p>
      ) : null}

      <div className="glass-card space-y-4 p-6">
        <h2 className="font-fredoka text-2xl">Manage Categories</h2>
        <div className="flex gap-2">
          <input
            value={newCategoryName}
            onChange={(event) => setNewCategoryName(event.target.value)}
            placeholder="Add category name"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none transition focus:border-white/30"
          />
          <button type="button" className="ghost-button !px-4 !py-2 text-sm" onClick={handleCreateCategory} disabled={isSubmitting}>
            Add
          </button>
        </div>

        <div className="admin-tech-scrollbar max-h-[62vh] space-y-2 overflow-y-auto pr-1">
          {categoryOptions.map((category) => (
            <div key={category.id} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
              {editingCategoryId === category.id ? (
                <>
                  <input
                    value={editingCategoryName}
                    onChange={(event) => setEditingCategoryName(event.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-sm text-white outline-none transition focus:border-white/30"
                  />
                  <button type="button" className="ghost-button !px-3 !py-1 text-xs" onClick={() => handleUpdateCategory(category.id)}>
                    Save
                  </button>
                  <button
                    type="button"
                    className="ghost-button !px-3 !py-1 text-xs"
                    onClick={() => {
                      setEditingCategoryId(null);
                      setEditingCategoryName("");
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p className="flex-1 text-sm text-white">{category.name}</p>
                  <button
                    type="button"
                    className="ghost-button !px-3 !py-1 text-xs"
                    onClick={() => {
                      setEditingCategoryId(category.id);
                      setEditingCategoryName(category.name);
                    }}
                  >
                    Edit
                  </button>
                  <button type="button" className="ghost-button !px-3 !py-1 text-xs" onClick={() => handleDeleteCategory(category)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
          {categoryOptions.length === 0 ? <p className="px-1 text-xs text-white/50">No categories yet.</p> : null}
        </div>
      </div>
    </section>
  );
}
