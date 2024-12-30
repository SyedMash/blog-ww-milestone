import { client } from "@/lib/client";
import { urlFor } from "@/lib/image";
import { Posts } from "@/types";
import Image from "next/image";
import { Card } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

const BlogHome = async () => {
  const query = `*[_type == "blog"] | order(_createdAt asc) {
    name,
    "slug": slug.current,
    description,
    image,
}`;

  const posts: Posts[] = await client.fetch(query);

  return (
    <div className="min-h-[calc(100vh-64px)] container mx-auto px-2 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, idx: number) => (
          <Card
            key={idx}
            className="w-full  p-3 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-full h-[300px] rounded-lg overflow-hidden">
              <Image
                src={urlFor(post.image).url()}
                alt={post.name}
                width={500}
                height={500}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold mt-4">{post.name}</h1>
            <p className="text-gray-600 mt-2 dark:invert">{post.description}</p>

            <Link href={`/blog/${post.slug}`}>
              <Button className="mt-4 w-full bg-red-400 text-white">
                Read More &rarr;
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogHome;
