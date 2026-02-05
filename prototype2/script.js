import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/********** 
 ** SETUP **
***********/
// Sizes
const sizes ={
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}


/***********
 ** SCENE **
 ***********/
//Canvas
const canvas = document.querySelector('.webgl')

//Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('grey')

//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(-2,3,-5)


//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** MESHES **
 ************/
// test TorusKnot
const torusGeometry = new THREE.TorusKnotGeometry();
const torusMaterial = new THREE.MeshNormalMaterial();
const torus = new THREE.Mesh(torusGeometry, torusMaterial);

scene.add(torus)


// Plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI * 0.5

scene.add(plane)


/********
 ** UI **
 ********/
// UI
const ui = new dat.GUI()

//UI Object
const uiObject = {
    speed: 1,
    distance: 1,
    rotationSpeed: 1
}

// plane UI
const planeFolder = ui.addFolder('Plane')

planeFolder
    .add(planeMaterial, 'wireframe')
    .name("Toggle Wireframe")

// testTorus UI
const torusFolder = ui.addFolder('TorusKnot')

torusFolder
    .add(uiObject, 'speed')
    .min(0.1)
    .max(20)
    .step(0.1)
    .name('Speed')

torusFolder
    .add(uiObject, 'distance')
    .min(0.1)
    .max(20)
    .step(0.1)
    .name('Distance')

torusFolder
    .add(uiObject, 'rotationSpeed')
    .min(0)
    .max(5)
    .step(0.1)
    .name('Rotation Speed')


/********************
 ** ANIMATION LOOP ** 
 ********************/
const clock = new THREE.Clock()

const animation = () =>
{
    // Return elapsedtime
    const elapsedTime = clock.getElapsedTime()

    // Animate TorusKnot
    torus.position.y = Math.sin(elapsedTime * uiObject.speed) * uiObject.distance

    // Rotate TorusKnot
    torus.rotation.x += 0.01 * uiObject.rotationSpeed
    torus.rotation.y += 0.01 * uiObject.rotationSpeed

    // Update OrbitControls
    controls.update()

    //renderer
    renderer.render(scene, camera)

    //request next frame
    window.requestAnimationFrame(animation)

}

animation()






