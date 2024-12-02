import { getPostById } from "@/lib/github";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updatePost } from "@/app/lib/actions";
import { isLoggedIn } from "@/lib/auth";
import { redirect } from "next/navigation";

type Params = Promise<{ slug: string }>;

export default async function Post({ params }: { params: Params }) {
  const login = await isLoggedIn();
  if (!login) {
    redirect("/");
  }
  const slug = (await params).slug;
  const post = await getPostById(Number(slug), false);
  const updatePostById = updatePost.bind(null, post.number);
  return (
    <form
      action={updatePostById}
      className="h-full w-full flex flex-col items-center justify-center"
    >
      <Input name="title" defaultValue={post.title}></Input>
      <Textarea
        className="mt-4 flex-1"
        name="body"
        defaultValue={post.body ?? ""}
      ></Textarea>
      <Button className="mt-4" type="submit">
        Save
      </Button>
    </form>
  );
}
