import { fullBlog } from "@/app/sanityLib/interface";
import { client } from "@/app/sanityLib/sanity";


async function getData(slug: string){
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
        <h1>
            <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
                Zakaria Jama - Blog
            </span>
        </h1>
    )
}