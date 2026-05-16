import CardExp from "./CardExp";
const Experience = () => {
    const users = [{
        name: "Christian Cumana",
        pais: "Venezuela",
        parraf: "Para alguien como yo, que no habla mucho de lo que siente, es un buen desahogo. No te soluciona la vida pero ayuda bastante cuando necesitas orientación o simplemente sentir que alguien entiende tu problema.",
        img: "/images/profile-picture-6.png"

    }, {
        name: "Gabriel Romero",
        pais: "Venezuela",
        parraf: "Me gusto mucho, la verdad no digo que sea una solución mágica, pero ayuda bastante. Me hizo pensar en cosas que ni yo habia notado sobre mi ansiedad. Me gustaría que en el futuro tuviera más opciones.",
        img: "/images/profile-picture-5.jpeg"

    },
    {
        name: "Alicia Castañeda",
        pais: "Venezuela",
        parraf: "Me encanta que es facil de usar. Como consejo deben priorizar la conexión porque uno se estresa más si tarda en responder.",
        img: "/images/profile-picture-4.png"

    },
    {
        name: "Ezeth Pérez",
        pais: "Venezuela",
        parraf: "He probado anteriormente una IA, he usado Replika, durante mis crisis me ayudó. Probé Tetobot, para ser un proyecto realizado por un joven me parecio novedoso, comparado con Replika a un es un bebé.",
        img: "/images/profile-picture-3.jpeg"

    },
    {
        name: "Sergio Guillen",
        pais: "Venezuela",
        parraf: "Es una herramienta novedosa para nosotros los que sufrimos de ansiedad. Con respecto a los detalles, en ocasiones no entendia a que te referías, habia que especificarle con mas detalles, pero en si es una aplicación funcional, cumple con lo dicho.",
        img: "/images/profile-picture-2.jpeg"

    },
    {
        name: "Angel Tapias",
        pais: "Venezuela",
        parraf: "Yo he pasado por terapia, y aunque sé que esto no reemplaza a un psicólogo, la verdad es que es un buen complemento. Hay dias en que necesito alguien con quien hablar y Teto es una opción util. Me da datos interesantes y estrategias que me han servido.",
        img: "/images/profile-picture-1.jpeg"
    }]
    return (
        <section id="experience" className=" p-5% py-16 flex flex-col items-center">
            <h1 data-aos="fade-up" className=" text-black-1 text-[2.5rem] font-medium">Experiencia de <span className=" text-green-3"> primer nivel</span></h1>
            <p data-aos="fade-up">Tetobot se dedica a brindarte la mejor experiencia posible</p>

            <div className=" columns-1 mt-8 gap-8 sm:columns-2 md:columns-3">
                {users.map((el, index) =>

                    <div
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={index * 100} // Incrementa el delay por cada elemento
                    >
                        <CardExp parraf={el.parraf} key={index} name={el.name} country={el.pais} img={el.img} />
                    </div>
                )}

            </div>
        </section>
    )
}

export default Experience;