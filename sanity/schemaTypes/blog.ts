export default {
    name: "blog",
    type: "document",
    title: "Blog",
    fields: [
        {
            name: "name",
            type: "string",
            title: "Blog Title"
        },
        {
            name: 'slug',
            type: 'slug',
            title: "Blog Slug",
            options: {
                source: 'name',
            }
        },
        {
            name: "description",
            type: 'text',
            title: "Description"
        },
        {
            name: "image",
            type: "image",
            title: "Image"
        },
        {
            name: 'content',
            type: 'array',
            title: 'Content',
            of: [{ type: 'block' }]
        }
    ]
}