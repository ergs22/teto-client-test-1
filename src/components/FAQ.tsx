import CardFAQ from "./CardFAQ";
const FAQ = () => {
    const datab = [{ title: "¿Cómo se define un chatbot?", parraf: "Un chatbot es un programa de inteligencia artificial diseñado para simular conversaciones con usuarios a través de texto o voz. Su función principal es automatizar la comunicación, proporcionando respuestas rápidas y eficaces a preguntas frecuentes y ayudando en tareas específicas." },
    {
        title: "¿De qué manera puede un chatbot ayudar a gestionar un ataque de ansiedad?", parraf: "Un chatbot puede ayudar a gestionar un ataque de ansiedad proporcionando apoyo inmediato y accesible, guiando al usuario a través de técnicas de respiración y ejercicios de atención plena para calmar la mente y el cuerpo."
    },
    { title: "¿Qué tipo de preguntas puede responder Tetobot?", parraf: "Tetobot puede responder a diversas preguntas relacionadas con la ansiedad, tales como síntomas comunes, técnicas de manejo del estrés y recursos de apoyo. Además, proporciona información sobre los trastornos de ansiedad más frecuentes, ofreciendo orientación para ayudar a los usuarios a entender y gestionar mejor su situación." },
    { title: "¿Puede un chatbot reemplazar la terapia psicológica?", parraf: "No, un chatbot no puede reemplazar la terapia psicológica. Aunque puede ser una herramienta complementaria útil." },
    { title: "¿Puede un chatbot reemplazar a un psicólogo o psiquiatra?", parraf: "No, un chatbot no puede sustituir a un psicólogo o psiquiatra. Si bien puede ofrecer apoyo general y consejos, no tiene la habilidad de realizar evaluaciones clínicas, ni establecer diagnósticos." }]

    return (
        <section id="FQAs" className=" p-5% py-16 flex flex-col items-center">
            <h1 className=" text-black-1 text-[2.5rem] font-medium">Preguntas frecuentes</h1>
            <p>Aquí encontrarás respuestas a algunas de las consultas más comunes</p>

            <div className=" mt-8 ">
                {datab.map((el, index) => (
                    <CardFAQ key={index} info={el.parraf} name={el.title} />
                ))}

            </div>
        </section>
    )
}

export default FAQ;