import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Html, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Section } from "./section";

import { proxy, useSnapshot } from "valtio";
import { gsap, Expo } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  defaults: { ease: "power1.out" },
});

const Lights = () => {
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      <ambientLight intensity={5.5} />
      {/* Diretion light */}
      <directionalLight position={[150, 50, -500]} intensity={3.5} />
      <directionalLight
        castShadow
        position={[-10, 10, 0]}
        intensity={3.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Spotlight Large overhead light */}
      <spotLight intensity={3.5} position={[1000, 0, 0]} castShadow />
    </>
  );
};

function Green() {
  const { nodes, materials } = useGLTF("/difuserfinal.glb");
  const cup = useRef();
  const moon = useRef();

  // for demonstrating first eye is same as second eye
  // Output: false, true=

  useEffect((state) => {
    // cup.current.rotation.y = 6.2;
    // cup.current.rotation.x = 5;

    // tl.from(
    //   "#main-canvas",
    //   3,
    //   {
    //     y: 500,
    //     ease: Expo.easeInOut,
    //   },
    //   -2
    // );

    tl.from(moon.current.position, 3, {
      y: 300,
      ease: Expo.easeInOut,
    });
    tl.from(
      moon.current.rotation,
      60,
      {
        y: 7.26573,
        ease: "none",
        repeat: -1,
      },
      -3
    );

    ScrollTrigger.create({
      trigger: ".wrap",

      scrub: 5,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // cup.current.rotation.x = -0.2 * Math.PI * self.progress;
        // cup.current.rotation.y = -2 * Math.PI * self.progress;
        // cup.current.rotation.z = -2 * Math.PI * self.progress;
        // cup.current.position.y = -2 * self.progress;
        // cup.current.position.x = 6 * self.progress;
        // cup.current.position.y = -2 * self.progress;
      },
    });
  });

  ScrollTrigger.clearScrollMemory();
  return (
    <>
      <group
        ref={moon}
        scale={12}
        position={[0, 190, 0]}
        dispose={null}
        rotation={[250, 0, 0]}
      >
        {/* <primitive object={firstGltf.scene} position={[0, 185, 0]} /> */}
        <group position={[0, -3, 0]}>
          <mesh
            geometry={nodes.Plane002.geometry}
            material={materials["Material.001"]}
          />
          <mesh
            geometry={nodes.Plane001.geometry}
            material={materials["Material.001"]}
          />
          <mesh
            geometry={nodes.Cube.geometry}
            material={materials.Material}
            position={[-0.14, 1.26, 0.82]}
            scale={0.26}
          />
          <mesh
            geometry={nodes.Cube001.geometry}
            material={materials.Material}
            position={[0.11, 0.74, 0.82]}
            rotation={[0, 0, -3.14]}
            scale={0.26}
          />
          <mesh
            geometry={nodes.Cube005.geometry}
            material={materials.lamp}
            position={[0.05, 3.11, 0.65]}
            scale={0.5}
          />
        </group>
      </group>
    </>
  );
}

const HTMLContent = ({ products }) => {
  return (
    <Section factor={1.5} offset={1}>
      {/* <group
        ref={ref}
        scale={50}
        position={[60, 185, 0]}
        dispose={null}
        // onPointerOver={(e) => (
        //   e.stopPropagation(), set(e.object.material.name)
        // )}
        // onPointerOut={(e) => e.intersections.length === 0 && set(null)}
        // onPointerMissed={() => (state.current = null)}
        // onClick={(e) => (
        //   e.stopPropagation(), (state.current = e.object.material.name)
        // )}
      >
        {/* <group position={[0.06, 9.41, -0.23]} rotation={[0, 0.87, 0]}>
          <mesh
            geometry={nodes.Plane.geometry}
            material={materials.MatPadren}
            position={[-0.06, -9.35, 0.39]}
            rotation={[0, -1.57, 0]}
            scale={20.84}
          />
        </group> */}
      {/* <group ref={cup} position={[0, 5, 0]} rotation={[250, 0, 0]}>
          <mesh
            geometry={nodes.Round007.geometry}
            material={materials["Ring Material.001"]}
            position={[-0.01, 1.49, 0]}
            scale={30.58}
          />
          <mesh
            geometry={nodes.Round.geometry}
            material={materials["Diamond.001"]}
            material-color={"#00ff00"}
            position={[-0.01, 2.38, 0]}
            scale={[3.64, 3.63, 3.64]}
          />
        </group>
      </group> */}

      {/* <mesh scale={25} position={[0, -18, 0]}>
          <Model />
          <meshMatcapMaterial map={colorMap} attachArray="material" />
        </mesh> */}
      <Green />
      {/* <Pink />
      <White /> */}
      <Html fullscreen></Html>
    </Section>
  );
};

// function Picker() {
//   const snap = useSnapshot(state);
//   return (
//     <div>
//       <HexColorPicker
//         className="picker"
//         color={snap.items[snap.current]}
//         onChange={(color) => (state.items[snap.current] = color)}
//       />
//       <h1>{snap.current}</h1>
//     </div>
//   );
// }

function Dolly() {
  // This one makes the camera move in and out
  useFrame(({ clock, camera }) => {
    camera.position.z = 25 + Math.sin(clock.getElapsedTime()) * 2;
  });
  return null;
}

export default function Hero({ products }) {
  return (
    <>
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
        }}
        id="main-canvas"
        linear
        colorManagment
        camera={{ position: [0, 380, 30], fov: 25, far: 500 }}
      >
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent products={products} />
        </Suspense>
        <Dolly />
      </Canvas>
    </>
  );
}

useGLTF.preload("/difuserfinal.glb");
