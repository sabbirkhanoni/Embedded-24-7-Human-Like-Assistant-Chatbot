"use client";
import PromptsModel from '@/components/dashboard/PromptsModel';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'

const Page = () => {

  const [OpenModel, setOpenModel] = useState(false);
  const [promptsStoringLoading, setPromptsStoringLoading] = useState(false);
  const [promptsSourcesLoading, setPromptsSourcesLoading] = useState(false);
  const [promptsSources, setPromptsSources] = useState<PromptSource[]>([]);


  const openModel = (model: string) => {
    setOpenModel(true);
  }

    const handleImportSource = async (source: any) => {

    }


  return (
    <div className='max-w-7xl mx-auto p-4 animate-in fade-in duration-300'>
      <div className='flex flex-row justify-between items-start'>
        <div>
            <h1 className='text-2xl font-bold mb-4 text-gray-300'>Prompts</h1>
            <p className='text-gray-500'>Manage your prompts here. This section is under construction.</p>
        </div>
        <div>
            <Button
                className='bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200'
                onClick={() => openModel("website")}>
                <Plus size={16} className='' />
                Add Prompt
            </Button>
        </div>

        <PromptsModel
          open={OpenModel}
          setOpen={setOpenModel}
          existingSources={promptsSources}
          onImport={handleImportSource}
          loading={promptsStoringLoading}
        />
        
      </div>
    </div>
  )
}

export default Page
