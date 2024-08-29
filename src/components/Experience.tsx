import CardExp from "./CardExp";
const Experience = () => {
    const users = [{
        name: "Carlo Andres",
        pais: "Venezuela",
        parraf: "Me hizo sentir de maravilla, al rato ya estaba calmado.",
        img: "/images/profile-picture-6.jpg"

    }, {
        name: "Rafael Martínez",
        pais: "México",
        parraf: "¡Tetobot ha sido una verdadera bendición! Siempre está ahí para escucharme y brindarme estrategias efectivas para manejar mi ansiedad.",
        img: "/images/profile-picture-5.png"

    },
    {
        name: "Solangel Fernández",
        pais: "Argentina",
        parraf: "Gracias a Tetobot, he aprendido a entender mejor mis emociones y a desarrollar habilidades de afrontamiento que han mejorado mi bienestar general.",
        img: "/images/profile-picture-4.png"

    },
    {
        name: "Isabela Gómez",
        pais: "Colombia",
        parraf: "Tetobot es más que un simple chatbot, es un amigo virtual que me ha acompañado en los momentos más difíciles. Su apoyo emocional ha sido invaluable.",
        img: "/images/profile-picture-3.png"

    },
    {
        name: "Mateo Sánchez",
        pais: "Perú",
        parraf: "Gracias a la psicoeducación de Tetobot, ahora entiendo mejor los trastornos de ansiedad y cuento con las herramientas necesarias para manejarlos.",
        img: "/images/profile-picture-2.png"

    },
    {
        name: "Valentina Ramírez",
        pais: "Chile",
        parraf: "Tetobot ha sido un compañero fundamental en mi proceso de crecimiento personal. Sus conversaciones de autoayuda me han ayudado a reflexionar y a encontrar mi propio camino.",
        img: "/images/profile-picture-1.png"
    }]
    return (
        <section id="experience" className=" p-section flex flex-col items-center">
            <h1 className=" text-black-1 text-[2.5rem] font-medium">Experiencia de primer nivel</h1>
            <p>Tetobot se dedica a brindarte la mejor experiencia posible.</p>

            <div className=" columns-1 mt-8 gap-8 sm:columns-2 md:columns-3">
                {users.map((el, index) =>
                    <CardExp parraf={el.parraf} key={index} name={el.name} country={el.pais} img={el.img} />
                )}

            </div>
        </section>
    )
}

export default Experience;