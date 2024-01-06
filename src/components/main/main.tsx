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
import { ModeToggle } from "../darkMode/mode-toggle";

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
    <div className="flex items-center justify-center md:h-screen">
      <div className="space-y-4">
        <div className="flex justify-between">
          <h1 className="flex justify-center font-bold text-lg">GitFind</h1>
          <ModeToggle />
        </div>

        <Card className="shadow-xl min-h-16 items-center justify-center">
          <div className="flex items-center justify-center mt-6">
            <CardContent className="flex items-center justify-center">
              <form
                className="flex items-center justify-center"
                onSubmit={handleSubmit(handleFindUsername)}
              >
                <div className="relative">
                  <Input
                    placeholder="Search GitHub username... "
                    className="w-72 h-12"
                    {...register("username")}
                  />
                  <Button
                    type="submit"
                    className="absolute rounded-lg right-0 top-1/2 transform -translate-y-1/2 cursor-pointer px-3 mr-1"
                  >
                    Buscar
                  </Button>
                </div>
              </form>
            </CardContent>
          </div>
        </Card>

        <Card className="shadow-xl items-center justify-center flex">
          <CardContent className="mt-10 space-y-3">
            <div className="md:flex">
              <div className="flex items-center justify-center mb-2">
                <img
                  className="rounded-full w-36 shadow-2xl border-2 border-slate-700"
                  src={data?.avatar_url || img}
                />
              </div>

              <InfoUser
                html_url={data?.html_url || "site.com"}
                name={data?.name || "Git Find"}
                company={data?.company || ""}
                blog={data?.blog || "blog.gitfind.com"}
                location={data?.location || "Brusque-SC"}
                public_repos={data?.public_repos || 2}
                followers={data?.followers || 50}
                created_at={data?.created_at || "2024-01-01"}
              />
            </div>

            <div className="flex items-center justify-center md:max-w-2xl max-w-72">
              <div className="flex justify-center items-center">
                <p className="text-center">{data?.bio}</p>
              </div>
            </div>

            <div className="md:flex md:space-x-3 space-y-2">
              <Card className="shadow-md  max-w-72">
                <CardTitle className="flex items-center justify-center mt-2">
                  Followers
                </CardTitle>
                <CardContent className="justify-center items-center space-y-1">
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

              <Card className="shadow-md  max-w-72">
                <CardTitle className="flex items-center justify-center mt-2">
                  Stars
                </CardTitle>
                <CardContent className="justify-center items-center space-y-1">
                  <div className="flex justify-center">
                    <GiStarsStack size={40} />
                  </div>
                  <div className="">
                    <Label className="flex justify-center min-w-32">
                      {data?.following}
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md  max-w-72">
                <CardTitle className="flex items-center justify-center mt-2">
                  Public Repo
                </CardTitle>
                <CardContent className="justify-center items-center space-y-1">
                  <div className="flex justify-center items-center">
                    <IoIosGitBranch size={40} />
                  </div>
                  <div>
                    <Label className="flex justify-center items-center min-w-32">
                      {data?.public_repos}
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center items-center">
              <Label>
                <a
                  href="https://portifolio-react-rose-tau.vercel.app"
                  target="_blank"
                >
                  Copyright © 2024 de Rafael Pereira Dos Santos
                </a>
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
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
