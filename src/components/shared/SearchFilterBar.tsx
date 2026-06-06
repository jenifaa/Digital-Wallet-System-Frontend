import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export interface FilterOption {
  label: string;
  value: string;
}

interface SearchFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  statusValue?: string;
  onStatusChange?: (value: string) => void;
  statusOptions?: FilterOption[];
  sortValue?: string;
  onSortChange?: (value: string) => void;
  sortOptions?: FilterOption[];
  onReset?: () => void;
}

export default function SearchFilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  statusValue,
  onStatusChange,
  statusOptions,
  sortValue,
  onSortChange,
  sortOptions,
  onReset,
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-11 border-slate-800 bg-slate-900 pl-10"
          aria-label="Search"
        />
      </div>

      {statusOptions && onStatusChange && (
        <Select value={statusValue} onValueChange={onStatusChange}>
          <SelectTrigger className="h-11 w-full border-slate-800 bg-slate-900 lg:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {sortOptions && onSortChange && (
        <Select value={sortValue} onValueChange={onSortChange}>
          <SelectTrigger className="h-11 w-full border-slate-800 bg-slate-900 lg:w-44">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {onReset && (
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="h-11 gap-2 rounded-xl border-slate-700"
        >
          <SlidersHorizontal className="size-4" />
          Reset
        </Button>
      )}
    </div>
  );
}
