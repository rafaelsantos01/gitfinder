// import { toast } from "@/components/ui/use-toast";
// import axios from "axios";

// const baseURL = "https://api.github.com/users/";

// export const getUserData = async (username: string) => {
//   const url = `${baseURL}${username.trim()}`;
//   await axios
//     .get(url)
//     .then((response) => {
//       const userData: UserGitHub = {
//         ...response.data,
//         created_at: new Date(response.data.created_at),
//       };
//       toast({
//         description: "Usuário encontrado",
//         variant: "successful",
//       });
//       return userData;
//     })
//     .catch(() => {
//       toast({
//         description: "Usuário não encontrado",
//         variant: "destructive",
//       });
//     });
// };

// interface UserGitHub {
//   login: string;
//   avatar_url: string;
//   html_url: string;
//   name: string;
//   company: string;
//   blog: string;
//   location: string;
//   email: string;
//   bio: string;
//   twitter_username: string;
//   public_repos: number;
//   public_gists: number;
//   followers: number;
//   following: number;
//   created_at: Date;
//   updated_at: string;
// }
