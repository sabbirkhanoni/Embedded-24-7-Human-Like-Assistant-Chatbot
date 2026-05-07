import React from 'react'
import { Template } from '@/app/dashboard/templates/page';

interface TemplateTableProps {
    templates: Template[];
}

const TemplateTable = ({ templates }: TemplateTableProps) => {
  return (
    <div>
        <table className="w-full text-black text-center border border-gray-900 rounded-lg shadow-md">
          <thead>
            <tr className="bg-green-200 border border-black text-center p-1">
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='text-black'>
            {templates.map((template) => (
              <tr key={template.id} className="hover:bg-gray-100 transition-colors p-1 duration-200">
                <td className='border border-black text-center p-1'>{template.name}</td>
                <td className='border border-black text-center p-1'>{template.description}</td>
                <td className='border border-black text-center p-1'>
                  <button onClick={() => {}}>Refresh</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default TemplateTable
