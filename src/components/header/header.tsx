import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { Card, CardContent, CardTitle } from "../ui/card";
import { FaUsers } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { Label } from "../ui/label";
import { IoIosGitBranch } from "react-icons/io";
import img from "./../../assets/9919.png";

import InfoUser from "./info";

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
        <CardContent className="min-h-16 flex items-center justify-center">
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
        <CardContent className="mt-10">
          <div className="flex">
            <div>
              <img
                className="rounded-full w-36 shadow-2xl border-2 border-slate-700"
                src={data?.avatar_url || img}
              />
            </div>

            <InfoUser
              html_url={data?.html_url || "site.com"}
              name={data?.name || "Git Finder"}
              company={data?.company || ""}
              blog={data?.blog || "blog.gitfinder.com"}
              location={data?.location || "Brusque-SC"}
              public_repos={data?.public_repos || 2}
              followers={data?.followers || 50}
              created_at={data?.created_at || "2024-01-01"}
            />
          </div>

          <div className="flex  justify-center items-center my-6">
            <Label>{data?.bio}</Label>
          </div>

          <div className="flex space-x-3">
            <Card className="shadow-md">
              <CardTitle className="flex items-center justify-center mt-2">
                Followers
              </CardTitle>
              <CardContent className="justify-center items-center">
                <div className="flex justify-center">
                  <FaUsers size={40} />
                </div>
                <div>
                  <Label className="flex justify-center min-w-32">
                    {data?.followers}
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardTitle className="flex items-center justify-center mt-2">
                Stars
              </CardTitle>
              <CardContent className="justify-center items-center">
                <div className="flex justify-center">
                  <GiStarsStack size={40} />
                </div>
                <div>
                  <Label className="flex justify-center min-w-32">
                    {data?.following}
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardTitle className="flex items-center justify-center mt-2">
                Public Repo
              </CardTitle>
              <CardContent className="justify-center items-center">
                <div className="flex justify-center items-center">
                  <IoIosGitBranch size={40} />
                </div>
                <div>
                  <Label className="flex justify-center min-w-32">
                    {data?.public_repos}
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <div className="flex justify-center mb-10">
          <Button>Portifolio</Button>
        </div>
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
  created_at: string;
  updated_at: string;
}
