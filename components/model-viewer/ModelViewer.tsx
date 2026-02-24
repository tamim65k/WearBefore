"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function ModelViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ── Renderer ──────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // ── Scene & Camera ─────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 4);

    // ── Lights ─────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 5, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);
    const topLight = new THREE.PointLight(0xffffff, 0.5);
    topLight.position.set(0, 5, 0);
    scene.add(topLight);

    // ── Model group ────────────────────────────────────────────────
    const group = new THREE.Group();
    scene.add(group);

    // ── Load GLB ───────────────────────────────────────────────────
    const loader = new GLTFLoader();
    loader.load("/model.glb", (gltf) => {
      const model = gltf.scene;
      // Centre & fit the model automatically
      const box = new THREE.Box3().setFromObject(model);
      const centre = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.4 / maxDim;
      model.scale.setScalar(scale);
      model.position.sub(centre.multiplyScalar(scale));
      group.add(model);
    });

    // ── Animation loop ─────────────────────────────────────────────
    let animId: number;
    let lastTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (isHoveringRef.current) {
        const targetY = mouseRef.current.x * Math.PI * 0.8;
        const targetX = -mouseRef.current.y * Math.PI * 0.3;
        group.rotation.y += (targetY - group.rotation.y) * delta * 4;
        group.rotation.x += (targetX - group.rotation.x) * delta * 4;
      } else {
        group.rotation.y += delta * 0.4;
        group.rotation.x += (0 - group.rotation.x) * delta * 2;
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize observer ────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(container);

    // ── Mouse handlers ─────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      };
    };
    const onMouseEnter = () => {
      isHoveringRef.current = true;
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
      renderer.domElement.style.cursor = "grab";
    };
    const onMouseLeave = () => {
      isHoveringRef.current = false;
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
      renderer.domElement.style.cursor = "default";
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    // ── Cleanup ────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={mountRef} className="w-full h-full relative">
      {/* hint label */}
      <div
        ref={cursorRef}
        className="pointer-events-none absolute bottom-3 left-0 right-0 text-center transition-opacity duration-300"
        style={{ opacity: 0 }}
      >
        <span className="text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
          Move mouse to rotate
        </span>
      </div>
    </div>
  );
}
