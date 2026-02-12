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
scene.background = new THREE.Color('black')

//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(10,2,7.5)


//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** MESHES **
 ************/
// Cave
const caveGeometry = new THREE.PlaneGeometry(15.5, 7.5)
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)

// Objects

// Eyes
const eyeGeometry = new THREE.SphereGeometry(0.3, 32, 32)
const eyeMaterial = new THREE.MeshNormalMaterial()

const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
leftEye.position.set(6, 2, -1)
leftEye.castShadow = true
scene.add(leftEye)

const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
rightEye.position.set(6, 2, 1)
rightEye.castShadow = true
scene.add(rightEye)

// Mouth 
const mouthGeometry = new THREE.BoxGeometry(0.12, 0.12, 2)
const mouthMaterial = new THREE.MeshNormalMaterial()

const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial)
mouth.position.set(6, 0.8, 0)
mouth.castShadow = true
scene.add(mouth)

/***********
** LIGHTS **
************/
// Ambient light
const ambientLight = new THREE.AmbientLight(0x404040)
//const ambientLight = new THREE.AmbientLight(
//      new THREE.Color('white')
//)
//scene.add(ambientLight)

// Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20,4.1,0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048


// Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/********
 ** UI **
 ********/
// UI
const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Y')

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Z')

  

/********************
 ** ANIMATION LOOP ** 
 ********************/
const clock = new THREE.Clock()

const animation = () =>
{
    // Return elapsedtime
    const elapsedTime = clock.getElapsedTime()

    // Animate objects
    //.rotation.y = elapsedTime

    // Update directionalLightHelper
    directionalLightHelper.update()

    // Update OrbitControls
    controls.update()

    //renderer
    renderer.render(scene, camera)

    //request next frame
    window.requestAnimationFrame(animation)

}

animation()






