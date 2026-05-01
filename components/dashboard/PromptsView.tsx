import { Eye, EyeIcon, LucideEye, ScanEye, ViewIcon } from 'lucide-react'
import React, { useState } from 'react'
import PromptFullDetailsModel from './PromptFullDetailsModel';

const PromptsView = ({ sources , handleOnSourceClick, loading }: { sources: any[], handleOnSourceClick: (source: any) => void, loading: boolean }) => {

  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [openFullDetails, setOpenFullDetails] = useState(false);

  return (
    <div className='text-black mt-4 overflow-y-auto max-h-56'>
        <table className="w-full text-left p-2 border border-gray-200 mb-4  ">
            <thead>
                <tr>
                    <th className="border text-center p-2">ID</th>
                    <th className="border text-center p-2">Type</th>
                    <th className="border text-center p-2">Status</th>
                    <th className="border text-center p-2">Actions</th>
                </tr>
            </thead>
            
                {loading ? (
                    <tbody className='text-black'>
                        <tr className="animate-pulse">
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                        </tr>
                        <tr className="animate-pulse">
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                        </tr>
                        <tr className="animate-pulse">
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                        </tr>
                        <tr className="animate-pulse">
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                        </tr>
                        <tr className="animate-pulse">
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                        </tr>
                        <tr className="animate-pulse">
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                        </tr>
                        <tr className="animate-pulse">
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                            <td className="border p-2 text-center"><div className='h-4 bg-gray-300 rounded'></div></td>
                        </tr>
                    </tbody>
                    
                ) : (
                    <tbody className='text-black '>
                        {sources.map((source) => (
                            <tr key={source.id}>
                                <td className="border-b p-2">{source.id}</td>
                                {
                                    source.type === "website" ? (
                                        <td className="border-b p-2">
                                            <span>
                                                <div>{source.type}</div>
                                                <div>{source.source_url}</div>
                                            </span>
                                        </td>
                                    ) : (
                                        <td className="border-b p-2">{source.type}</td>
                                    )
                                }
                                {
                                    source.status === "active" ? (
                                        <td className="border-b text-center px-4"><span className='bg-blue-500 py-0.5 flex justify-center items-center rounded-full text-white text-md'>{source.status}</span></td>
                                    ) : (
                                        <td className="border-b text-center px-4"><span className='bg-red-500 py-0.5 flex justify-center items-center rounded-full text-white text-md'>{source.status}</span></td>
                                    )
                                }
                                <td className="border-b text-center p-2">
                                    <button className='p-1 hover:bg-blue-300 rounded-full cursor-pointer' onClick={() => {
                                        setSelectedSourceId(source.id);
                                        setOpenFullDetails(true);
                                    }}><LucideEye /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>

            {
                openFullDetails && (
                    console.log("Opening details for source ID:", selectedSourceId),
                    <PromptFullDetailsModel
                        source={sources.find(source => source.id === selectedSourceId) || null}
                        detailsModelOpen={openFullDetails}
                        setDetailsModelOpen={setOpenFullDetails}
                    />
                )
            }
        </div>
  )
}

export default PromptsView
