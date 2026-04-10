"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type Application = {
  id: string;
  title: string;
  company: string;
  link: string;
  applied_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
};

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "title",
    header: "Job Title",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "applied_date",
    header: "Applied Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("applied_date"));
      return format(date, "MMM dd, yyyy");
    },
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => {
      const link = row.getValue("link") as string;
      return link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline truncate max-w-xs block"
        >
          View
        </a>
      ) : (
        <span className="text-gray-400">—</span>
      );
    },
  },
];
