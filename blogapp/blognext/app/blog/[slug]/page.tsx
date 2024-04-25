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
const postData = async() =>{ 
    try {
        const response = await fetch(`https://55yyot17.api/v1/data/mutate/production`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer skjMIQimluKO32FH09q2V4TwSa5ocAP1lPWgggXhvsJC4Yt7cKRQXsjaINGTeCvQN55o7pBqvhdhx4hcktniXEtjpe5sa1hulk9CzqReAndWVTFTQa1Mnu4WcGkdloswUpQ1kgtV6aA0bLIuF9G3d45fx2oDlmUzKhkKS7CmCSSp2KCeB6rr"
            },
            body: JSON.stringify({
                mutations:[
                    {
                        create:{
                            _type:"any"
                        }
                    }
                ]
            })
        });
        if (!response.ok) {
            throw new Error("Failed to create document in Sanity");
        }

        const data = await response.json();
        console.log("Document created:", data);


    }
    catch(error){
        console.log("Document created:", error);

    }

}

postData();

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