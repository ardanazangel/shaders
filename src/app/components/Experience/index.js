"use client";

import * as THREE from "three";

import { Canvas } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const scaleFactor = 0.3;

function Card({ textura, ...props }) {
  const canvas = useThree();
  const shaderRef = useRef();

  const canvasWidth = canvas.viewport.width;
  const canvasHeight = canvas.viewport.height;

  let cardWidth = canvasWidth;
  let cardHeight = canvasHeight;

  // Calculamos las ratios para el uniform
  const meshRatio = cardWidth / cardHeight;
  const textureRatio = textura.image
    ? textura.image.width / textura.image.height
    : 1;

  useEffect(() => {
    if (shaderRef.current) {
      gsap.to(shaderRef.current.uniforms.uCurveStrength, {
        value: 1, // destino
        duration: 1.25, // segundos
        delay: 0.2,
        ease: "power3.inOut",
        yoyo: true,
        repeat: 1,
      });
    }
  }, []);

  return (
    <group {...props}>
      <mesh
        position={[0, -cardHeight / 2, 0]}
        rotation={[0, 0, Math.PI]}
        castShadow={true} // para que el mesh proyecte sombra
        receiveShadow={true} // para que reciba sombra
      >
        <planeGeometry args={[cardWidth, cardHeight, 64, 64]} />
        <shaderMaterial
          ref={shaderRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          side={THREE.DoubleSide}
          uniforms={{
            uColor: { value: new THREE.Color(0xff0000) },
            uCurveStrength: { value: 0.0 },
            uCurvePosition: { value: 0.7 },
            uTexture: { value: textura },
            uMeshRatio: { value: meshRatio },
            uTextureRatio: { value: textureRatio },
          }}
        />
      </mesh>
    </group>
  );
}

// language=GLSL
const vertexShader = `
varying vec2 vUv;

uniform float uCurveStrength;
uniform float uCurvePosition;

void main() {
  vUv = uv;

  vec3 pos = position;

  float curve = cos((pos.y + uCurvePosition) * 0.5) * uCurveStrength;

  pos.z += curve;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

// language=GLSL
const fragmentShader = `
uniform sampler2D uTexture;
varying vec2 vUv;

uniform float uMeshRatio;
uniform float uTextureRatio;

void main() {
  vec2 uv = vUv;

  if (uMeshRatio > uTextureRatio) {
    // Mesh más ancho que la textura: recorta verticalmente
    float scale = uTextureRatio / uMeshRatio;
    float offset = (1.0 - scale) / 2.0;
    uv.y = uv.y * scale + offset;
  } else {
    // Mesh más alto que la textura: recorta horizontalmente
    float scale = uMeshRatio / uTextureRatio;
    float offset = (1.0 - scale) / 2.0;
    uv.x = uv.x * scale + offset;
  }

  vec4 texColor = texture2D(uTexture, uv);
  gl_FragColor = texColor;
}
`;

function Experience() {
  const canvas = useThree();

  const canvasWidth = canvas.viewport.width;
  const canvasHeight = canvas.viewport.height;

  const card1 = useRef();
  const card2 = useRef();
  const card3 = useRef();
  const card4 = useRef();
  const card5 = useRef();
  const magazine = useRef();

  useEffect(() => {
    gsap.to(card1.current.rotation, {
      x: -Math.PI,
      duration: 2,
      ease: "power3.inOut",
      delay: 0.2,
    });
    gsap.to(card2.current.rotation, {
      x: -Math.PI,
      duration: 2,
      ease: "power3.inOut",
      delay: 0.4,
    });
    gsap.to(card3.current.rotation, {
      x: -Math.PI,
      duration: 2,
      ease: "power3.inOut",
      delay: 0.6,
    });
    gsap.to(card4.current.rotation, {
      x: -Math.PI,
      duration: 2,
      ease: "power3.inOut",
      delay: 0.8,
    });
    gsap.to(card5.current.rotation, {
      x: 0,
      duration: 2,
      ease: "power3.inOut",
      delay: 1,
    });

    gsap.to(magazine.current.rotation, {
      z: Math.PI,
      duration: 3.5,
      ease: "power3.inOut",
    });
    gsap.to(magazine.current.scale, {
      z: 1,
      x: 1,
      y: 1,
      duration: 3.75,
      ease: "power3.inOut",
    });
    gsap.to(magazine.current.position, {
      y: -canvasHeight / 2,
      duration: 3.5,
      ease: "power3.inOut",
    });
  }, []);

  const imagen1 = useLoader(THREE.TextureLoader, "/images/1.jpg");
  const imagen2 = useLoader(THREE.TextureLoader, "/images/2.jpg");
  const imagen3 = useLoader(THREE.TextureLoader, "/images/3.jpg");
  const imagen4 = useLoader(THREE.TextureLoader, "/images/4.jpg");
  const imagen5 = useLoader(THREE.TextureLoader, "/images/5.jpg");

  return (
    <group
      scale={[scaleFactor, scaleFactor, scaleFactor]}
      rotation={[0, 0, Math.PI / 2]}
      ref={magazine}
    >
      <Card ref={card1} textura={imagen1} />
      <Card ref={card2} textura={imagen2} rotation={[Math.PI * 0.1, 0, 0]} />
      <Card ref={card3} textura={imagen3} rotation={[Math.PI * 0.15, 0, 0]} />
      <Card ref={card4} textura={imagen4} rotation={[Math.PI * 0.2, 0, 0]} />
      <Card ref={card5} textura={imagen5} rotation={[Math.PI * 0.25, 0, 0]} />
    </group>
  );
}

export default function Escene() {
  return (
    <div id="canvas-wrapper">
      <Canvas>
        <ambientLight intensity={10} />
        <Experience />
      </Canvas>
    </div>
  );
}
