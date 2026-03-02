import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/********** 
 ** SETUP **
***********/
// Sizes
const sizes ={
    width: window.innerWidth * 0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth * 0.4 / window.innerHeight
}


/***********
 ** SCENE **
 ***********/
//Canvas
const canvas = document.querySelector('.webgl')

//Scene
const scene = new THREE.Scene()
//scene.background = new THREE.Color('white')

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
    antialias: true,
    alpha: true
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
leftEye.position.set(15, 4, 2)
leftEye.castShadow = true
scene.add(leftEye)

const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
rightEye.position.set(15, 4, -2)
rightEye.castShadow = true
scene.add(rightEye)

// Mouth 
const mouthGeometry = new THREE.BoxGeometry(0.12, 0.12, 2)
const mouthMaterial = new THREE.MeshNormalMaterial()

const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial)
mouth.position.set(15, 2.5, 0)
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

/*********************
** DOM INTERACTIONS **
**********************/
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false
}

// part-one
document.querySelector('#part-one').onclick = function(){
    domObject.part = 1
}

// part-two
document.querySelector('#part-two').onclick = function(){
    domObject.part = 2
}

// first-change
document.querySelector('#first-change').onclick = function() {
    domObject.firstChange = true
}

// second-change
document.querySelector('#second-change').onclick = function() {
    domObject.secondChange = true
}

// third-change
document.querySelector('#third-change').onclick = function() {
    domObject.thirdChange = true
}

// fourth-change
document.querySelector('#fourth-change').onclick = function() {
    domObject.fourthChange = true
}

/********
 ** UI **
 ********/
// UI
/*const ui = new dat.GUI()

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
*/
  

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

    // part-one
    if(domObject.part === 1)
    {
        camera.position.set(6, 0, 0)
        camera.lookAt(0, 0, 0)

    }

    // part-two
     if(domObject.part === 2)
    {
        camera.position.set(25, 1, 0)
        camera.lookAt(0, 0, 0)
    }

    // first-change
    if(domObject.firstChange)
    {
        leftEye.position.z = 1 + Math.sin(elapsedTime) * 0.5
        rightEye.position.z = -1 - Math.sin(elapsedTime) * 0.5
    }

    // second-change
    if(domObject.secondChange)
    {
        mouth.position.y = 2.5 + Math.sin(elapsedTime) * 0.6
    }

    // third-change
    if(domObject.thirdChange)
    {
        leftEye.position.x = 15 + Math.sin(elapsedTime) * 2
        rightEye.position.x = 15 + Math.sin(elapsedTime) * 2
        mouth.position.x = 15 + Math.sin(elapsedTime) * 2
    }
    
    // fourth-change
    if(domObject.fourthChange)
    {
        directionalLight.position.z = Math.sin(elapsedTime) * 6
        directionalLight.position.y = 4 + Math.sin(elapsedTime * 0.8) * 2
    }

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






