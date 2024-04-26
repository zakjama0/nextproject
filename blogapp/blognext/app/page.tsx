import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./sanityLib/interface";
import { client, urlFor } from "./sanityLib/sanity";
import Image from "next/image"
import { Button } from "@/UIcomponents/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./blog/[slug]/loading";
import SanityForm from "./components/form";
async function getData(){
  await new Promise(resolve => setTimeout(resolve,3000))
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
    <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5" >
      
      {data.map((post, idx) =>(
        // idx is an iterator id
        <Card key={idx}>
         <Image 
         src={urlFor(post.titleImage).url()} 
         alt="Post"
         width={500} 
         height={500}
         className="rounded-t-lg h-[200px] w-[100%] object-cover"/>

        <CardContent className="mt-5">
          <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
          <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">{post.smallDescription}</p>
          <Button asChild className="w-full mt-7 bg-primary px-5 py-2 flex text-white">
            <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
          </Button>
        </CardContent>

        </Card>
      ))}

      
      <SanityForm/>

    </div>
  );
}
