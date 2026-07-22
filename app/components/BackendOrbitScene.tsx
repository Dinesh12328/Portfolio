"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const nodeColors = ["#7fd8cd", "#c5a36a", "#8db7c7", "#d18a72"];

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
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.62, 8.4);

    const rig = new THREE.Group();
    rig.position.set(2.45, 0.05, 0);
    scene.add(rig);

    const coreMaterial = new THREE.MeshStandardMaterial({
      color: "#d9ebe5",
      emissive: "#245e57",
      emissiveIntensity: 0.2,
      metalness: 0.62,
      roughness: 0.3,
    });
    const core = new THREE.Group();
    [-0.28, 0, 0.28].forEach((y, index) => {
      const layer = new THREE.Mesh(
        new THREE.CylinderGeometry(0.86 - index * 0.03, 0.86, 0.16, 56),
        coreMaterial.clone(),
      );
      layer.position.y = y;
      core.add(layer);
    });
    const coreBase = new THREE.Mesh(
      new THREE.CylinderGeometry(1.02, 1.02, 0.06, 64),
      new THREE.MeshStandardMaterial({
        color: "#1e2a2a",
        emissive: "#153633",
        emissiveIntensity: 0.22,
        metalness: 0.5,
        roughness: 0.38,
      }),
    );
    coreBase.position.y = -0.48;
    core.add(coreBase);
    rig.add(core);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: "#86d9ce",
      transparent: true,
      opacity: 0.36,
    });
    const ringAngles = [0.14, 1.06, -0.86];
    ringAngles.forEach((angle, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.0 + index * 0.64, 0.007, 12, 160),
        ringMaterial.clone(),
      );
      ring.rotation.x = angle;
      ring.rotation.y = index * 0.7;
      rig.add(ring);
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#d7fff4",
      transparent: true,
      opacity: 0.31,
    });
    const connectionGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
    ]);

    const nodes = Array.from({ length: 9 }, (_, index) => {
      const angle = (index / 9) * Math.PI * 2;
      const radius = 2.45 + (index % 3) * 0.48;
      const height = index % 2 === 0 ? 0.58 : -0.58;
      const geometry =
        index % 3 === 0
          ? new THREE.BoxGeometry(0.48, 0.26, 0.34)
          : new THREE.BoxGeometry(0.34, 0.34, 0.34);
      const material = new THREE.MeshStandardMaterial({
        color: nodeColors[index % nodeColors.length],
        emissive: nodeColors[index % nodeColors.length],
        emissiveIntensity: 0.22,
        metalness: 0.42,
        roughness: 0.34,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius,
      );
      rig.add(mesh);

      const line = new THREE.Line(
        connectionGeometry.clone(),
        lineMaterial.clone(),
      );
      rig.add(line);

      return { angle, radius, height, mesh, line };
    });

    const ambientLight = new THREE.AmbientLight("#ffffff", 0.68);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight("#7fd8cd", 6, 20);
    keyLight.position.set(3.2, 3.4, 5);
    scene.add(keyLight);

    const warmLight = new THREE.PointLight("#c5a36a", 3.2, 18);
    warmLight.position.set(-4, -1, 3);
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

      rig.rotation.y = motion * 0.12 + mouse.x * 0.1;
      rig.rotation.x = -0.1 + mouse.y * 0.06;
      core.rotation.y = motion * 0.18;

      nodes.forEach((node, index) => {
        const orbit = node.angle + motion * (0.08 + index * 0.004);
        const verticalPulse = Math.sin(motion * 1.15 + index) * 0.1;
        node.mesh.position.set(
          Math.cos(orbit) * node.radius,
          node.height + verticalPulse,
          Math.sin(orbit) * node.radius,
        );
        node.mesh.rotation.x = motion * 0.22;
        node.mesh.rotation.y = motion * 0.34;

        const positions = node.line.geometry.attributes.position;
        positions.setXYZ(0, 0, 0, 0);
        positions.setXYZ(
          1,
          node.mesh.position.x,
          node.mesh.position.y,
          node.mesh.position.z,
        );
        positions.needsUpdate = true;
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
        if (object instanceof THREE.Line) {
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
      aria-label="Animated 3D backend system with gateway, service, database, and event nodes"
    />
  );
}
