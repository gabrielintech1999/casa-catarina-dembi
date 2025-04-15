import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface Props {
  title: string;
  count?: number;
  desc?: string;
}

export default function AccountSection({ title, desc, count }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-500 mb-3 overflow-hidden">
      {/* Cabeçalho clicável */}
      <div
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2 font-medium">
        {title}
          {count !== undefined && (
            <span className="text-violet-600 text-sm font-semibold">{count}</span>
          )}
        </div>
        <FaChevronDown
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          size={14}
        />
      </div>

      {/* Conteúdo expansível */}
      <div
        className={`transition-all duration-300 px-4 ${
          open ? "max-h-40 py-2" : "max-h-0 py-0"
        } overflow-hidden text-sm text-gray-700`}
      >
        {/* Conteúdo fictício */}
        <p>
          {desc}
        </p>
      </div>
    </div>
  );
}
