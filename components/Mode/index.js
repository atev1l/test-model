
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import styles from '/styles/Mode.module.css'
import {useEffect, useState} from "react";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
function Mode({
                  children
              }) {
    const [target] = useState(new THREE.Vector3(-0.5, 0.1, 0));
    const [model, setModel] = useState()
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)
    useEffect(()=>{
        if (window.innerWidth > 700){
            setWidth(window.innerWidth);
        }else {
            setWidth(600);
        }
        if (window.innerHeight > 500){
            setHeight(window.innerHeight);
        }else {
            setHeight(400);
        }
    }, [width, height])
    function init(){
        const loader = new GLTFLoader();
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 120, window.innerWidth/window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.outputEncoding = THREE.sRGBEncoding;


        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.autoRotate = true;
        controls.target = target;

        const light = new THREE.PointLight(0xc4c4c4,10);
        light.position.set(900,50,500);
        scene.add(light);
        const light3 = new THREE.PointLight(0xc4c4c4,10);
        light3.position.set(1500,100,-500);
        scene.add(light3);

        renderer.setSize( width/1.5, height/1.5 );
        const container = document.getElementById( 'foxy' );
        document.body.appendChild( container );
        container.appendChild( renderer.domElement );

        // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        // const cube = new THREE.Mesh( geometry, material );
        // scene.add( cube );
        loader.load( 'fox/scene.gltf', function ( gltf ) {
            scene.add( gltf.scene );
            setModel(gltf)
        }, undefined, function ( error ) {

            console.error( error );

        } );

        camera.position.z = 5;

        const animate = function () {
            requestAnimationFrame( animate );


            renderer.render( scene, camera );
        };

        animate();
    }

    useEffect(() => {
        init()
    }, [])

    return(
        <>
            {children}
        </>
    )
}

export default Mode
