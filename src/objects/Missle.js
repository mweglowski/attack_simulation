export class Missle {
    constructor() {
        const geometry = new THREE.CylinderGeometry(0.5, 0.5, 4, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

        this.missle = new THREE.Mesh(geometry, material);
        this.missle.rotation.x = Math.PI / 2;
    }

    get object() {
        return this.missle;
    }
}