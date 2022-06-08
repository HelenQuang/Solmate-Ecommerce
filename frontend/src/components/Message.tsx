import React from "react";
import { Alert } from "react-bootstrap";

interface MessageProps {
  variant: string;
  children: string;
}

const Message: React.FC<MessageProps> = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
