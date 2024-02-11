const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setClearColor("#e5e5e5")
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight

    camera.updateProjectionMatrix()
})



const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshLambertMaterial({
    color: 0xFFCC00
})
const mesh = new THREE.Mesh(geometry, material)

mesh.rotation.set(45, 0, 0)
mesh.position.set(2, -1, 1)


scene.add(mesh)

const light = new THREE.PointLight(0xFFFFFF, 1, 500)
light.position.set(-50, -50, 50)
scene.add(light)

const render = function() {
    requestAnimationFrame(render)

    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01

    renderer.render(scene, camera)
}

render()

