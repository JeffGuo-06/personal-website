import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const PokemonPackOpening = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  let scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    controls: OrbitControls;
  let pack: THREE.Mesh, card: THREE.Mesh;
  let isZoomedIn = false;
  let isOpened = false;
  let mouseDown = false,
    lastMouseX = 0;

  useEffect(() => {
    if (mountRef.current) {
      init();
      animate();

      window.addEventListener('resize', onWindowResize);
      window.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('click', onClick);

      return () => {
        window.removeEventListener('resize', onWindowResize);
        window.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('click', onClick);
      };
    }
  }, []);

  function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    loadPack();
  }

  function loadPack() {
    const texture = new THREE.TextureLoader().load('pack_texture.jpg');
    const geometry = new THREE.BoxGeometry(1.5, 2.5, 0.2);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    pack = new THREE.Mesh(geometry, material);
    scene.add(pack);
  }

  function onMouseDown(event: MouseEvent) {
    mouseDown = true;
    lastMouseX = event.clientX;
  }

  function onMouseMove(event: MouseEvent) {
    if (!mouseDown || isZoomedIn) return;
    const deltaX = event.clientX - lastMouseX;
    pack.rotation.y += deltaX * 0.01;
    lastMouseX = event.clientX;
  }

  function onMouseUp() {
    mouseDown = false;
  }

  function onClick() {
    if (!isZoomedIn) {
      zoomIntoPack();
    } else if (!isOpened) {
      openPack();
    }
  }

  function zoomIntoPack() {
    isZoomedIn = true;
    const targetPosition = new THREE.Vector3(0, 1, 2);
    camera.position.lerp(targetPosition, 0.1);
    camera.position.set(0, 1, 2);
  }

  function openPack() {
    isOpened = true;
    revealCard();
  }

  function revealCard() {
    const texture = new THREE.TextureLoader().load('card_texture.jpg');
    const geometry = new THREE.PlaneGeometry(1.5, 2.1);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    card = new THREE.Mesh(geometry, material);
    card.position.set(0, -0.5, 0);
    card.rotation.x = Math.PI / 2;
    scene.add(card);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default PokemonPackOpening;
