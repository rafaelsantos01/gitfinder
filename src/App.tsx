import { ThemeProvider } from "./components/darkMode/theme-provider";
import Header from "./components/header/header";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className=" justify-center items-center">
        <Header />
      </div>
    </ThemeProvider>
  );
}

export default App;
