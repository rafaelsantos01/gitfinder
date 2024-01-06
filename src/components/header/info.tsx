import { FaLocationDot } from "react-icons/fa6";
import { BsCalendar2Date } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";
import { GoOrganization } from "react-icons/go";
import { TbWorldWww } from "react-icons/tb";
import { FaGithub } from "react-icons/fa6";
import { Label } from "../ui/label";

export default function InfoUser(data: IRequest) {
  return (
    <div className="ml-12 flex justify-center items-center">
      <div className="space-y-2">
        <div className="flex space-x-1  items-center">
          <FaUserLarge />
          <Label>{data?.name}</Label>
        </div>

        <div className="flex space-x-1  items-center">
          <FaLocationDot />
          <Label>{data?.location}</Label>
        </div>

        <div className="flex space-x-1  items-center">
          <BsCalendar2Date />
          <Label>{data?.created_at}</Label>
        </div>

        <div className="flex space-x-1  items-center hover:underline">
          <FaGithub />
          <Label>
            <a href={data?.html_url} target="_">
              GitHub
            </a>
          </Label>
        </div>

        {data?.blog && (
          <div className="flex space-x-1  items-center hover:underline">
            <TbWorldWww />
            <Label>
              <a href={data.blog} target="_blank">
                Portfolio
              </a>
            </Label>
          </div>
        )}

        {data?.company && (
          <div className="flex space-x-1  items-center">
            <GoOrganization />
            <Label>{data?.company}</Label>
          </div>
        )}
      </div>
    </div>
  );
}

interface IRequest {
  html_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  public_repos: number;
  followers: number;
  created_at: string;
}
