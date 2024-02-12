export class Frigate {
    constructor() {
        this.group = new THREE.Group();

        const geometry = new THREE.BoxGeometry(20, 7, 8);
        const material = new THREE.MeshLambertMaterial({ color: 0xd1d1d1 });
        const mesh = new THREE.Mesh(geometry, material);
        this.group.add(mesh);
    }

    get object() {
        return this.group;
    }
}
