import React from "react";
import { Offcanvas } from "react-bootstrap";

import CartOverlays from "./CartOverlays";

interface CartOffCanvasProps {
  showCart: boolean;
  totalItems: number;
  setShowCart: (arg: boolean) => void;
}

const CartOffCanvas: React.FC<CartOffCanvasProps> = ({
  showCart,
  setShowCart,
  totalItems,
}) => {
  return (
    <Offcanvas
      show={showCart}
      placement="end"
      scroll={true}
      backdrop={true}
      onHide={() => setShowCart(false)}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <h2>Shopping Cart ({totalItems})</h2>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <CartOverlays />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartOffCanvas;
