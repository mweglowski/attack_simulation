import { ShipControls } from '../controls/ShipControls.js';
import { Frigate } from '../objects/Frigate.js';
import { addResizeListener } from '../utils/ResizeHandler.js';

export class MainScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.frigate = new Frigate().object;
        this.controls = new ShipControls(this.frigate, this.renderer, this.camera);
        this.init(); // Automatically initializes scene and starts simulation
    }

    init() {
        this.camera.position.z = 50
        this.camera.position.y = -40
        this.camera.rotation.x = 0.6
        this.renderer.setClearColor("#e5e5e5")
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.scene.add(this.frigate);

        this.addLights()

        addResizeListener(this.renderer, this.camera)

        this.animate();
    }

    addLights() {
        const light = new THREE.PointLight(0xFFFFFF, 1, 500)
        light.position.set(-50, -50, 50)
        this.scene.add(light)
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}
