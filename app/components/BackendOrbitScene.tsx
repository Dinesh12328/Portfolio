"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const serviceNodes = [
  new THREE.Vector3(-2.95, 0.32, 0.05),
  new THREE.Vector3(-1.24, 1.1, -0.44),
  new THREE.Vector3(1.2, 1.02, -0.5),
  new THREE.Vector3(2.92, 0.34, 0.02),
];

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
    renderer.toneMappingExposure = 1.02;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 100);
    camera.position.set(0.35, 2.35, 7.6);
    camera.lookAt(0, 0.42, 0);

    const rig = new THREE.Group();
    rig.position.set(2.05, -0.1, 0);
    rig.rotation.x = -0.14;
    scene.add(rig);

    const floorGrid = new THREE.GridHelper(7.8, 14, "#86aaa5", "#243735");
    floorGrid.position.y = -0.48;
    const floorMaterial = floorGrid.material as THREE.Material;
    floorMaterial.transparent = true;
    floorMaterial.opacity = 0.13;
    rig.add(floorGrid);

    const platformMaterial = new THREE.MeshBasicMaterial({
      color: "#77d4c7",
      transparent: true,
      opacity: 0.12,
    });
    [1.85, 2.78].forEach((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.009, 10, 160),
        platformMaterial.clone(),
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -0.31 + index * 0.02;
      rig.add(ring);
    });

    const serverMaterial = new THREE.MeshPhysicalMaterial({
      color: "#dbe9e5",
      emissive: "#0c2f2d",
      emissiveIntensity: 0.07,
      metalness: 0.32,
      roughness: 0.42,
      clearcoat: 0.2,
      clearcoatRoughness: 0.44,
    });
    const darkMaterial = new THREE.MeshStandardMaterial({
      color: "#111d1d",
      metalness: 0.28,
      roughness: 0.72,
    });
    const accentMaterial = new THREE.MeshBasicMaterial({
      color: "#7ed9cd",
      transparent: true,
      opacity: 0.82,
    });

    const core = new THREE.Group();
    const coreBase = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.08, 1.0), darkMaterial);
    coreBase.position.y = -0.12;
    core.add(coreBase);

    [-0.02, 0.2, 0.42, 0.64].forEach((y, index) => {
      const slab = new THREE.Mesh(
        new THREE.BoxGeometry(1.34 - index * 0.035, 0.14, 0.82),
        serverMaterial.clone(),
      );
      slab.position.y = y;
      core.add(slab);

      const status = new THREE.Mesh(
        new THREE.BoxGeometry(0.72, 0.014, 0.025),
        accentMaterial.clone(),
      );
      status.position.set(0, y + 0.078, -0.424);
      core.add(status);
    });

    const crown = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.45, 0.1, 52),
      serverMaterial.clone(),
    );
    crown.position.y = 0.86;
    core.add(crown);
    core.position.set(0, 0.02, 0);
    rig.add(core);

    const panelMaterial = new THREE.MeshPhysicalMaterial({
      color: "#c9d8d3",
      emissive: "#173b38",
      emissiveIntensity: 0.1,
      metalness: 0.18,
      roughness: 0.5,
      transparent: true,
      opacity: 0.9,
      clearcoat: 0.28,
    });
    const panelAccentMaterial = new THREE.MeshBasicMaterial({
      color: "#c8b177",
      transparent: true,
      opacity: 0.8,
    });
    const nodeMeshes = serviceNodes.map((node, index) => {
      const service = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.68, 0.4, 0.46),
        panelMaterial.clone(),
      );
      const header = new THREE.Mesh(
        new THREE.BoxGeometry(0.48, 0.028, 0.035),
        index % 2 === 0 ? accentMaterial.clone() : panelAccentMaterial.clone(),
      );
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.055, 0.54), darkMaterial.clone());
      header.position.set(0, 0.22, -0.25);
      base.position.set(0, -0.24, 0);
      service.add(base, body, header);
      service.position.copy(node);
      service.rotation.y = index < 2 ? 0.28 : -0.28;
      rig.add(service);
      return service;
    });

    const arcMaterial = new THREE.MeshBasicMaterial({
      color: "#d7fff6",
      transparent: true,
      opacity: 0.18,
    });
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: "#8de5d8",
      transparent: true,
      opacity: 0.86,
    });
    const arcs = serviceNodes.map((node) => {
      const start = new THREE.Vector3(0, 0.42, 0);
      const middle = new THREE.Vector3(node.x * 0.5, node.y + 0.38, node.z - 0.16);
      const curve = new THREE.CatmullRomCurve3([start, middle, node]);
      const line = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 52, 0.009, 8, false),
        arcMaterial.clone(),
      );
      const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 16, 16),
        pulseMaterial.clone(),
      );
      rig.add(line, pulse);
      return { curve, pulse };
    });

    const backdropMaterial = new THREE.MeshBasicMaterial({
      color: "#f3fffb",
      transparent: true,
      opacity: 0.055,
      side: THREE.DoubleSide,
    });
    [-1.65, 0.0, 1.65].forEach((x, index) => {
      const pane = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 1.5), backdropMaterial.clone());
      pane.position.set(x, 1.1 + index * 0.05, -0.92);
      pane.rotation.y = 0.08 - index * 0.08;
      rig.add(pane);
    });

    const ambientLight = new THREE.AmbientLight("#ffffff", 0.78);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight("#ecfffb", 2.75);
    keyLight.position.set(3.5, 4.3, 5.4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight("#71d6ca", 1.05);
    rimLight.position.set(-3.8, 1.8, 2.2);
    scene.add(rimLight);

    const warmLight = new THREE.PointLight("#c9aa70", 2.1, 12);
    warmLight.position.set(0.4, 1.1, 2.8);
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

      rig.rotation.y = -0.08 + mouse.x * 0.055 + Math.sin(motion * 0.16) * 0.035;
      rig.rotation.x = -0.14 + mouse.y * 0.03;
      core.position.y = 0.02 + Math.sin(motion * 0.52) * 0.018;

      nodeMeshes.forEach((mesh, index) => {
        mesh.position.y = serviceNodes[index].y + Math.sin(motion * 0.48 + index) * 0.026;
      });

      arcs.forEach(({ curve, pulse }, index) => {
        const progress = ((motion * 0.1 + index * 0.19) % 1 + 1) % 1;
        pulse.position.copy(curve.getPoint(progress));
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
        if (object instanceof THREE.Mesh) {
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
      aria-label="Professional 3D backend architecture scene with server, service, and data flow elements"
    />
  );
}
