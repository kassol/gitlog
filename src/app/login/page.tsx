import { login } from "@/app/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Login(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const error = searchParams.error;
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <form action={login} className="w-[200px] flex flex-col">
        {error && <p className="text-red-400">{error}</p>}
        <Input
          className="w-full mt-4"
          name="password"
          autoComplete="off"
          type="password"
          placeholder="Access Code"
        />
        <Button className="w-full mt-4" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
