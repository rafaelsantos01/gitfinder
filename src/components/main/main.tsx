import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { Card, CardContent } from "../ui/card";
import { FaUsers } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { Label } from "../ui/label";
import { IoIosGitBranch } from "react-icons/io";
import img from "./../../assets/9919.png";

import InfoUser from "./info";
import { ModeToggle } from "../darkMode/mode-toggle";
import CardStats from "../cardStats/cardStats";

const find = z.object({
  username: z.string(),
});

type FindUsername = z.infer<typeof find>;

const baseURL = "https://api.github.com/users/";

export default function Header() {
  const [data, setData] = useState<UserGitHub>(mock);
  const { handleSubmit, register } = useForm<FindUsername>({
    resolver: zodResolver(find),
  });

  async function handleFindUsername({ username }: FindUsername) {
    await axios
      .get(`${baseURL}${username.trim()}`)
      .then((response) => {
        setData({
          ...response.data,
          created_at: new Date(response.data.created_at),
        });
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
    <div className="flex items-center justify-center md:h-screen md:mt-0 mt-4 md:mb-0 mb-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
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
                html_url={data?.html_url}
                name={data?.name}
                company={data?.company}
                blog={data?.blog}
                location={data?.location}
                public_repos={data?.public_repos}
                followers={data?.followers}
                created_at={
                  new Intl.DateTimeFormat("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }).format(data?.created_at) || "2024-01-01"
                }
              />
            </div>

            <div className="flex items-center justify-center md:max-w-xl max-w-72">
              <div className="flex justify-center items-center">
                <p className="text-center">{data?.bio}</p>
              </div>
            </div>

            <div className="md:flex md:space-x-3 md:space-y-0 space-y-2">
              <CardStats
                name={"Stars"}
                statistics={data.following | 0}
                icon={<GiStarsStack size={40} />}
              />

              <CardStats
                name={"Followers"}
                statistics={data.followers | 0}
                icon={<FaUsers size={40} />}
              />
              <CardStats
                name={"Public Repo"}
                statistics={data.public_repos | 0}
                icon={<IoIosGitBranch size={40} />}
              />
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

const mock: UserGitHub = {
  login: "",
  avatar_url: "",
  html_url: "https://github.com/rafaelsantos01",
  name: "Git Find",
  company: "N/A",
  blog: "https://github.com/rafaelsantos01",
  location: "Brusque-SC",
  email: "",
  bio: "",
  twitter_username: "",
  public_repos: 0,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: new Date(),
  updated_at: "",
};

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
  updated_at: string;
}
