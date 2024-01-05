import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Header() {
  return (
    <div className="flex">
      <Input placeholder="Nome do usuário" />
      <Button>Buscar</Button>
    </div>
  );
}
