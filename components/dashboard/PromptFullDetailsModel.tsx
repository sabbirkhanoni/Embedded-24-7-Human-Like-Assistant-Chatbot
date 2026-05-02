import { X } from 'lucide-react';
import React from 'react';

const PromptFullDetailsModal = ({
  source,
  detailsModelOpen,
  setDetailsModelOpen,
}: {
  source: PromptSource | null;
  detailsModelOpen: boolean;
  setDetailsModelOpen: (open: boolean) => void;
}) => {
  if (!detailsModelOpen || !source) return null;

  return (
    <section className="fixed inset-0 w-full z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="bg-white w-full rounded-2xl border mx-10 my-5 border-neutral-200 shadow-xl overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-sm font-medium text-neutral-800 tracking-tight">
              Prompt source details
            </span>
          </div>
          <button
            onClick={() => setDetailsModelOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 transition-colors"
          >
            <X size={12} strokeWidth={1.5} />
          </button>
        </div>


        <div className="px-6 py-5 space-y-3">

          <div className="bg-neutral-50 rounded-lg px-3.5 py-2.5 flex items-center gap-2">
            <span className="font-mono text-xs text-neutral-400 tracking-wide">
              ID: {source.id}
            </span>
          </div>


          <div className="grid grid-cols-2 gap-3">
            <Field label="Type" value={source.type} />
            <div className="border border-neutral-100 rounded-xl px-3.5 py-3">
              <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1">Status</p>
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    source.status === 'active' ? 'bg-green-500' : 'bg-red-400'
                  }`}
                />
                <span className="text-sm font-medium text-neutral-800 capitalize">
                  {source.status}
                </span>
              </div>
            </div>
          </div>

        
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name" value={source.name} />
            <Field
              label="Generated"
              value={new Date(source.created_at).toLocaleString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric',
                hour: '2-digit', minute: '2-digit',
              })}
            />
          </div>

     
          <div className="border border-neutral-100 rounded-xl px-3.5 py-3">
            <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1.5">Source URL</p>
            <p className="font-mono text-xs text-blue-500 break-all leading-relaxed">
              {source.source_url}
            </p>
          </div>

     
          <div className="border border-neutral-100 rounded-xl px-3.5 py-3 overflow-auto max-h-48">
            <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1.5">Content</p>
            <p className="text-sm text-neutral-500 leading-relaxed">{source.content}</p>
          </div>
        </div>

        
        <div className="px-6 py-3.5 border-t border-neutral-100 flex justify-end gap-2">
          <button
            onClick={() => setDetailsModelOpen(false)}
            className="px-4 py-1.5 text-sm rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="border border-neutral-100 rounded-xl px-3.5 py-3">
    <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1">{label}</p>
    <p className="text-sm font-medium text-neutral-800 truncate">{value}</p>
  </div>
);

export default PromptFullDetailsModal;