"use client";
import AxiosToastError from '@/app/utils/AxiosToastError';
import PromptsModel from '@/components/dashboard/PromptsModel';
import PromptsView from '@/components/dashboard/PromptsView';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { tr } from 'date-fns/locale';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Page = () => {

  const [promptsStoringLoading, setPromptsStoringLoading] = useState(false);
  const [promptsSourcesLoading, setPromptsSourcesLoading] = useState(false);
  const [promptsSources, setPromptsSources] = useState<PromptSource[]>([]);
  const [modeType, setModeType] = useState<"website" | "text" | "file">("website");
  const [selectPromptSource, setSelectPromptSource] = useState<PromptSource | null>(null);
  const [sheetModelOpen, setSheetModelOpen] = useState(false);


  useEffect(() => {
    fetchPromptsSources();
  }, []);



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
          await fetchPromptsSources();
        }
      }catch(error: any){
        console.error("Import error:", error.response?.data || error.message);
        AxiosToastError(error || "An error occurred while importing the prompt source.");
      } finally{
        setPromptsStoringLoading(false);
      }
    }

    const handleOnSourceClick = (source: PromptSource) => {
      setSelectPromptSource(source);
      setSheetModelOpen(true);
    }

    const fetchPromptsSources = async () => {
      setPromptsSourcesLoading(true);
      try {
        const response = await axios.get("/api/prompts/get");
        console.log("Fetched sources:", response);
        setPromptsSources(response.data.sources);
        toast.success("Prompt sources fetched successfully!");
      } catch (error) {
        AxiosToastError(error || "An error occurred while fetching prompt sources.");
      } finally {
        setPromptsSourcesLoading(false);
      }
    }
    
    


  return (
    <div className='max-w-7xl mx-auto duration-300'>
      <div className='mb-8'>
            {/* PromptsModel always shown - embedded form */}
            <PromptsModel
              existingSources={promptsSources}
              onImport={handleImportSource}
              setModeType={setModeType}
              loading={promptsStoringLoading}
            />

            <PromptsView
              sources={promptsSources}
              handleOnSourceClick={handleOnSourceClick}
              loading={promptsSourcesLoading}
            />

            
      </div>
    </div>
  )
}

export default Page
