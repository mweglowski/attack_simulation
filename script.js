const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 50
camera.position.y = -40
camera.rotation.x = 0.6

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setClearColor("#e5e5e5")
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight

    camera.updateProjectionMatrix()
})

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

const frigate = new THREE.Group()

const geometry = new THREE.BoxGeometry(20, 8, 5)
const material = new THREE.MeshLambertMaterial({
    color: 0xd1d1d1
})
const mesh = new THREE.Mesh(geometry, material)
frigate.add(mesh)

scene.add(frigate)

// Define the movement keys
const keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

// Define the speed and rotation rate
const speed = 0.1;
const rotationRate = 0.01;

// Event listeners for keydown and keyup events
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (keys.hasOwnProperty(key)) {
        keys[key] = true;
    }
});

document.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    if (keys.hasOwnProperty(key)) {
        keys[key] = false;
    }
});

const light = new THREE.PointLight(0xFFFFFF, 1, 500)
light.position.set(-50, -50, 50)
scene.add(light)

// Define the ship's properties
let shipSpeed = 0;
let shipTurnRate = 0;
const maxSpeed = 0.5;
const maxTurnRate = 0.02;
const acceleration = 0.001;
const deceleration = 0.001;
const turnAcceleration = 0.0005;
const turnDeceleration = 0.0005;

const render = function () {
    requestAnimationFrame(render);

    // accelerate forward
    if (keys.w) {
        shipSpeed = Math.min(maxSpeed, shipSpeed + acceleration);
    }
    // accelerate backward
    if (keys.s) {
        shipSpeed = Math.max(-maxSpeed, shipSpeed - acceleration);
    }

    // decrease speed when no key is pressed
    if (!keys.w && !keys.s) {
        if (shipSpeed > 0) {
            shipSpeed = Math.max(0, shipSpeed - deceleration);
        } else if (shipSpeed < 0) {
            shipSpeed = Math.min(0, shipSpeed + deceleration);
        }
    }

    // ship moves along X axis
    frigate.translateX(shipSpeed);

    // Determine turn rate based on current speed to prevent turning when stationary
    let currentTurnRate = shipSpeed === 0 ? 0 : shipTurnRate;

    // Increase turn rate to the left
    if (keys.a) {
        // Math.min() prevents from exceeding maxTurnRate value
        shipTurnRate = Math.min(maxTurnRate, shipTurnRate + turnAcceleration);
    }
    // Increase turn rate to the right
    if (keys.d) {
        shipTurnRate = Math.max(-maxTurnRate, shipTurnRate - turnAcceleration);
    }
    // Decelerate turn rate when no left/right key is pressed
    if (!keys.a && !keys.d) {
        if (shipTurnRate > 0) {
            shipTurnRate = Math.max(0, shipTurnRate - turnDeceleration);
        } else if (shipTurnRate < 0) {
            shipTurnRate = Math.min(0, shipTurnRate + turnDeceleration);
        }
    }

    // Apply turn rate if the ship is moving
    if (shipSpeed !== 0) {
        frigate.rotation.z += currentTurnRate;
    }

    // Render the scene
    renderer.render(scene, camera);
};

render();