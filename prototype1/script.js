import * as THREE from "three"

/***********
 ** SCENE **
 ***********/
//Canvas
const canvas = document.querySelector('.webgl')

//Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('black')

//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0,0,5)


//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)

/************
 ** MESHES **
 ************/
// testSphere
const sphereGeometry = new THREE.SphereGeometry(1);
const sphereMaterial = new THREE.MeshNormalMaterial();
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial );

scene.add(testSphere)

// testBox
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(boxGeometry, boxMaterial);

scene.add(box);
box.position.x = 2;

/********************
 ** ANIMATION LOOP ** 
 ********************/
const clock = new THREE.Clock()

const animation = () =>
{
    // Return elapsedtime
    const elapsedTime = clock.getElapsedTime()

    // Animate testSphere
    testSphere.position.y = Math.sin(elapsedTime)

    // Animate box 
    box.position.x = Math.cos(elapsedTime) * 2;
    box.position.y = Math.sin(elapsedTime) * 3;

    // Rotate box 
    box.rotation.x = elapsedTime;
    box.rotation.y = elapsedTime;


    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)

}

animation()






