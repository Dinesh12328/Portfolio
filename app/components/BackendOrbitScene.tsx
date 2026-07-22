"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const panelPositions = [
  { position: new THREE.Vector3(-2.85, 0.35, -0.45), rotation: 0.42 },
  { position: new THREE.Vector3(-1.15, 1.35, -1.0), rotation: 0.18 },
  { position: new THREE.Vector3(1.24, 1.18, -0.96), rotation: -0.18 },
  { position: new THREE.Vector3(2.9, 0.38, -0.4), rotation: -0.42 },
];

const particlePoints = Array.from({ length: 150 }, (_, index) => {
  const layer = index % 6;
  const angle = index * 2.34;
  const radius = 1.2 + layer * 0.48;
  return new THREE.Vector3(
    Math.cos(angle) * radius,
    -0.7 + (index % 18) * 0.12,
    Math.sin(angle * 0.7) * 2.8 - 1.1,
  );
});

function makeRibbon(offset: number) {
  const points = Array.from({ length: 7 }, (_, index) => {
    const step = index / 6;
    return new THREE.Vector3(
      -3.4 + step * 6.8,
      0.12 + Math.sin(step * Math.PI * 2 + offset) * 0.52,
      -1.25 + Math.cos(step * Math.PI * 2 + offset) * 0.58,
    );
  });
  return new THREE.CatmullRomCurve3(points);
}

