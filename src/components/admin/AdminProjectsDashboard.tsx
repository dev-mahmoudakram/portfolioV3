"use client";

import type { Category, Project, Skill } from "@/types";
import { FormEvent, useMemo, useState } from "react";

type ProjectFormState = {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  categories: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
};

const emptyForm: ProjectFormState = {
  title: "",
  description: "",
  longDescription: "",
  image: "",
  techStack: [],
  categories: [],
  liveUrl: "",
  githubUrl: "",
  featured: false
};

function toFormState(project: Project): ProjectFormState {
  return {
    title: project.title,
    description: project.description,
    longDescription: project.longDescription || "",
    image: project.image || "",
    techStack: project.techStack,
    categories: project.categories?.length ? project.categories : project.category ? [project.category] : [],
    liveUrl: project.liveUrl || "",
    githubUrl: project.githubUrl || "",
    featured: project.featured
  };
}

function TextField({
  value,
  onChange,
  placeholder
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
    />
  );
}

function TextAreaField({
  value,
  onChange,
  placeholder
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="min-h-[92px] w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
    />
  );
}

function MultiSelectDropdown({
  title,
  searchPlaceholder,
  options,
  value,
  onChange
}: {
  title: string;
  searchPlaceholder: string;
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => options.filter((option) => option.toLowerCase().includes(query.trim().toLowerCase())),
    [options, query]
  );

  function toggleValue(item: string) {
    if (value.includes(item)) {
      onChange(value.filter((current) => current !== item));
      return;
    }
    onChange([...value, item]);
  }

  return (
    <details className="rounded-2xl border border-white/10 bg-black/30 p-3">
      <summary className="cursor-pointer list-none text-sm font-semibold text-white">
        {title} ({value.length} selected)
      </summary>
      <div className="mt-3 space-y-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none transition focus:border-white/30"
        />
        <div className="admin-tech-scrollbar max-h-48 space-y-2 overflow-y-auto pr-1">
          {filtered.map((option) => (
            <label key={option} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm">
              <input type="checkbox" checked={value.includes(option)} onChange={() => toggleValue(option)} />
              <span>{option}</span>
            </label>
          ))}
          {filtered.length === 0 ? <p className="px-1 text-xs text-white/50">No items found.</p> : null}
        </div>
        {value.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {value.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => toggleValue(item)}
                className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-white/85"
              >
                {item} x
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </details>
  );
}

function StarIcon({ featured }: { featured: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill={featured ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
      <path d="m12 3.3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17.3 6.6 20l1-6.1-4.4-4.3 6.1-.9L12 3.3Z" />
    </svg>
  );
}

interface AdminProjectsDashboardProps {
  initialProjects: Project[];
  initialSkills: Skill[];
  initialCategories: Category[];
}

export function AdminProjectsDashboard({ initialProjects, initialSkills, initialCategories }: AdminProjectsDashboardProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [createForm, setCreateForm] = useState<ProjectFormState>(emptyForm);
  const [editProjectId, setEditProjectId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<ProjectFormState>(emptyForm);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingDeleteProject, setPendingDeleteProject] = useState<Project | null>(null);
  const [draggedProjectId, setDraggedProjectId] = useState<number | null>(null);

  const featuredCount = useMemo(() => projects.filter((project) => project.featured).length, [projects]);
  const orderedProjects = useMemo(
    () => [...projects].sort((a, b) => a.sortOrder - b.sortOrder),
    [projects]
  );
  const techStackOptions = useMemo(
    () =>
      Array.from(
        new Set(["PHP", ...initialSkills.map((skill) => skill.name.trim()).filter(Boolean)])
      ).sort((a, b) => a.localeCompare(b)),
    [initialSkills]
  );
  const categoryOptions = useMemo(
    () => initialCategories.map((category) => category.name).sort((a, b) => a.localeCompare(b)),
    [initialCategories]
  );

  function onCreateChange<K extends keyof ProjectFormState>(key: K, value: ProjectFormState[K]) {
    setCreateForm((prev) => ({ ...prev, [key]: value }));
  }

  function onEditChange<K extends keyof ProjectFormState>(key: K, value: ProjectFormState[K]) {
    setEditForm((prev) => ({ ...prev, [key]: value }));
  }

  function reorderProjectList(list: Project[], sourceId: number, targetId: number) {
    if (sourceId === targetId) {
      return list;
    }

    const sourceIndex = list.findIndex((project) => project.id === sourceId);
    const targetIndex = list.findIndex((project) => project.id === targetId);
    if (sourceIndex < 0 || targetIndex < 0) {
      return list;
    }

    const next = [...list];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);
    return next.map((project, index) => ({ ...project, sortOrder: index }));
  }

  async function persistProjectOrder(nextProjects: Project[]) {
    try {
      const response = await fetch("/api/projects/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectIds: nextProjects.map((project) => project.id) })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Failed to save order.");
      }
      setProjects(data as Project[]);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save order.");
    }
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Failed to create project.");
      }

      setProjects((prev) => [data as Project, ...prev]);
      setCreateForm(emptyForm);
      setMessage("Project created.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to create project.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdate(project: Project, e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(`/api/projects/${project.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Failed to update project.");
      }

      const updated = data as Project;
      setProjects((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setEditProjectId(null);
      setMessage("Project updated.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to update project.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(project: Project) {
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(`/api/projects/${project.slug}`, { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to delete project.");
      }

      setProjects((prev) => prev.filter((item) => item.id !== project.id));
      setMessage("Project deleted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to delete project.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function toggleProjectFeatured(project: Project) {
    const nextFeatured = !project.featured;
    if (nextFeatured && featuredCount >= 4) {
      setMessage("You can only feature 4 projects.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");
    try {
      const payload = {
        title: project.title,
        description: project.description,
        longDescription: project.longDescription || "",
        image: project.image || "",
        techStack: project.techStack,
        categories: project.categories?.length ? project.categories : project.category ? [project.category] : [],
        liveUrl: project.liveUrl || "",
        githubUrl: project.githubUrl || "",
        featured: nextFeatured
      };

      const response = await fetch(`/api/projects/${project.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Failed to update featured state.");
      }

      const updated = data as Project;
      setProjects((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setMessage(updated.featured ? "Project set as featured." : "Project removed from featured.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to update featured state.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6">
      <div>
        <span className="eyebrow">Admin</span>
        <h1 className="section-title">Projects Dashboard</h1>
      </div>

      {message ? (
        <p className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/85">{message}</p>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-12">
        <article id="create-project" className="glass-card space-y-4 p-6 xl:col-span-5">
          <h2 className="font-fredoka text-2xl">Create Project</h2>
          <form className="space-y-3" onSubmit={handleCreate}>
            <TextField value={createForm.title} onChange={(value) => onCreateChange("title", value)} placeholder="Title" />
            <TextAreaField value={createForm.description} onChange={(value) => onCreateChange("description", value)} placeholder="Short description" />
            <TextAreaField value={createForm.longDescription} onChange={(value) => onCreateChange("longDescription", value)} placeholder="Long description (optional)" />
            <TextField value={createForm.image} onChange={(value) => onCreateChange("image", value)} placeholder="Image URL" />

            <MultiSelectDropdown
              title="Tech Stack"
              searchPlaceholder="Search skill..."
              options={techStackOptions}
              value={createForm.techStack}
              onChange={(next) => onCreateChange("techStack", next)}
            />
            <MultiSelectDropdown
              title="Categories"
              searchPlaceholder="Search category..."
              options={categoryOptions}
              value={createForm.categories}
              onChange={(next) => onCreateChange("categories", next)}
            />

            <TextField value={createForm.liveUrl} onChange={(value) => onCreateChange("liveUrl", value)} placeholder="Live URL (optional)" />
            <TextField value={createForm.githubUrl} onChange={(value) => onCreateChange("githubUrl", value)} placeholder="GitHub URL (optional)" />
            <label className="flex items-center gap-2 text-sm text-white/80">
              <input type="checkbox" checked={createForm.featured} onChange={(event) => onCreateChange("featured", event.target.checked)} />
              Mark as featured
            </label>
            <button disabled={isSubmitting} className="neon-button w-full !justify-center disabled:opacity-60">
              Add Project
            </button>
          </form>
        </article>

        <article id="manage-projects" className="glass-card space-y-3 p-4 xl:col-span-7">
          <div className="flex items-center justify-between">
            <h2 className="font-fredoka text-2xl">Manage Projects</h2>
            <p className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">{featuredCount}/4 Featured</p>
          </div>
          {orderedProjects.map((project) => {
            const editing = editProjectId === project.id;
            return (
              <div
                key={project.id}
                className={`rounded-2xl border bg-black/25 p-4 transition ${
                  draggedProjectId === project.id ? "border-soft/80" : "border-white/10"
                }`}
                draggable={!editing}
                onDragStart={() => setDraggedProjectId(project.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={async (event) => {
                  event.preventDefault();
                  if (draggedProjectId === null || draggedProjectId === project.id) {
                    return;
                  }

                  const nextProjects = reorderProjectList(orderedProjects, draggedProjectId, project.id);
                  setProjects(nextProjects);
                  setDraggedProjectId(null);
                  await persistProjectOrder(nextProjects);
                }}
                onDragEnd={() => setDraggedProjectId(null)}
              >
                {!editing ? (
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex cursor-grab select-none items-center rounded-full border border-white/15 px-2 py-0.5 text-[11px] uppercase tracking-[0.08em] text-white/55">
                          Drag
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleProjectFeatured(project)}
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-full border transition ${
                            project.featured
                              ? "border-primary/60 bg-primary/20 text-primary shadow-[0_0_10px_rgba(113,72,212,0.45)]"
                              : "border-soft/45 bg-soft/10 text-soft hover:border-soft/70"
                          }`}
                          aria-label={project.featured ? "Unset featured" : "Set featured"}
                          title={project.featured ? "Featured project" : "Mark as featured"}
                          disabled={isSubmitting}
                        >
                          <StarIcon featured={project.featured} />
                        </button>
                        <p className="font-fredoka text-xl">{project.title}</p>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {project.categories.map((category) => (
                          <span
                            key={`${project.id}-${category}`}
                            className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[11px] uppercase tracking-[0.08em] text-white/70"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="ghost-button !px-4 !py-2 text-xs"
                        onClick={() => {
                          setEditProjectId(project.id);
                          setEditForm(toFormState(project));
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="ghost-button !px-4 !py-2 text-xs"
                        onClick={() => setPendingDeleteProject(project)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-3" onSubmit={(event) => handleUpdate(project, event)}>
                    <TextField value={editForm.title} onChange={(value) => onEditChange("title", value)} placeholder="Title" />
                    <TextAreaField value={editForm.description} onChange={(value) => onEditChange("description", value)} placeholder="Short description" />
                    <TextAreaField value={editForm.longDescription} onChange={(value) => onEditChange("longDescription", value)} placeholder="Long description (optional)" />
                    <TextField value={editForm.image} onChange={(value) => onEditChange("image", value)} placeholder="Image URL" />
                    <MultiSelectDropdown
                      title="Tech Stack"
                      searchPlaceholder="Search skill..."
                      options={techStackOptions}
                      value={editForm.techStack}
                      onChange={(next) => onEditChange("techStack", next)}
                    />
                    <MultiSelectDropdown
                      title="Categories"
                      searchPlaceholder="Search category..."
                      options={categoryOptions}
                      value={editForm.categories}
                      onChange={(next) => onEditChange("categories", next)}
                    />
                    <TextField value={editForm.liveUrl} onChange={(value) => onEditChange("liveUrl", value)} placeholder="Live URL (optional)" />
                    <TextField value={editForm.githubUrl} onChange={(value) => onEditChange("githubUrl", value)} placeholder="GitHub URL (optional)" />
                    <label className="flex items-center gap-2 text-sm text-white/80">
                      <input type="checkbox" checked={editForm.featured} onChange={(event) => onEditChange("featured", event.target.checked)} />
                      Featured
                    </label>
                    <div className="flex gap-2">
                      <button type="submit" className="neon-button !px-4 !py-2 text-sm">
                        Save
                      </button>
                      <button type="button" className="ghost-button !px-4 !py-2 text-sm" onClick={() => setEditProjectId(null)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            );
          })}
        </article>
      </div>

      {pendingDeleteProject ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="glass-card w-full max-w-md p-6">
            <h3 className="font-fredoka text-2xl text-white">Delete Project</h3>
            <p className="mt-3 text-sm text-white/75">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">&quot;{pendingDeleteProject.title}&quot;</span>?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="ghost-button !px-5 !py-2 text-sm"
                onClick={() => setPendingDeleteProject(null)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="neon-button !px-5 !py-2 text-sm"
                onClick={async () => {
                  await handleDelete(pendingDeleteProject);
                  setPendingDeleteProject(null);
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
