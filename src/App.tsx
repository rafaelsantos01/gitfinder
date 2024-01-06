import { ThemeProvider } from "./components/darkMode/theme-provider";
import Header from "./components/main/main";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="">
        <Header />
      </div>
    </ThemeProvider>
  );
}

export default App;
