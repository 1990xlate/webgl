import * as THREE from './three.js-dev/build/three.module.js';
import { GUI } from "./three.js-dev/examples/jsm/libs/dat.gui.module.js";

export function ex6() {
    const gui_container = new GUI();
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		75, window.innerWidth / window.innerHeight, 
		0.1, 
		1000
		);
const canvas = document.querySelector('#c');
	 const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
  });

	const loader = new THREE.TextureLoader();
	renderer.setSize(window.innerWidth,window.innerHeight);


	const directional_light = new THREE.DirectionalLight(0xb3b3ff,1);
	directional_light.position.set(0,0,5);
	//geometry

	const geometry = new THREE.SphereGeometry();

//material
	const material = new THREE.MeshPhongMaterial({
	map: loader.load ("./tex22.jpg")
		//color: "#ccffff"
	});
	//cube

	const material1 = new THREE.MeshPhongMaterial({
color: "#ccffff"
	});

	const cube = new THREE.Mesh(geometry, material);
    const cube1 = new THREE.Mesh(geometry, material1);


	const this_group = new THREE.Group();



    let mesh;
    let mesh_arr = [];
    for (let this_z = -1; this_z < 3; this_z++) {
        for (let this_x = -1; this_x < 3; this_x++) {
            for (let this_y = -1; this_y < 3; this_y++) {
                if (Math.random() < 0.5) {
                    mesh = cube.clone();
                } else {
                    mesh = cube1.clone();
                }
                mesh.position.set(this_x * 2, this_y *2, this_z *2);
                scene.add(mesh);
                mesh_arr.push(mesh);
            }

        }

    }

	
let params = {
        zoom: 25
    };

    gui_container.add(params, 'zoom', 1, 50).step(0.005).onChange(function (value) {
        camera.position.z = value;
    });

    scene.add(directional_light);
    camera.position.z = 15;
      camera.position.x = 1;


scene.add(mesh);

	renderer.setAnimationLoop(function () {

		mesh_arr.forEach(function (mesh) {
            mesh.rotation.x += Math.PI / 180;
        });;

		

		renderer.render(scene,camera);
	});


	document.body.appendChild(renderer.domElement);

}