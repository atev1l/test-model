import * as THREE from "three";
import * as dat from 'dat.gui';
import gsap from "gsap";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import {useEffect, useState} from "react";
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
function Bruno({
                  children
              }) {
    const parameters = {
        color: 0xffff00,
        spin: () => {
            gsap.to(mesh.rotation, {duration: 1, y: mesh.rotation.y + 10})
        }
    };
    const scene = new THREE.Scene()
    const gui = new dat.GUI();
    // gui.hide()
    const loadingManager = new THREE.LoadingManager()
    const textureLoader = new THREE.TextureLoader(loadingManager)
    const shadowTexture = textureLoader.load('textures/bakedShadow.jpg')
    const simpleTexture = textureLoader.load('textures/simpleShadow.jpg')

    // const textureLoad = new THREE.TextureLoader()
    // const matcapTexture = textureLoader.load('textures/matcaps/3.png')
    // const fontLoader = new FontLoader()
    // fontLoader.load(
    //     '/fonts/helvetiker_regular.typeface.json',
    //     (font) => {
    //         const textGeometry = new TextGeometry('Mudak ebanyy', {
    //             font: font,
    //             size: 0.5,
    //             height: 0.2,
    //             curveSegments: 12,
    //             bevelEnabled: true,
    //             bevelThickness: 0.03,
    //             bevelSize: 0.02,
    //         })
    //         textGeometry.computeBoundingBox()
    //         textGeometry.center()
    //         const textMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture})
    //         const text = new THREE.Mesh(textGeometry, textMaterial)
    //         scene.add(text)
    //     })

    // Temporary sphere
    const boxGeometry = new THREE.SphereBufferGeometry(1, 32, 32)
    const boxMaterial = new THREE.MeshStandardMaterial( { color: 0xdddddd, specular: 0x999999, shininess: 15, shading: THREE.FlatShading } );
    const box = new THREE.Mesh( boxGeometry, boxMaterial );
    box.castShadow = true;
    box.position.y = 1.5
    scene.add( box );

    const sphere = new THREE.Mesh(
        new THREE.SphereBufferGeometry(1, 32, 32),
        new THREE.MeshStandardMaterial({ roughness: 0.7 })
    )
    sphere.position.y = 1.5
    // scene.add(sphere)

    // Floor
    const floor = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(20, 20),
        new THREE.MeshBasicMaterial({ map: shadowTexture })
    )
    floor.rotation.x = - Math.PI * 0.5
    floor.position.y = 0
    floor.receiveShadow = true;
    scene.add(floor)

    const light = new THREE.PointLight( 0xffffff, 1, 100 );
    light.position.set( 4, 12, 0 );
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    light.shadow.camera.left = 500
    scene.add( light );

    const ambientLight = new THREE.AmbientLight( 0x151515 ); // soft white light
    scene.add( ambientLight );

    // gui
    //     .addColor(parameters, 'color')
    //     .onChange(() => {
    //         material.color.set(parameters.color)
    //     })
    // gui
    //     .add(hemLight, 'intensity')
    //     .min(0)
    //     .max(1)
    //     .step(0.001)
    //
    //
    // gui
    //     .add(mesh.position, 'y')
    //     .min(-3)
    //     .max(3)
    //     .step(0.01)
    //     .name('sosi')
    //
    // gui
    //     .add(mesh, 'visible')
    // gui
    //     .add(material, 'wireframe')
    const cursor = {
        x: 0,
        y: 0
    }

    const axesHelper = new THREE.AxesHelper()
    scene.add(axesHelper)

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('mousemove', (event)=>{
        cursor.x = event.clientX / sizes.width - 0.5
        cursor.y = - (event.clientY / sizes.height - 0.5)
    })

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.position.z = 6
    camera.position.y = 5
    camera.position.x = 1
    camera.lookAt(box.position);
    scene.add(camera)

    //resize
    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        renderer.setSize(sizes.width, sizes.height)
    })


    const group = new THREE.Group()
    // scene.add(group)

    const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1, 2, 2, 2),
        new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    )

    group.add(cube1)

    const canvas = document.querySelector('.webgl')
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })

    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(sizes.width, sizes.height)
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //clock
    const clock = new THREE.Clock()

    // gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
    // gsap.to(mesh.position, { duration: 1, delay: 2, x: -2 })

    //animation
    const tick = () => {
        // //time
        const elapsedTime = clock.getElapsedTime()
        //
        // //update objects
        // mesh.position.y = Math.sin(elapsedTime)
        box.rotation.y = elapsedTime / 2
        box.rotation.z = elapsedTime / 2
        //
        // camera.position.x = Math.sin(cursor.x)
        // camera.position.z = Math.cos(cursor.x)
        // camera.lookAt(mesh.position)
        controls.update()
        renderer.render(scene, camera)
        window.requestAnimationFrame(tick)
    }

    tick()
    return(
        <>
            {children}
        </>
    )
}

export default Bruno
