export class ShipControls {
    constructor(frigate, renderer, camera) {
        this.frigate = frigate;
        this.renderer = renderer;
        this.camera = camera;
        this.keys = { w: false, a: false, s: false, d: false };
        this.shipSpeed = 0;
        this.shipTurnRate = 0;
        this.maxSpeed = 0.5;
        this.maxTurnRate = 0.02;
        this.acceleration = 0.001;
        this.deceleration = 0.001;
        this.turnAcceleration = 0.0005;
        this.turnDeceleration = 0.0005;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (event) => this.onKeyDown(event));
        document.addEventListener('keyup', (event) => this.onKeyUp(event));
    }

    onKeyDown(event) {
        const key = event.key.toLowerCase();
        if (this.keys.hasOwnProperty(key)) {
            this.keys[key] = true;
        }
    }

    onKeyUp(event) {
        const key = event.key.toLowerCase();
        if (this.keys.hasOwnProperty(key)) {
            this.keys[key] = false;
        }
    }

    update() {
        // accelerate forward
        if (this.keys.w) {
            this.shipSpeed = Math.min(this.maxSpeed, this.shipSpeed + this.acceleration);
        }
        // accelerate backward
        if (this.keys.s) {
            this.shipSpeed = Math.max(-this.maxSpeed, this.shipSpeed - this.acceleration);
        }

        // decrease speed when no key is pressed
        if (!this.keys.w && !this.keys.s) {
            if (this.shipSpeed > 0) {
                this.shipSpeed = Math.max(0, this.shipSpeed - this.deceleration);
            } else if (this.shipSpeed < 0) {
                this.shipSpeed = Math.min(0, this.shipSpeed + this.deceleration);
            }
        }

        // ship moves along X axis
        this.frigate.translateX(this.shipSpeed);

        // Determine turn rate based on current speed to prevent turning when stationary
        let currentTurnRate = this.shipSpeed === 0 ? 0 : this.shipTurnRate;

        // Increase turn rate to the left
        if (this.keys.a) {
            // Math.min() prevents from exceeding this.maxTurnRate value
            this.shipTurnRate = Math.min(this.maxTurnRate, this.shipTurnRate + this.turnAcceleration);
        }
        // Increase turn rate to the right
        if (this.keys.d) {
            this.shipTurnRate = Math.max(-this.maxTurnRate, this.shipTurnRate - this.turnAcceleration);
        }
        // Decelerate turn rate when no left/right key is pressed
        if (!this.keys.a && !this.keys.d) {
            if (this.shipTurnRate > 0) {
                this.shipTurnRate = Math.max(0, this.shipTurnRate - this.turnDeceleration);
            } else if (this.shipTurnRate < 0) {
                this.shipTurnRate = Math.min(0, this.shipTurnRate + this.turnDeceleration);
            }
        }

        // Apply turn rate if the ship is moving
        if (this.shipSpeed !== 0) {
            this.frigate.rotation.y += currentTurnRate;
        }
    }
}