export function BackendOrbitScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0.25, 1.85, 7.6);
    camera.lookAt(0, 0.42, -0.8);

    const rig = new THREE.Group();
    rig.position.set(2.25, -0.04, 0);
    rig.rotation.x = -0.08;
    scene.add(rig);

    const deckMaterial = new THREE.MeshBasicMaterial({
      color: "#9be8dc",
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
    });
    const deck = new THREE.Mesh(new THREE.PlaneGeometry(7.6, 4.8, 1, 1), deckMaterial);
    deck.position.set(0, -0.8, -1.05);
    deck.rotation.x = -Math.PI / 2;
    rig.add(deck);

    const grid = new THREE.GridHelper(8.8, 18, "#92bcb6", "#263b39");
    grid.position.set(0, -0.78, -1.05);
    const gridMaterial = grid.material as THREE.Material;
    gridMaterial.transparent = true;
    gridMaterial.opacity = 0.16;
    rig.add(grid);

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: "#dcebe7",
      emissive: "#133a37",
      emissiveIntensity: 0.12,
      metalness: 0.46,
      roughness: 0.34,
      clearcoat: 0.34,
      clearcoatRoughness: 0.3,
    });
    const coreGlassMaterial = new THREE.MeshBasicMaterial({
      color: "#8de5d8",
      transparent: true,
      opacity: 0.24,
      side: THREE.DoubleSide,
    });
    const core = new THREE.Group();
    const monolith = new THREE.Mesh(new THREE.BoxGeometry(0.86, 1.72, 0.48), coreMaterial);
    const innerGlow = new THREE.Mesh(new THREE.PlaneGeometry(0.52, 1.18), coreGlassMaterial);
    innerGlow.position.set(0, 0.04, -0.252);
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.82, 0.94, 0.12, 64),
      new THREE.MeshStandardMaterial({
        color: "#101d1d",
        metalness: 0.35,
        roughness: 0.66,
      }),
    );
    base.position.y = -0.93;
    core.add(base, monolith, innerGlow);
    core.position.set(0, 0.36, -0.88);
    rig.add(core);

    const panelMaterial = new THREE.MeshPhysicalMaterial({
      color: "#d2dfdb",
      emissive: "#153936",
      emissiveIntensity: 0.1,
      transparent: true,
      opacity: 0.78,
      metalness: 0.22,
      roughness: 0.36,
      clearcoat: 0.4,
    });
    const panelLineMaterial = new THREE.MeshBasicMaterial({
      color: "#80dfd2",
      transparent: true,
      opacity: 0.78,
    });
    const panels = panelPositions.map(({ position, rotation }, index) => {
      const panel = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.58, 0.038), panelMaterial.clone());
      const topLine = new THREE.Mesh(
        new THREE.BoxGeometry(0.64, 0.026, 0.018),
        index % 2 === 0
          ? panelLineMaterial.clone()
          : new THREE.MeshBasicMaterial({
              color: "#c9ad70",
              transparent: true,
              opacity: 0.78,
            }),
      );
      const rowOne = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.018, 0.018), panelLineMaterial.clone());
      const rowTwo = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.018, 0.018), panelLineMaterial.clone());
      topLine.position.set(-0.05, 0.2, -0.034);
      rowOne.position.set(0.02, 0.02, -0.034);
      rowTwo.position.set(-0.1, -0.13, -0.034);
      panel.add(body, topLine, rowOne, rowTwo);
      panel.position.copy(position);
      panel.rotation.y = rotation;
      rig.add(panel);
      return panel;
    });

    const ribbonMaterial = new THREE.MeshBasicMaterial({
      color: "#8de5d8",
      transparent: true,
      opacity: 0.34,
    });
    const goldRibbonMaterial = new THREE.MeshBasicMaterial({
      color: "#c8ad72",
      transparent: true,
      opacity: 0.28,
    });
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: "#d9fff7",
      transparent: true,
      opacity: 0.95,
    });
    const ribbons = [0, 1.7, 3.25].map((offset, index) => {
      const curve = makeRibbon(offset);
      const mesh = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 120, index === 1 ? 0.017 : 0.012, 8, false),
        index === 1 ? goldRibbonMaterial.clone() : ribbonMaterial.clone(),
      );
      const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(index === 1 ? 0.052 : 0.042, 16, 16),
        pulseMaterial.clone(),
      );
      mesh.position.y = index * 0.18;
      pulse.position.y = index * 0.18;
      rig.add(mesh, pulse);
      return { curve, mesh, pulse, offset: index * 0.23 };
    });

    const particles = new THREE.Points(
      new THREE.BufferGeometry().setFromPoints(particlePoints),
      new THREE.PointsMaterial({
        color: "#a7eee4",
        size: 0.024,
        transparent: true,
        opacity: 0.42,
        depthWrite: false,
      }),
    );
    rig.add(particles);

    const ambientLight = new THREE.AmbientLight("#ffffff", 0.76);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight("#f0fffb", 2.9);
    keyLight.position.set(3.8, 4.8, 4.8);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight("#77dace", 5.2, 14);
    rimLight.position.set(-1.6, 1.35, 1.2);
    scene.add(rimLight);

    const warmLight = new THREE.PointLight("#c7a86e", 2.4, 12);
    warmLight.position.set(2.4, 0.85, 1.5);
    scene.add(warmLight);

    const mouse = { x: 0, y: 0 };
    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const handleResize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("pointermove", handlePointerMove);
    handleResize();

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const motion = prefersReducedMotion ? 0 : elapsed;

      rig.rotation.y = -0.08 + mouse.x * 0.075 + Math.sin(motion * 0.18) * 0.05;
      rig.rotation.x = -0.08 + mouse.y * 0.035;
      core.rotation.y = Math.sin(motion * 0.38) * 0.08;
      core.position.y = 0.36 + Math.sin(motion * 0.62) * 0.035;
      particles.rotation.y = motion * 0.048;
      particles.rotation.x = Math.sin(motion * 0.22) * 0.02;

      panels.forEach((panel, index) => {
        panel.position.y =
          panelPositions[index].position.y + Math.sin(motion * 0.55 + index) * 0.06;
      });

      ribbons.forEach(({ curve, mesh, pulse, offset }, index) => {
        mesh.rotation.z = Math.sin(motion * 0.2 + index) * 0.025;
        const progress = ((motion * (0.12 + index * 0.025) + offset) % 1 + 1) % 1;
        pulse.position.copy(curve.getPoint(progress));
        pulse.position.y += index * 0.18;
      });

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="backend-orbit"
      aria-label="Immersive 3D backend command center with data ribbons and floating panels"
    />
  );
}
