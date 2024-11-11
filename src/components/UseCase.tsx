import CardUse from "./CardUse";


const UseCase = () => {

    const data = [{
        title: "Apoyo emocional",
        parraf: "Experimenta el poder de la empatía y el apoyo a cargo de Tetobot.Teto está entrenado para escucharte.",
        img: '/icons/emotional-support.png'

    },
    {
        title: "Estrategias para el estrés",
        parraf: "Tetobot ofrece estrategias prácticas y personalizadas para manejar el estrés y la ansiedad.",
        img: '/icons/strategy.png'
    },
    {
        title: "Conversaciones de autoayuda",
        parraf: "Conversaciones que permiten al usuario reflexionar y recibir orientación.",
        img: '/icons/conv.png'

    }
        , {
        title: "Psicoeducación",
        parraf: "Explicación de conceptos clave de una manera accesible y fácil de entender.",
        img: '/icons/education.png'

    }
        , {
        title: "Amigo virtual",
        parraf: "Es más que un simple chatbot, es un amigo virtual que siempre estara disponible para ti.",
        img: '/icons/virtual-friend.png'

    }]
    return (
        <section id="case-use" className=" p-5% flex flex-col items-center text-center">
            <h1 className=" text-black-1 text-[2.5rem] md:w-auto lg:w-[60%] mb-8 font-medium" data-aos="fade-up">Solución integral para <span className=" text-green-3">manejar la ansiedad</span></h1>
            <div className="flex flex-wrap justify-center">
                {data.map((el, index) =>

                    <div
                        className="mb-8 md:ml-5"
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={index * 100} // Incrementa el delay por cada elemento
                    >
                        <CardUse title={el.title} parraf={el.parraf} key={index} img={el.img} />
                    </div>)
                }

            </div>
        </section >
    )
}

export default UseCase;