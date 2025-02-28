import Container from "./components/Container";
import Extras from "./components/Extras";
import { TradesProvider } from "./context/TradesContext";

import "./styles/app.css";

function App() {
  return (
    <TradesProvider>
      <div className="outer-container">
        <Container />
        <Extras />
      </div>
    </TradesProvider>
  );
}

export default App;
