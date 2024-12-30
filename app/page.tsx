import BlogHome from "@/components/Home";

export const dynamic = "force-dynamic";
export const revalidate = 30;

export default function Page() {
  return (
    <main>
      <BlogHome />
    </main>
  );
}
