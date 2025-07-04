import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const scene =new THREE.Scene()

const cubeGeometry=new THREE.BoxGeometry(1,1,1)
const cubeMaterial= new THREE.MeshBasicMaterial({color:"red", wireframe:true})
const cubeMesh =new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)
cubeMesh.position.x = 1
cubeMesh.position.y = 1
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper)
scene.add(cubeMesh)

console.log(cubeMesh);
console.log(scene);

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,30)
console.log(camera)
camera.position.z=5   
scene.add(camera)


const canvas = document.querySelector('canvas.threejs')
console.log(canvas);
const renderer =new THREE.WebGLRenderer({
  canvas:canvas,
  antialias:true
})

renderer.setSize(window.innerWidth,window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

const controls = new OrbitControls(camera,canvas)
controls.autoRotate=false
controls.enableDamping=true
camera.aspect=window.innerWidth/window.innerHeight;

window.addEventListener('resize',()=>{
  camera.aspect=window.innerWidth/window.innerHeight;
  renderer.setSize(window.innerWidth,window.innerHeight)
  camera.updateProjectionMatrix();
  
})
const clock= new THREE.Clock()
let previousTime=0;
console.log(window.devicePixelRatio)
const renderloop =()=>{
  const CurrentTime = clock.getElapsedTime()
  const delta = CurrentTime - previousTime
  previousTime = CurrentTime

  cubeMesh.rotation.y += THREE.MathUtils.degToRad(1)*delta*20
  cubeMesh.scale.x = (Math.sin(CurrentTime))*2+2
  cubeMesh.position.x = (Math.sin(CurrentTime))+2
  controls.update()
  window.requestAnimationFrame(renderloop)
  renderer.render(scene,camera)
  
}

renderloop()


