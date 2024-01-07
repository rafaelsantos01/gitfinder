import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useTheme } from "./theme-provider";
import { useState } from "react";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [state, setState] = useState(false);

  async function changeTheme() {
    if (state) {
      setTheme("dark");
      setState(false);
    } else {
      setTheme("light");
      setState(true);
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        changeTheme();
      }}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
