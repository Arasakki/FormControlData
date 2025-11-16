import "./App.css";
import ControlDataPage from "./pages/ControlDataPage";
import ThemeProvider from "./theme/index";

function App() {
  return (
    <ThemeProvider>
      <ControlDataPage />
    </ThemeProvider>
  );
}

export default App;
