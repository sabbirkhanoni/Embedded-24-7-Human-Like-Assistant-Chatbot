"use client";
import AxiosToastError from '@/app/utils/AxiosToastError';
import PromptsModel from '@/components/dashboard/PromptsModel';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const Page = () => {

  const [OpenModel, setOpenModel] = useState(false);
  const [promptsStoringLoading, setPromptsStoringLoading] = useState(false);
  const [promptsSourcesLoading, setPromptsSourcesLoading] = useState(false);
  const [promptsSources, setPromptsSources] = useState<PromptSource[]>([]);
  const [modeType, setModeType] = useState<"website" | "text" | "file">("website");


  const openModel = (model: string) => {
    setOpenModel(true);
  }

    const handleImportSource = async (data: any) => {
      setPromptsStoringLoading(true);

      try{
        let response: any;
        if(data.file){
          // File upload with FormData
          const formData = new FormData();
          formData.append("file", data.file);
          formData.append("type", data.type || "file");
          console.log("Sending file:", { type: data.type, fileName: data.file.name });
          response = await axios.post("/api/prompts/sources", formData);
        }else {
          // JSON payload - data already includes type from PromptsModel
          console.log("Sending payload:", data);
          response = await axios.post("/api/prompts/sources", data);
        }
        
        if(response.status === 200){
          toast.success("Prompt source imported successfully!");
          setOpenModel(false);
          //await fetchPromptsSources();
        }
      }catch(error: any){
        console.error("Import error:", error.response?.data || error.message);
        AxiosToastError(error || "An error occurred while importing the prompt source.");
      } finally{
        setPromptsStoringLoading(false);
      }
    }

    const fetchPromptsSources = async () => {
      setPromptsSourcesLoading(true);
      try {
        const response = await axios.get("/api/prompts/sources");
        setPromptsSources(response.data.sources);
      } catch (error) {
        AxiosToastError(error || "An error occurred while fetching prompt sources.");
      }
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
          setModeType={setModeType}
          loading={promptsStoringLoading}
        />
        
      </div>
    </div>
  )
}

export default Page
