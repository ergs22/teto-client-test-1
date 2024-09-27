import ButtonStand from "./ButtonStand";
import Image from 'next/image'

const Heroe = () => {
    const title = "Tetobot,el mejor ";
    const titleC = "acompañante virtual";
    const parraf = "Acompañamiento emocional a tu alcance. Teto, es un compañero virtual diseñado para escucharte, comprenderte y ofrecerte estrategias prácticas para manejar la ansiedad"
    return (
        <section id="about-us" className=" bg-hero-pattern bg-size-hero bg-position-hero flex justify-center items-center p-section">
            <div className=" flex items-center ">
                <div className="md:ml-16 ml-0 w-[80vw] md:w-[40vw]">
                    <h1 className=" text-5xl md:text-5-5-xl  font-5-5-xl leading-5-5-xl"> {title} <span className=" text-green-3"> {titleC} </span> </h1>
                    <p className=" mb-8 mt-7"> {parraf} </p>
                    <div>
                        <ButtonStand url="signup" styl="buttonBM" text="Empezar" />
                        <ButtonStand url="login" styl="buttonA" text="Continuar interactuando" />
                    </div>
                </div>

                <div className="ml-12  hidden md:block w-[30vw] opacity-100 transform translate-x-0 translate-y-0 scale-x-100 scale-y-100 rotate-x-0 rotate-y-0 rotate-z-0 skew-x-0 skew-y-0 preserve-3d">
                    <Image width={450} height={450} src="/images/chatbot-heroe.png" alt="chat" />
                </div>
            </div>

        </section>
    )
}

export default Heroe;