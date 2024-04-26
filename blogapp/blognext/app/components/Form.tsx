"use client"
import React, { useState } from 'react';
import { client } from '@/app/sanityLib/sanity'; // Adjust import path as needed

interface FormData {
  title: string;
  titleImage: string;
  smallDescription: string;
  content: string;
}

const SanityForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    titleImage: '',
    smallDescription: '',
    content: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name,value)
    debugger;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { title, titleImage, smallDescription, content } = formData;
      const document = {
        _type: 'blog', // Replace 'blog' with your actual Sanity document type
        title,
        titleImage,
        smallDescription,
        content,
      };
      const response = await client.create(document);
      console.log('Document created:', response);
      alert('Data posted to Sanity successfully!');
      setFormData({
        title: '',
        titleImage: '',
        smallDescription: '',
        content: '',
      });
    } catch (error) {
      console.error('Failed to post data to Sanity:', error);
      alert('Failed to post data to Sanity. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e: any) => console.log(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="titleImage">Image:</label>
        <input
          type="text"
          name="titleImage"
          value={formData.titleImage}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="smallDescription">Small Description:</label>
        <input
          type="text"
          name="smallDescription"
          value={formData.smallDescription}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <input
          type="text"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Post Blog</button>
    </form>
  );
};

export default SanityForm;
