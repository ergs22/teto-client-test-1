import { ButtonProps } from "@/types/types";
import Link from "next/link";
const ButtonStand = ({ text, styl, url }: ButtonProps) => {
    return (<Link href={url}> <button className={styl + " my-2"}>
        {text}
    </button ></Link >)
}

export default ButtonStand