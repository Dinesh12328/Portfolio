"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const serviceNodes = [
  new THREE.Vector3(-2.7, 0.54, 0.2),
  new THREE.Vector3(-0.96, 1.05, -0.28),
  new THREE.Vector3(1.08, 0.9, -0.36),
  new THREE.Vector3(2.7, 0.42, 0.12),
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

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0.5, 2.1, 7.2);
    camera.lookAt(0, 0.35, 0);

    const rig = new THREE.Group();
    rig.position.set(2.15, -0.08, 0);
    rig.rotation.x = -0.12;
    scene.add(rig);

    const floorGrid = new THREE.GridHelper(7.2, 12, "#6c8f8a", "#253635");
    floorGrid.position.y = -0.42;
    const gridMaterial = floorGrid.material as THREE.Material;
    gridMaterial.transparent = true;
    gridMaterial.opacity = 0.12;
    rig.add(floorGrid);

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: "#d8e6e1",
      emissive: "#0d2c2b",
      emissiveIntensity: 0.08,
      metalness: 0.24,
      roughness: 0.62,
      clearcoat: 0.16,
    });
    const core = new THREE.Group();
    [-0.18, 0.05, 0.28].forEach((y, index) => {
      const layer = new THREE.Mesh(
        new THREE.BoxGeometry(1.08 - index * 0.05, 0.16, 0.72),
        coreMaterial,
      );
      layer.position.y = y;
      core.add(layer);
    });
    core.position.set(0, 0.14, 0);
    rig.add(core);

    const baseMaterial = new THREE.MeshStandardMaterial({
      color: "#172322",
      roughness: 0.78,
      metalness: 0.18,
    });
    const coreBase = new THREE.Mesh(
      new THREE.BoxGeometry(1.42, 0.08, 0.95),
      baseMaterial,
    );
    coreBase.position.set(0, -0.04, 0);
    rig.add(coreBase);

    const serviceMaterial = new THREE.MeshStandardMaterial({
      color: "#b8cbc6",
      emissive: "#183a38",
      emissiveIntensity: 0.1,
      metalness: 0.18,
      roughness: 0.64,
    });
    const accentMaterial = new THREE.MeshBasicMaterial({
      color: "#6fc9bd",
      transparent: true,
      opacity: 0.72,
    });

    const nodeMeshes = serviceNodes.map((node, index) => {
      const service = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.58, 0.34, 0.44),
        serviceMaterial.clone(),
      );
      const status = new THREE.Mesh(
        new THREE.BoxGeometry(0.34, 0.018, 0.03),
        accentMaterial.clone(),
      );
      status.position.set(0, 0.18, -0.23);
      service.add(body, status);
      service.position.copy(node);
      service.rotation.y = index % 2 === 0 ? 0.18 : -0.18;
      rig.add(service);
      return service;
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#c9f4ec",
      transparent: true,
      opacity: 0.22,
    });
    const linePoints: THREE.Vector3[] = [];
    serviceNodes.forEach((node) => {
      linePoints.push(new THREE.Vector3(0, 0.22, 0), node);
    });
    const serviceLines = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(linePoints),
      lineMaterial,
    );
    rig.add(serviceLines);

    const ambientLight = new THREE.AmbientLight("#ffffff", 0.82);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight("#dff8f2", 2.4);
    keyLight.position.set(3.4, 4, 5);
    scene.add(keyLight);

    const warmLight = new THREE.DirectionalLight("#c5a36a", 0.72);
    warmLight.position.set(-3.4, 1.2, 3);
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

      rig.rotation.y = -0.08 + mouse.x * 0.04 + Math.sin(motion * 0.18) * 0.025;
      rig.rotation.x = -0.12 + mouse.y * 0.025;
      core.position.y = 0.14 + Math.sin(motion * 0.55) * 0.018;

      nodeMeshes.forEach((mesh, index) => {
        mesh.position.y =
          serviceNodes[index].y + Math.sin(motion * 0.5 + index) * 0.018;
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
        if (object instanceof THREE.Line || object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="backend-orbit"
      aria-label="Subtle 3D backend architecture diagram with service and database nodes"
    />
  );
}
