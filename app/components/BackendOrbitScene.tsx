"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const serviceNodes = [
  new THREE.Vector3(-3.25, 0.44, 0.22),
  new THREE.Vector3(-1.46, 1.3, -0.7),
  new THREE.Vector3(1.42, 1.22, -0.74),
  new THREE.Vector3(3.18, 0.42, 0.16),
];

const packetPoints = Array.from({ length: 92 }, (_, index) => {
  const angle = index * 1.79;
  const radius = 2.1 + (index % 9) * 0.2;
  return new THREE.Vector3(
    Math.cos(angle) * radius,
    -0.18 + (index % 13) * 0.15,
    Math.sin(angle * 0.82) * 1.7 - 1.1,
  );
});

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
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0.28, 2.45, 8.15);
    camera.lookAt(0, 0.42, 0);

    const rig = new THREE.Group();
    rig.position.set(2.05, -0.12, 0);
    rig.rotation.x = -0.16;
    scene.add(rig);

    const floorGrid = new THREE.GridHelper(9.2, 18, "#86aaa5", "#263a38");
    floorGrid.position.y = -0.56;
    const floorMaterial = floorGrid.material as THREE.Material;
    floorMaterial.transparent = true;
    floorMaterial.opacity = 0.13;
    rig.add(floorGrid);

    const platformMaterial = new THREE.MeshBasicMaterial({
      color: "#77d4c7",
      transparent: true,
      opacity: 0.12,
    });
    [1.65, 2.35, 3.1].forEach((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.009, 10, 160),
        platformMaterial.clone(),
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -0.37 + index * 0.03;
      rig.add(ring);
    });

    const particleGeometry = new THREE.BufferGeometry().setFromPoints(packetPoints);
    const particleMaterial = new THREE.PointsMaterial({
      color: "#9be7dc",
      size: 0.027,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    });
    const packets = new THREE.Points(particleGeometry, particleMaterial);
    rig.add(packets);

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
    const coreBase = new THREE.Mesh(
      new THREE.BoxGeometry(1.82, 0.08, 1.12),
      darkMaterial,
    );
    coreBase.position.y = -0.16;
    core.add(coreBase);

    [-0.04, 0.17, 0.38, 0.59, 0.8].forEach((y, index) => {
      const slab = new THREE.Mesh(
        new THREE.BoxGeometry(1.44 - index * 0.035, 0.13, 0.9),
        serverMaterial.clone(),
      );
      slab.position.y = y;
      core.add(slab);

      const status = new THREE.Mesh(
        new THREE.BoxGeometry(0.82, 0.014, 0.025),
        accentMaterial.clone(),
      );
      status.position.set(0, y + 0.074, -0.465);
      core.add(status);
    });

    const crown = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.1, 52),
      serverMaterial.clone(),
    );
    crown.position.y = 1.0;
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
        new THREE.BoxGeometry(0.78, 0.46, 0.5),
        panelMaterial.clone(),
      );
      const header = new THREE.Mesh(
        new THREE.BoxGeometry(0.56, 0.03, 0.035),
        index % 2 === 0 ? accentMaterial.clone() : panelAccentMaterial.clone(),
      );
      const base = new THREE.Mesh(
        new THREE.BoxGeometry(0.94, 0.055, 0.58),
        darkMaterial.clone(),
      );
      const halo = new THREE.Mesh(
        new THREE.TorusGeometry(0.46, 0.006, 8, 96),
        platformMaterial.clone(),
      );
      halo.rotation.x = Math.PI / 2;
      halo.position.y = -0.29;
      header.position.set(0, 0.25, -0.27);
      base.position.set(0, -0.28, 0);
      service.add(halo, base, body, header);
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
      const middle = new THREE.Vector3(
        node.x * 0.5,
        node.y + 0.62,
        node.z - 0.34,
      );
      const curve = new THREE.CatmullRomCurve3([start, middle, node]);
      const line = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 76, 0.012, 8, false),
        arcMaterial.clone(),
      );
      const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 18, 18),
        pulseMaterial.clone(),
      );
      const secondaryPulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.034, 14, 14),
        panelAccentMaterial.clone(),
      );
      rig.add(line, pulse, secondaryPulse);
      return { curve, pulse, secondaryPulse };
    });

    const backdropMaterial = new THREE.MeshBasicMaterial({
      color: "#f3fffb",
      transparent: true,
      opacity: 0.055,
      side: THREE.DoubleSide,
    });
    [-2.25, -0.75, 0.75, 2.25].forEach((x, index) => {
      const pane = new THREE.Mesh(
        new THREE.PlaneGeometry(0.76, 1.72),
        backdropMaterial.clone(),
      );
      pane.position.set(x, 1.18 + index * 0.04, -1.12);
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

      rig.rotation.y = -0.08 + mouse.x * 0.065 + Math.sin(motion * 0.18) * 0.048;
      rig.rotation.x = -0.16 + mouse.y * 0.035;
      core.position.y = 0.02 + Math.sin(motion * 0.52) * 0.018;
      packets.rotation.y = motion * 0.045;
      packets.rotation.x = Math.sin(motion * 0.16) * 0.018;

      nodeMeshes.forEach((mesh, index) => {
        mesh.position.y =
          serviceNodes[index].y + Math.sin(motion * 0.58 + index) * 0.04;
      });

      arcs.forEach(({ curve, pulse, secondaryPulse }, index) => {
        const progress = ((motion * 0.16 + index * 0.19) % 1 + 1) % 1;
        const secondProgress = ((motion * 0.12 + index * 0.24 + 0.5) % 1 + 1) % 1;
        pulse.position.copy(curve.getPoint(progress));
        secondaryPulse.position.copy(curve.getPoint(secondProgress));
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
        if (object instanceof THREE.Points) {
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
