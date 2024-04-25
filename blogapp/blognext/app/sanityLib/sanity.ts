import {createClient} from "next-sanity"
import imageUrlBuilder from '@sanity/image-url'

export const client =createClient ({
    apiVersion: '2023-05-03',
    dataset:'production',
    projectId:'55yyot17',
    useCdn:false
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any){
    // Allowing Images to be processed
    return builder.image(source);
}