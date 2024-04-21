export default{
    name: 'blog',
    type: 'document',
    title: 'Blog',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title of blog article'
        },
        {
            // A Slug is the unique identifying part of a web address, typically at the end of the URL
            name:'slug',
            type:'slug',
            title:'Slug of the article',
            options:{
                source:'title'
            }
        },
        {
            name: 'titleImage',
            type: 'image',
            title: 'Title of Image'
        },
        {
            name: 'smallDescription',
            type: 'text',
            title: 'Small Description'
        },
        {
            name: 'content',
            type: 'array',
            title: 'Content',
            // specifying the type of array
            of:[
                {
                    type: 'block',
                    
                }
            ]
        },

    ]
}