import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { Card, CardContent, CardTitle } from "../ui/card";

const find = z.object({
  username: z.string(),
});

type FindUsername = z.infer<typeof find>;

const baseURL = "https://api.github.com/users";

export default function Header() {
  const [data, setData] = useState<UserGitHub>();
  const { handleSubmit, register } = useForm<FindUsername>({
    resolver: zodResolver(find),
  });

  async function handleFindUsername({ username }: FindUsername) {
    console.log(username);
    await axios
      .get(`${baseURL}/${username}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        toast({
          description: "Usuário encontrado",
          variant: "successful",
        });
      })
      .catch(() => {
        toast({
          description: "Usuário não encontrado",
          variant: "destructive",
        });
      });
  }

  return (
    <div className=" items-center justify-center">
      <Card className="mb-9 shadow-xl">
        <CardTitle className="flex justify-center my-5">GitFinder</CardTitle>
        <CardContent className="min-h-16 flex ">
          <form
            className="flex items-center justify-center"
            onSubmit={handleSubmit(handleFindUsername)}
          >
            <Input
              placeholder="Nome do usuário"
              className="w-64 "
              {...register("username")}
            />
            <Button type="submit">Buscar</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardContent className="mt-2">
          <div className="flex">
            <div>
              <img className="rounded-full w-28" src={data?.avatar_url} />
            </div>
            <div className="ml-12 flex justify-center items-center">
              <div>
                <h1>{data?.name}</h1>
                <label>{data?.location}</label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface UserGitHub {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}
