import { ShipControls } from '../controls/ShipControls.js';
import { Frigate } from '../objects/Frigate.js';
import { addResizeListener } from '../utils/ResizeHandler.js';

export class MainScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(110, window.innerWidth / window.innerHeight, 0.1, 1500);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.frigate = new Frigate().object;
        this.controls = new ShipControls(this.frigate, this.renderer, this.camera);
        this.init(); // Automatically initializes scene and starts simulation
    }

    init() {
        this.camera.position.z = 50
        this.camera.position.y = -90
        this.camera.rotation.x = 1.5
        this.renderer.setClearColor("#a8d4ff")
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.scene.add(this.frigate);

        this.addLights()
        this.addWater()

        addResizeListener(this.renderer, this.camera)

        this.animate();
    }

    addLights() {
        const light = new THREE.PointLight(0xFFFFFF, 1, 1000)
        light.position.set(-100, -100, 200)
        this.scene.add(light)
    }

    addWater() {
        // Geometry of the water surface
        const waterGeometry = new THREE.PlaneGeometry(1500, 1500, 64, 130);

        // Vertex shader for the water effect
        const waterVertexShader = `
            precision highp float;

            uniform float time;
            varying vec2 vUv;
            varying float zPos;
            
            void main() {
                vUv = uv;
                vec3 pos = position;
                float waveHeight = 0.1 * (sin(pos.x * 0.05 + time) + sin(pos.y * 0.05 + time));
                pos.z += waveHeight;
                pos.z += waveHeight;
                zPos = waveHeight; // Pass wave height to fragment shader for color adjustment
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 0.5);
            }
        `;

        // Fragment shader for the water effect
        const waterFragmentShader = `
            precision highp float;

            uniform vec3 color;
            varying vec2 vUv;
            varying float zPos;
            
            void main() {
                float depth = smoothstep(0.0, 1.0, zPos + 0.5);
                gl_FragColor = vec4(color * depth, 1.5);
            }
        `;

        // Shader material for the water effect
        this.waterMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color('#6ebafa') }
            },
            vertexShader: waterVertexShader,
            fragmentShader: waterFragmentShader,
            transparent: true
        });

        // Creating the mesh with the geometry and shader material
        const water = new THREE.Mesh(waterGeometry, this.waterMaterial);

        // Rotate the water plane to lie flat
        water.rotation.z = -Math.PI / 2;

        // Add the water mesh to the scene
        this.scene.add(water);
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        if (this.waterMaterial) {
            this.waterMaterial.uniforms.time.value += 0.01
        }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}
