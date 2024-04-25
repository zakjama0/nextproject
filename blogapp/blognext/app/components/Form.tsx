import { client } from "@/app/sanityLib/sanity";
import { useState } from "react";

export default function Form(){

// const[title, setTitle] = useState('');
// const[titleImage, setTitleImage] = useState('')
// const[smallDescription, setSmallDescription] = useState('')
// const[content, setContent] = useState('')
interface FormData {
    title: string;
    titleImage: string;
    smallDescription: string;
    content: string;
  }
const SanityForm: React.FC = () => {
    const [formData, setFormData] = useState({
      title: '',
      titleImage: '',
      smallDescription:'',
      content: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
try{
    const { title,titleImage,smallDescription, content } = formData; // Destructure title and content from formData

    // Construct a new document object to be posted to Sanity
    const document = {
      _type: 'blog', // Replace 'yourDocumentType' with your actual Sanity document type
      title,
      titleImage,
      smallDescription,
      content,
    };
    const response = await client.create(document);
    console.log('Document created:', response); // Log the response to console

      // Clear the form fields after successful submission
      setFormData({
        title: '',
        titleImage: '',
        smallDescription: '',
        content: '',
      }); // Provide the correct type for state update

      // Show an alert indicating successful data submission
      alert('Data posted to Sanity successfully!');

}

catch(error){
    alert('Failed to post data to Sanity. Please try again.'); // Show an alert for error handling
}
}



return(
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="title">Title</label>
            <input 
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label htmlFor="titleImage">Image</label>
            <input 
            type="text"
            value={formData.titleImage}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label htmlFor="smallDescription">Small Description</label>
            <input 
            type="text"
            value={formData.smallDescription}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label htmlFor="content">Content</label>
            <input 
            type="text"
            value={formData.content}
            onChange={handleChange}
            required
            />
        </div>
        <button type="submit">Post Blog</button>

    </form>
)

}
}