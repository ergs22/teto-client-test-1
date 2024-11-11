import ButtonStand from "./ButtonStand";
import Image from 'next/image';

const Heroe = () => {
    const title = "Tetobot, el mejor ";
    const titleC = "acompañante virtual";
    const parraf = "Teto es un compañero virtual diseñado para escucharte, comprenderte y ofrecerte estrategias prácticas para afrontar tus problemas de ansiedad";
    return (
        <section id="about-us" className="bg-hero-pattern bg-size-hero bg-position-hero flex items-center py-[7rem]">
            <div className="flex items-center justify-center md:justify-between w-full md:px-20">
                <div className="w-[80vw] md:w-[40vw]" data-aos="fade-up">
                    <h1 className=" text-5xl md:text-5-5-xl font-5-5-xl leading-5-5-xl"> {title} <span className=" text-green-3"> {titleC} </span> </h1>
                    <p className="mb-6 mt-4"> {parraf} </p>
                    <div className="flex gap-4">
                        <ButtonStand url="signup" styl="buttonBM" text="Empezar" />
                        <ButtonStand url="login" styl="buttonA" text="Continuar interactuando" />
                    </div>
                </div>

                <div data-aos="fade-up" className="hidden md:flex md:justify-center w-[40vw] ">
                    <Image width={450} height={450} src="/images/chatbot-heroe.png" alt="chat" className="h-[30rem] w-auto" />
                </div>
            </div>
        </section>
    );
}

export default Heroe;
