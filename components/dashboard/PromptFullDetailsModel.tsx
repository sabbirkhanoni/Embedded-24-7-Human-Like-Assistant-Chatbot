import { ArrowDownToDotIcon, BotOffIcon, ClosedCaption, ColumnsSettings, Cross, CrossIcon, DoorClosed, RemoveFormatting } from 'lucide-react';
import React from 'react'

const PromptFullDetailsModel = ({ source, detailsModelOpen, setDetailsModelOpen } : { source: PromptSource | null, detailsModelOpen: boolean, setDetailsModelOpen: (open: boolean) => void }) => {
  if (!detailsModelOpen || !source) return null;
  console.log("Rendering PromptFullDetailsModel with source:", source);
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white rounded-lg p-6 space-y-2 w-full mx-10">
            <div className='flex items-center justify-between'>
              <h2 className="text-xl font-bold mb-4">Prompt Source Details</h2>
            <button
                className=""
                onClick={() => setDetailsModelOpen(false)}
            ><ArrowDownToDotIcon />
            </button>
            </div>
            <p className='border p-1 border-green-500 bg-green-100 rounded'><strong>ID:</strong> {source.id}</p>
            <p className=''><strong>Type:</strong> {source.type}</p>
            <p className=''><strong>Name:</strong> {source.name}</p>
            <p className=''><strong>Status:</strong> <span className={`py-1 px-2 rounded-full text-white text-md ${source.status === "active" ? "bg-blue-500" : "bg-red-500"}`}>{source.status}</span></p>
            <p><strong>Generated Time:</strong> {new Date(source.created_at).toLocaleString()}</p>
            <p><strong>Source URL:</strong> {source.source_url}</p>
            <p className='border p-2'><strong>Content:</strong> <span className='text-sm text-gray-600'>{source.content}</span></p>
        </div>
    </section>
  )
}

export default PromptFullDetailsModel
