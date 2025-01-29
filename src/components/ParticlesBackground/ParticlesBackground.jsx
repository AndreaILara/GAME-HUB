import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // Usa la versión optimizada
import "./ParticlesBackground.css";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    fullScreen: {
      enable: false, // Para que no sobrescriba el fondo
    },
    background: {
      color: "transparent", // Evitar que cubra el fondo
    },
    particles: {
      number: {
        value: 100,
      },
      color: {
        value: "#ff007f",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.3, // Ajustar opacidad para no saturar
      },
      size: {
        value: 3,
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        outModes: {
          default: "out",
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        repulse: {
          distance: 100,
        },
        push: {
          quantity: 4,
        },
      },
    },
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesOptions}
      className="particles-container"
    />
  );
};

export default ParticlesBackground;
