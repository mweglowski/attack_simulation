import { MainScene } from './src/scenes/MainScene.js';

const startSimulation = () => {
    new MainScene()
}

document.addEventListener('DOMContentLoaded', startSimulation);
