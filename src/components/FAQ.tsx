import CardFAQ from "./CardFAQ";
const FAQ = () => {
    const datab = [{ title: "¿Qué es un chatbot?", parraf: "Es una herramienta que automatiza respuestas a consultas repetitivas, brindando información rápida y accesible a los usuarios" },
    { title: "¿Cómo puede ayudar un chatbot a manejar un ataque de ansiedad?", parraf: "Proporcionando técnicas de respiración, consejos para la relajación y recursos para gestionar un ataque de ansiedad" },
    { title: "¿Qué tipo de preguntas puede responder?", parraf: "Preguntas frecuentes sobre ansiedad puede abordar consultas sobre síntomas de ansiedad, técnicas de manejo del estrés, recursos de apoyo, información sobre trastornos de ansiedad comunes, entre otros" },
    { title: "¿Sustituye la terapia?", parraf: "No, no pueden reemplazar la terapia tradicional. Aunque pueden ser una herramienta complementaria útil" },
    { title: "¿Sustituye a un profesional de la salud mental?", parraf: "No, no pueden reemplazar a los profesionales de la salud mental. Si bien los chatbots pueden brindar apoyo, no pueden diagnosticar, tratar o hacer un seguimiento de condiciones de salud mental complejas" }]

    return (
        <section id="FQAs" className=" p-section flex flex-col items-center">
            <h1 className=" text-black-1 text-[2.5rem] font-medium">Preguntas frecuentes</h1>
            <p>Si tienes alguna, aquí encontrarás respuestas a algunas de las consultas más comunes</p>

            <div className=" mt-8 ">
                {datab.map((el, index) => (
                    <CardFAQ key={index} info={el.parraf} name={el.title} />
                ))}

            </div>
        </section>
    )
}

export default FAQ;