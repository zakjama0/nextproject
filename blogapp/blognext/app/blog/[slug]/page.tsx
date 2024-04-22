import { fullBlog } from "@/app/sanityLib/interface";
import { client, urlFor } from "@/app/sanityLib/sanity";
import Image from "next/image";
import {PortableText} from "@portabletext/react"


async function getData(slug: string){
    // imitating delay, a 3 second delay
    await new Promise(resolve => setTimeout(resolve,3000))
    const query = `*[_type == 'blog' && slug.current == '${slug}']{
        "currentSlug": slug.current,
          title,
          content,
          titleImage
      }[0]`;
      const data = await client.fetch(query)
      return data;
}


export default async function BlogArticle({params}:{params:{slug: string}}){
   const data: fullBlog = await getData(params.slug);
//    full Blog is just an object, no need for []
   console.log(data)
    return (
        <div className="mt-8">
            <h1>
            <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
                Zakaria Jama - Blog
            </span>

            <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
                {data.title}
            </span>
        </h1>

        <Image src={urlFor(data.titleImage).url()}
         width={800}
         height={800} 
         alt="title image"
         priority
         className="rounded-lg mt-8 border"/>

         <div className="mt-16 prose prose-lg prose-blue dark:prose-invert">
            <PortableText value={data.content} />
            {/* Download Tailwind CSS Typography and use prose to make the text readable */}
         </div>
        </div>


        
    )
}