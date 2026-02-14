"use client";
import axios from "axios";
import React from "react";

interface StartupFormProps {
  businessName?: string;
  industry?: string;
  description?: string;
  externalUrl?: string;
  website?: string;
}

const FormStructure = [
  {
    id: "businessName",
    label: "Business Name",
    placeholder: "Enter your business name",
    type: "text",
    description: "The name of your startup or business.",
    icons: "briefcase",
    questions: "What is the name of your startup or business?",
    field: "businessName" as keyof StartupFormProps,
  },
  {
    id: "industry",
    label: "Industry",
    placeholder: "Enter your industry",
    type: "text",
    description: "The industry your startup operates in.",
    icon: "briefcase",
    questions: "What industry does your startup belong to?",
    field: "industry" as keyof StartupFormProps,
  },
  {
    id: "description",
    label: "Description",
    placeholder: "Describe your startup",
    type: "textarea",
    description: "A brief description of your startup and its mission.",
    icon: "file-text",
    questions:
      "Can you provide a brief description of your startup and its mission?",
    field: "description" as keyof StartupFormProps,
  },
  {
    id: "externalUrl",
    label: "External URL",
    placeholder: "Enter an external URL",
    type: "text",
    description: "An external URL related to your startup.",
    icon: "link",
    questions: "What is an external URL related to your startup?",
    field: "externalUrl" as keyof StartupFormProps,
  },
  {
    id: "website",
    label: "Website",
    placeholder: "Enter your website URL",
    type: "text",
    description: "The URL of your startup's website.",
    icon: "link",
    questions: "What is the URL of your startup's website?",
    field: "website" as keyof StartupFormProps,
  },
];

const StartupForm = () => {
  const [formData, setFormData] = React.useState<StartupFormProps>({
    businessName: "",
    industry: "",
    description: "",
    externalUrl: "",
    website: "",
  });

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await axios.post("/api/startup/create", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.success) {
      alert("Startup data saved successfully!");
      setFormData({
        businessName: "",
        industry: "",
        description: "",
        externalUrl: "",
        website: "",
      });

      window.location.reload();
    } else {
      alert("Failed to save startup data. Please try again.");
    }
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full mt-8 my-auto max-w-2xl mx-auto p-6 bg-[#0f0f0f] rounded-lg shadow-md border border-gray-700">
      <h2 className="text-2xl font-bold mb-1 text-gray-300 text-center">
        Business Information
      </h2>
      <h3 className="text-sm font-semibold mb-4 text-gray-600 text-center">
        &lt;--One Time Setup--&gt;
      </h3>
      <form className="space-y-4" onSubmit={handleOnSubmit} method="POST">
        {FormStructure.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-gray-300"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.field}
              type={field.type}
              placeholder={field.placeholder}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-[#1e1e1e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData[field.field]}
              onChange={handleOnChange}
            />
            <p className="mt-1 text-sm text-gray-500">{field.description}</p>
          </div>
        ))}
        <div className="flex justify-center ">
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Set up
          </button>
        </div>
      </form>
    </div>
  );
};

export default StartupForm;
