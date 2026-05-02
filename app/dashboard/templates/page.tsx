    'use client'

import AxiosToastError from '@/app/utils/AxiosToastError';
import axios from 'axios';
import { X } from 'lucide-react';
    import React, { useEffect, useState } from 'react'

    type TempStatus = "active" | "draft" | "disabled";
    type Tone = "strict" | "neutral" | "friendly" | "empathetic";

    interface Template {
    id: string;
    name: string;
    description: string;
    sourceCount: string;
    source_ids: string[];
    tone: Tone;
    scopeLabel: string;
    allowed_topics?: string;
    blocked_topics?: string;
    status: TempStatus;
    }

    interface PromptSource {
    id: string;
    name: string;
    type: string;
    status: string;
    source_url: string;
    }

    interface FieldProps {
    name: string;
    description: string;
    tone: Tone;
    allowedTopics?: string;
    blockedTopics?: string;
    fallbackBehavior: string;
    }

    const page = () => {


    const [selectedTemplate, setSelectedTemplate] = useState(false);
    const [promptSource, setPromptSource] = useState<PromptSource[]>([]);
    const [selectedSource, setSelectedSource] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loading1,setLoading1] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        tone: "neutral",
        allowedTopics: "",
        blockedTopics: "",
        fallbackBehavior: "escalate"
    })

    const handleOnSubmit : React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        
    }

    const handleReset = () => {
        setFormData({
            name: "",
            description: "",
            tone: "neutral",
            allowedTopics: "",
            blockedTopics: "",
            fallbackBehavior: "escalate"
        });
    }

    const handleRemoveSource = (sourceId: string) => {
        setSelectedSource(selectedSource.filter(id => id !== sourceId));
    }

    const fetchPromptSources = async () => {
        try {
            const response = await axios.get("/api/prompts/get");
            console.log("Fetched prompt sources:", response);
            setPromptSource(response.data.sources);
        } catch (error) {
            AxiosToastError(error || "An error occurred while fetching prompt sources.");
        } finally {
            setLoading1(false);
        }
    }

    useEffect(() => {
        console.log("Fetching prompt sources2...", promptSource);
        fetchPromptSources();
    }, [])

  return (
    <section className='h-screen'>
        <div>
          {/* form */}
          <div>
              <h2 className='text-xl font-bold text-black mb-2 border bg-green-200 py-1 border-green-500 rounded text-center'>Create New Template</h2>
              <form className='bg-white p-5 grid grid-cols-2 gap-4 rounded-lg shadow-md text-black' method='POST' onSubmit={handleOnSubmit}>
                  <div className=''>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>Template name</label>
                      <input
                          type='text'
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className='block w-full border border-gray-300 rounded-md p-2'
                      />
                      <div>
                        {
                            selectedSource.length > 0 && (
                                <ul className='mt-1 border border-gray-300 rounded-md p-1 bg-gray-50 text-sm'>
                                    {selectedSource.map((sourceId) => {
                                        const source = promptSource.find((s) => s.id === sourceId);
                                        return (
                                            <li className='flex items-center justify-between' key={sourceId}>
                                                {source ? (
                                                    <>
                                                        <div className='flex items-center'>
                                                            <p>{source.source_url ? `(${source.source_url})` : `${source.type} - ${source.name}`}</p>
                                                            <button type='button' onClick={() => handleRemoveSource(sourceId)} className='ml-2 text-red-500 hover:text-red-700'><X size={15} /></button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>Unknown source</>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )
                        }
                      </div>

                  </div>
                  <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                      <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className='block w-full border border-gray-300 rounded-md p-2'
                      />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Prompt sources</label>
                    <select defaultValue="" className='block w-full border border-gray-500 rounded-md p-2' onChange={(e) => setSelectedSource([...selectedSource, e.target.value])}>
                        <option value="" disabled>Select prompt sources</option>
                        {promptSource.map((source) => (
                            <option key={source.id} value={source.id}>
                            {source.source_url ? `(${source.source_url})` : `${source.type} - ${source.name}`}
                            </option>
                        ))}
                    </select>
                  </div>
                  <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>Tone</label>
                      <select
                          value={formData.tone}
                          onChange={(e) => setFormData({ ...formData, tone: e.target.value as Tone })}
                          className='block w-full border border-gray-300 rounded-md p-2'
                      >
                          <option value='strict'>Strict</option>
                          <option value='neutral'>Neutral</option>
                          <option value='friendly'>Friendly</option>
                          <option value='empathetic'>Empathetic</option>
                      </select>
                  </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>Allowed topics (comma separated)</label>
                      <input
                          type='text'
                          value={formData.allowedTopics}
                          onChange={(e) => setFormData({ ...formData, allowedTopics: e.target.value })}
                          className='block w-full border border-gray-300 rounded-md p-2'
                      />
                  </div>
                  <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>Blocked topics (comma separated)</label>
                      <input
                          type='text'
                          value={formData.blockedTopics}
                          onChange={(e) => setFormData({ ...formData, blockedTopics: e.target.value })}
                          className='block w-full border border-gray-300 rounded-md p-2'
                      />
                  </div>
                    <div>
                    <button type='submit' className='w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
                      Create Template
                    </button>
                  </div>
                  <div>
                    <button type='button' onClick={handleReset} className='w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600'>
                      Clear
                    </button>
                  </div>
              </form>
          </div>
          {/* Table */}
          <div>

          </div>
        </div>
    </section>
  )
}

export default page
