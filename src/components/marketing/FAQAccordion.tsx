import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import PageTransition from "@/components/shared/PageTransition";
import SearchFilterBar from "@/components/shared/SearchFilterBar";

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  showSearch?: boolean;
  showCategories?: boolean;
}

export default function FAQAccordion({
  items,
  showSearch = true,
  showCategories = true,
}: FAQAccordionProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(items.map((item) => item.category)))],
    [items],
  );

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.question.toLowerCase().includes(search.toLowerCase()) ||
        item.answer.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [category, items, search]);

  return (
    <PageTransition className="space-y-6">
      {showSearch && (
        <SearchFilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search questions..."
          statusValue={category}
          onStatusChange={setCategory}
          statusOptions={categories.map((cat) => ({
            label: cat === "all" ? "All categories" : cat,
            value: cat,
          }))}
          onReset={() => {
            setSearch("");
            setCategory("all");
          }}
        />
      )}

      <div className="space-y-3">
        {filteredItems.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-800 p-8 text-center text-slate-400">
            No questions match your search.
          </p>
        )}

        {filteredItems.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-900/60"
                aria-expanded={isOpen}
              >
                <div>
                  {showCategories && (
                    <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-indigo-400">
                      {item.category}
                    </span>
                  )}
                  <span className="font-medium text-white">{item.question}</span>
                </div>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-slate-400 transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="border-t border-slate-800 px-5 py-4 text-sm leading-7 text-slate-400"
                >
                  {item.answer}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </PageTransition>
  );
}
