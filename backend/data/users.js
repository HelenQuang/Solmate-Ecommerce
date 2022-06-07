import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Helen Quang",
    email: "helen@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Ha Quang",
    email: "ha@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
