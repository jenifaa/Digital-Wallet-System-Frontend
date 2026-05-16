import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Toaster } from "../ui/sonner";

interface IProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: IProps) {
  return (
    <div className="">
      <Toaster />
      <Navbar></Navbar>
      <div className=" min-h-screen">{children}</div>
      <Footer></Footer>
    </div>
  );
}
