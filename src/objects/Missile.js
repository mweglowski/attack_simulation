export class Missile {
    constructor() {
        const geometry = new THREE.CylinderGeometry(1, 1, 6, 10);
        const material = new THREE.MeshBasicMaterial({ color: 0xff5500 });

        this.missile = new THREE.Mesh(geometry, material);
        this.missile.rotation.x = Math.PI / 2;
    }

    setPosition(x, y, z) {
        this.missile.position.set(x, y, z)
    }

    get object() {
        return this.missile;
    }
}