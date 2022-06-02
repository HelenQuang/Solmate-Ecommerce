import React from "react";
import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>WELCOME TO SOLMATE</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
