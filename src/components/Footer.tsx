import Image from "next/image"
import Link from "next/link"
const Footer = () => {
    return (
        <footer className="p-5% pt-16 pb-6">
            <section className=" flex justify-around items-center">
                <div> <Link href="/"><Image alt="logo" src="/images/logo-1.png" height={150} width={150} /></Link></div>
                <div className="hidden md:flex">
                    <Link href="#about-us"><h1 className=" text-black-2 text-base font-bold hover:text-green-3">Sobre teto</h1></Link>
                </div>

                <div className="hidden md:flex">
                    <Link href="#case-use">  <h1 className=" text-black-2 text-base font-bold hover:text-green-3">Cómo puede ayudarte</h1></Link>
                </div>
                <div className="hidden md:flex">
                    <Link href="#experience"> <h1 className=" text-black-2 text-base font-bold hover:text-green-3">Testimonios</h1></Link>
                </div>
                <div className="hidden md:flex">
                    <Link href="#FQAs"><h1 className=" text-black-2 text-base font-bold hover:text-green-3">FQAs</h1></Link>
                </div>
            </section>
            <div className=" bg-gray-2 my-16 h-[1px]"></div>
            <section className=" flex justify-center text-sm">
                <div className=" flex justify-center">
                    <p className="mr-4">Made by ergs22</p>
                    <a href="#" className=" underline underline-offset-1 hover:text-green-3 mr-4">Privacy Policy</a>
                    <a href="#" className=" underline underline-offset-1 hover:text-green-3">  Terms of Service</a>
                </div>
            </section>
        </footer>
    )
}

export default Footer