import { ButtonShortProps } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
const LogShort = ({ text, img, url }: ButtonShortProps) => {
  return (
    <Link href={"/" + url} className=" buttonA2 mt-4 w-full flex items-center justify-center">
      <Image alt="Facebook" className="mr-4" height={24} width={24} src={`/icons/${img}`} /> {text}
    </Link>

  );

};

export default LogShort;
