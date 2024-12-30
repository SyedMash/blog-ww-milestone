import Comments from "@/components/comments";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/types";
import { PortableText } from "next-sanity";

import Image from "next/image";
import React from "react";

export const dynamic = "force-dynamic";

const BlogPage = async ({ params }: { params: { slug: string } }) => {
  const query = `*[_type == "blog" && slug.current == "${params.slug}"][0]{
    name,
   description,
   image,
   content
}`;

  const blog: Post = await client.fetch(query);

  return (
    <div className="min-h-screen container px-2 lg:px-0 mx-auto">
      <h1 className="text-center tracking-wide text-2xl md:text-3xl lg:text-5xl font-bold mt-6 uppercase text-red-400">
        {blog.name}
      </h1>
      <p className="text-center justify-center mb-6">{blog.description}</p>
      <div className="h-[30vh] lg:h-[40vh] w-full rounded-lg overflow-hidden">
        <Image
          src={urlFor(blog.image).url()}
          alt={blog.name}
          width={500}
          height={500}
          priority
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="mt-12 prose prose-blue prose-lg prose-li:marker:text-red-400 max-w-none dark:prose-invert border-b pb-4">
        <PortableText value={blog.content} />
      </div>
      <Comments />
    </div>
  );
};

export default BlogPage;
