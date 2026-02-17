import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog'
import { Globe, FileText, Upload, X, ArrowRight, Loader, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '../ui/alert'
import { validateURL } from '@/lib/validateURL';
import { se } from 'date-fns/locale';


interface PromptsModelProps {
  open: boolean
  setOpen: (open: boolean) => void
  onImport: (data: any) => Promise<void>
  loading?: boolean
  existingSources: PromptSource[]
}

type Mode = 'website' | 'text' | 'file'

const modeConfig = [
  { id: 'website' as Mode, label: 'Website', icon: Globe },
  { id: 'text'    as Mode, label: 'Text',    icon: FileText },
  { id: 'file'    as Mode, label: 'File',    icon: Upload  },
]

const inputCls =
  'w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-colors'

export default function PromptsModel({ open, setOpen, existingSources , onImport, loading }: PromptsModelProps) {
  const [mode, setMode] = useState<Mode>('website')
  const [importLoading, setImportLoading] = useState(false)
  const close = () => setOpen(false)

  
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [textTitle, setTextTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);


  const handleImportPrompts = async () => {
        setError(null);
        const data: any = { type: mode };

        if(mode === 'website'){
            if(!websiteUrl.trim()){
                setError("Please enter a valid website URL.");
                return;
            }
            if(!validateURL(websiteUrl.trim())){
                setError("Please enter a valid website URL.");
                return;
            }

            const normalizedUrl = websiteUrl.replace(/\/$/, '');
            const checkExisting = existingSources.some((source) => {
                if(source.type === 'website' || !source.source_url) return false;
                const normalizedSource = source.source_url.replace(/\/$/, '');
                return normalizedSource === normalizedUrl;
            });

            if(checkExisting){
                setError("This website has already been added as a source.");
                return;
            }

            data.url = websiteUrl.trim();

        }else if(mode === 'text'){
            if(!textTitle.trim() || !textContent.trim()){
                setError("Please provide both a title and content for the text source.");
                return;
            }

            data.title = textTitle.trim();
            data.content = textContent.trim();

        }else if(mode === 'file'){
            if(!file){
                setError("Please select a CSV file to upload.");
                return;
            }
            data.file = file;
        }
        await onImport(data);

        setWebsiteUrl("");
        setTextTitle("");
        setTextContent("");
        setFile(null);
        setError(null);
   }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 gap-0 max-w-[460px] w-full rounded-2xl border border-zinc-200 bg-white shadow-xl overflow-hidden">

        <div className="px-7 pt-7 pb-0 relative">

          <DialogTitle className="text-lg font-semibold text-zinc-900 tracking-tight mb-1">
            Create a Prompt
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-500 leading-relaxed mb-6">
            Choose a source and supply your content.
          </DialogDescription>
        </div>


        <div className="flex gap-2 px-7 mb-5">
          {modeConfig.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              className={`flex-1 flex flex-row items-center gap-1.5 py-3 px-2 rounded-xl border transition-all text-xs font-medium
                ${mode === id
                  ? 'border-zinc-900 bg-zinc-900 text-white'
                  : 'border-zinc-200 bg-zinc-50 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 hover:border-zinc-300'
                }`}
            >
              <div className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors
                ${mode === id ? 'bg-white/15' : 'bg-zinc-200'}`}>
                <Icon size={12} />
              </div>
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="mx-7 border-t border-zinc-100 mb-5" />

     
        <div className="px-7">
        
          {
            error && (
                <Alert
                  variant="destructive"
                  className='bg-red-100 border-red-600 text-red-900 mb-5'>
                    <AlertCircle size={16} className="text-red-950" />
                    <AlertDescription>
                      {error}
                    </AlertDescription>
                </Alert>
            )
          }

          {mode === 'website' && (
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-2">Website URL</label>
              <div className="relative">
                <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                <input
                type="url" 
                placeholder="https://example.com"
                className={`${inputCls} pl-8`} 
                value={websiteUrl}
                onChange={(e) => {
                    setWebsiteUrl(e.target.value)
                    if(error) setError(null);
                }}
                />
              </div>
            </div>
          )}

    
          {mode === 'text' && (
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-2">Title</label>
                <input 
                    type="text" 
                    placeholder="Give this prompt a name…" 
                    className={inputCls} 
                    value={textTitle}
                    onChange={(e) => setTextTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-2">Content</label>
                <textarea
                    rows={4}
                    placeholder="Paste or write your content here…" 
                    className={`${inputCls} resize-none`}
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                />
              </div>
            </div>
          )}

     
          {mode === 'file' && (
            <label className="flex flex-col items-center gap-3 py-8 px-5 border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50 cursor-pointer hover:border-zinc-400 hover:bg-zinc-100 transition-colors relative">
              <input
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                accept='.csv, text/csv'
                onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                        if(selectedFile.size > 10 * 1024 * 1024){ // 10 MB limit
                            setError("File size exceeds the 10 MB limit.");
                            return;
                        }
                        if(!selectedFile.name.endsWith(".csv") && selectedFile.type !== "text/csv"){
                            setError("Invalid file type. Please upload a CSV file.");
                            return;
                        }
                        setFile(selectedFile);
                        if(error){
                            setError(null);
                        }

                    }
                }}
                />
              <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-200 border border-zinc-300 text-zinc-500">
                <Upload size={18} />
              </div>
              <p className="text-sm text-zinc-500">
                Drop your CSV file here(MAX 9.99 MB) <span className="font-medium text-zinc-700">browse</span>
              </p>
              <p className="text-xs text-zinc-400">PDF, DOCX, TXT · up to 25 MB</p>
            </label>
          ) }

        </div>

        <div className="flex justify-end gap-2 px-7 pt-5 pb-6 mt-5 border-t border-zinc-100">
          <button
            onClick={close}
            className="px-4 py-2 rounded-lg border border-zinc-200 text-sm font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700 hover:border-zinc-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleImportPrompts}
            disabled={importLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-700 transition-colors group"
          >
            {
                importLoading ? <Loader size={14} /> : "Import Source"
            }
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </DialogContent>
    </Dialog>
  )
}