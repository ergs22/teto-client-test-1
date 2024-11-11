// src/app/ClientAOS.tsx
"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ClientAOS = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Duración de la animación en milisegundos
            easing: "ease", // Tipo de transición
            once: true,     // Ejecuta solo una vez la animación al hacer scroll
        });
    }, []);

    return null; // No renderiza nada visible
};

export default ClientAOS;
