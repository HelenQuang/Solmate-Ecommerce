import React from "react";
import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <HomePage />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
