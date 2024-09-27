import CardUse from "./CardUse";


const UseCase = () => {

    const data = [{
        title: "Apoyo emocional",
        parraf: "Experimenta el poder de la empatía y el apoyo a cargo de Tetobot.Teto está entrenado para escucharte.",
        img: '/icons/take-care.png'

    },
    {
        title: "Estrategias para el estrés",
        parraf: "Tetobot ofrece estrategias prácticas y personalizadas para manejar el estrés y la ansiedad.",
        img: '/icons/strategis.png'
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
        <section id="case-use" className=" p-5% flex flex-col items-center">
            <h1 className=" text-black-1 text-[2.5rem] mb-8 font-medium">Te ofrecemos</h1>
            <div className="flex flex-wrap justify-center">
                {data.map((el, index) =>
                    <CardUse title={el.title} parraf={el.parraf} key={index} img={el.img} />)
                }
            </div>
        </section>
    )
}

export default UseCase;