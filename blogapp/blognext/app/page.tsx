import { simpleBlogCard } from "./sanityLib/interface";
import { client } from "./sanityLib/sanity";

async function getData(){
  const query = `
  *[_type == 'blog']| order(_createdAt desc){
    title,
      smallDescription,
      "currentSlug" :slug.current,
      titleImage
  }
  `;

  const data = await client.fetch(query)
  return data;

}

export default async function Home() {
// We are in the server component so adding async is safe as everything is on the server

  const data: simpleBlogCard[] = await getData();


  console.log(data)
  return (
    <div>
      
    </div>
  );
}
