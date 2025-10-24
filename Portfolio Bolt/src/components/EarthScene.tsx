import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../styles/earth.css';

const EarthScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef<THREE.Points[]>([]);
  const meteorsRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    const earthGeometry = new THREE.SphereGeometry(1.5, 64, 64);

    const earthTexture = new THREE.TextureLoader().load(
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxZTNhOGEiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzJkNWRhZiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzFhMzM3ZSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+'
    );

    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpScale: 0.05,
      specular: new THREE.Color(0x333333),
      shininess: 10,
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    earthRef.current = earth;

    const cityLightsGeometry = new THREE.SphereGeometry(1.51, 64, 64);
    const cityLightsMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff88,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    const cityLights = new THREE.Mesh(cityLightsGeometry, cityLightsMaterial);
    earth.add(cityLights);

    const starGroups = 3;
    for (let g = 0; g < starGroups; g++) {
      const starGeometry = new THREE.BufferGeometry();
      const starCount = 800;
      const positions = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);

      for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
        sizes[i] = Math.random() * 2 + 0.5;
      }

      starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      });

      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
      starsRef.current.push(stars);
    }

    const meteorCount = 8;
    for (let i = 0; i < meteorCount; i++) {
      const meteorGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const meteorMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffaa,
        transparent: true,
        opacity: 0.9,
      });
      const meteor = new THREE.Mesh(meteorGeometry, meteorMaterial);

      meteor.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );

      (meteor as any).velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );

      scene.add(meteor);
      meteorsRef.current.push(meteor);
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);

      if (earthRef.current) {
        earthRef.current.rotation.y += 0.001;
        earthRef.current.rotation.y += mouseRef.current.x * 0.001;
        earthRef.current.rotation.x += mouseRef.current.y * 0.0005;
      }

      starsRef.current.forEach((stars, index) => {
        stars.rotation.y += 0.0001 * (index + 1);
        stars.rotation.x += 0.00005 * (index + 1);

        const positions = stars.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          const dx = positions[i] - mouseRef.current.x * 10;
          const dy = positions[i + 1] - mouseRef.current.y * 10;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 5) {
            const force = (5 - distance) * 0.01;
            positions[i] += dx * force;
            positions[i + 1] += dy * force;
          }
        }
        stars.geometry.attributes.position.needsUpdate = true;
      });

      meteorsRef.current.forEach((meteor) => {
        const velocity = (meteor as any).velocity as THREE.Vector3;
        meteor.position.add(velocity);

        const dx = meteor.position.x - mouseRef.current.x * 10;
        const dy = meteor.position.y - mouseRef.current.y * 10;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 8) {
          const force = (8 - distance) * 0.002;
          meteor.position.x += dx * force;
          meteor.position.y += dy * force;
        }

        if (Math.abs(meteor.position.x) > 25 ||
            Math.abs(meteor.position.y) > 25 ||
            Math.abs(meteor.position.z) > 25) {
          meteor.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          );
        }
      });

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer?.dispose();
    };
  }, []);

  return <div ref={containerRef} className="earth-canvas" />;
};

export default EarthScene;
