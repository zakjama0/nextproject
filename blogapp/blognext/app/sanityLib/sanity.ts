import {createClient} from "next-sanity"

export const client =createClient ({
    apiVersion: '2023-05-03',
    dataset:'production',
    projectId:'55yyot17',
    useCdn:false
})