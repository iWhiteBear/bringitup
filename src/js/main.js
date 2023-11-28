import Slider from './modules/slider';
import VideoPlaer from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider('.page', '.next');
    slider.render();

    const player = new VideoPlaer('.showup .play', '.overlay');
    player.init();
}); 