"use client";

import { Copy } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="text-brand-blue hover:text-brand-blue/80 text-sm font-bold flex items-center gap-1"
    >
      <Copy className="w-4 h-4" />
      Copy
    </button>
  );
}
