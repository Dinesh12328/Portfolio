"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const nodeColors = ["#86ddd1", "#c7ab72", "#98bfca", "#d49a81"];

const ambientPoints = Array.from({ length: 72 }, (_, index) => {
  const angle = index * 1.48;
  const radius = 1.9 + (index % 8) * 0.23;
  return new THREE.Vector3(
    Math.cos(angle) * radius,
    -0.84 + (index % 16) * 0.12,
    Math.sin(angle * 0.78) * 2.2,
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
    renderer.toneMappingExposure = 1.04;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0.15, 0.82, 8.35);

    const rig = new THREE.Group();
    rig.position.set(2.35, 0.02, 0);
    rig.rotation.x = -0.08;
    scene.add(rig);

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: "#dcebe6",
      emissive: "#173c38",
      emissiveIntensity: 0.12,
      metalness: 0.42,
      roughness: 0.38,
      clearcoat: 0.28,
      clearcoatRoughness: 0.34,
    });
    const darkMaterial = new THREE.MeshStandardMaterial({
      color: "#12201f",
      emissive: "#102a28",
      emissiveIntensity: 0.12,
      metalness: 0.42,
      roughness: 0.58,
    });
    const core = new THREE.Group();
    [-0.32, -0.08, 0.16, 0.4].forEach((y, index) => {
      const layer = new THREE.Mesh(
        new THREE.CylinderGeometry(0.88 - index * 0.035, 0.88, 0.15, 64),
        coreMaterial.clone(),
      );
      layer.position.y = y;
      core.add(layer);
    });
    const coreBase = new THREE.Mesh(
      new THREE.CylinderGeometry(1.08, 1.08, 0.07, 72),
      darkMaterial.clone(),
    );
    coreBase.position.y = -0.58;
    core.add(coreBase);
    rig.add(core);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: "#91e2d7",
      transparent: true,
      opacity: 0.3,
    });
    const rings = [0.08, 0.92, -0.82, 1.52].map((angle, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.0 + index * 0.46, 0.008, 12, 180),
        ringMaterial.clone(),
      );
      ring.rotation.x = angle;
      ring.rotation.y = index * 0.62;
      rig.add(ring);
      return ring;
    });

    const pointField = new THREE.Points(
      new THREE.BufferGeometry().setFromPoints(ambientPoints),
      new THREE.PointsMaterial({
        color: "#b8f1e8",
        size: 0.026,
        transparent: true,
        opacity: 0.32,
        depthWrite: false,
      }),
    );
    rig.add(pointField);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#defcf5",
      transparent: true,
      opacity: 0.26,
    });
    const connectionGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
    ]);

    const nodes = Array.from({ length: 10 }, (_, index) => {
      const angle = (index / 10) * Math.PI * 2;
      const radius = 2.34 + (index % 3) * 0.45;
      const height = index % 2 === 0 ? 0.54 : -0.48;
      const geometry =
        index % 4 === 0
          ? new THREE.BoxGeometry(0.56, 0.28, 0.36)
          : new THREE.BoxGeometry(0.34, 0.34, 0.34);
      const material = new THREE.MeshPhysicalMaterial({
        color: nodeColors[index % nodeColors.length],
        emissive: nodeColors[index % nodeColors.length],
        emissiveIntensity: 0.16,
        metalness: 0.28,
        roughness: 0.42,
        clearcoat: 0.2,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius,
      );
      rig.add(mesh);

      const glow = new THREE.Mesh(
        new THREE.TorusGeometry(0.34, 0.006, 8, 80),
        ringMaterial.clone(),
      );
      glow.rotation.x = Math.PI / 2;
      mesh.add(glow);

      const line = new THREE.Line(connectionGeometry.clone(), lineMaterial.clone());
      rig.add(line);

      const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.038, 14, 14),
        new THREE.MeshBasicMaterial({
          color: index % 2 === 0 ? "#dffcf6" : "#c8ad72",
          transparent: true,
          opacity: 0.82,
        }),
      );
      rig.add(pulse);

      return { angle, radius, height, mesh, line, pulse };
    });

    const ambientLight = new THREE.AmbientLight("#ffffff", 0.72);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight("#86ddd1", 5.6, 20);
    keyLight.position.set(3.2, 3.5, 5.2);
    scene.add(keyLight);

    const warmLight = new THREE.PointLight("#c7ab72", 2.8, 18);
    warmLight.position.set(-3.8, -0.8, 3.2);
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

      rig.rotation.y = motion * 0.09 + mouse.x * 0.09;
      rig.rotation.x = -0.08 + mouse.y * 0.045;
      core.rotation.y = motion * 0.14;
      pointField.rotation.y = motion * 0.035;

      rings.forEach((ring, index) => {
        ring.rotation.z = motion * (0.025 + index * 0.008);
      });

      nodes.forEach((node, index) => {
        const orbit = node.angle + motion * (0.062 + index * 0.003);
        const verticalPulse = Math.sin(motion * 0.84 + index) * 0.08;
        node.mesh.position.set(
          Math.cos(orbit) * node.radius,
          node.height + verticalPulse,
          Math.sin(orbit) * node.radius,
        );
        node.mesh.rotation.x = motion * 0.12;
        node.mesh.rotation.y = motion * 0.2;

        const positions = node.line.geometry.attributes.position;
        positions.setXYZ(0, 0, 0, 0);
        positions.setXYZ(
          1,
          node.mesh.position.x,
          node.mesh.position.y,
          node.mesh.position.z,
        );
        positions.needsUpdate = true;

        const pulseProgress = ((motion * 0.34 + index * 0.13) % 1 + 1) % 1;
        node.pulse.position.set(
          node.mesh.position.x * pulseProgress,
          node.mesh.position.y * pulseProgress,
          node.mesh.position.z * pulseProgress,
        );
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
      aria-label="Immersive 3D backend orbit with database core, service nodes, and data flows"
    />
  );
}
