import ButtonStand from "./ButtonStand";
import Image from 'next/image'

const GetNow = () => {
    return (
        <section className="w-screen p-5% py-16 ">
            <div className="bg-hero-pattern rounded-xl-exten bg-size-hero bg-position-hero flex justify-center p-section">
                <div className="w-[70vw] text-center" data-aos="fade-up" >
                    <h1 className=" text-5xl md:text-5-5-xl font-5-5-xl leading-5-5-xl">Tu compañero virtual para el
                        <span className=" text-green-3"> bienestar emocional</span> </h1>
                    <p className="mb-8 mt-7">Nuestro objetivo es brindarte una solución que aborde tus necesidades emocionales de manera personalizada. Nuestro chatbot está entrenado para tener conversaciones empáticas y cercanas</p>
                    <div>
                        <ButtonStand url="/signup" styl="buttonBM" text="Empezar" />
                        <ButtonStand url="/login" styl="buttonA" text="Continuar interactuando" />
                    </div>
                </div>

            </div>

        </section>
    )
}

export default GetNow