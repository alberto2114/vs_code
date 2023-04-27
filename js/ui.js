/* import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

function StringsSlider() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Strings"
        defaultValue={3}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={3}
        max={10}
      />
      <Slider defaultValue={3} step={1} marks min={3} max={10} disabled />
    </Box>
  );
} */

class Example extends Phaser.Scene
{
    soundRight;
    soundLeft;
    i = 0;

    create ()
    {
        this.soundLeft = this.sound.add('left');
        this.soundLeft.play({
            loop: true
        });
    }

    update ()
    {
        this.horseLeft.anims.timeScale = this.soundLeft.totalRate;
    }

    start ()
    {
        this.horseLeft.play('horse');

        const gui = new dat.GUI();

        const sm = gui.addFolder('Sound Manager');
        sm.add(this.sound, 'mute').listen();
        sm.add(this.sound, 'volume', 0, 1).listen();
        sm.add(this.sound, 'rate', 0.5, 2).listen();
        sm.add(this.sound, 'detune', -1200, 1200).step(50).listen();
        sm.open();

        const sl = gui.addFolder('Left');
        sl.add(this.soundLeft, 'mute').listen();
        sl.add(this.soundLeft, 'volume', 0, 1).listen();
        sl.add(this.soundLeft, 'rate', 0.5, 2).listen();
        sl.add(this.soundLeft, 'detune', -1200, 1200).step(50).listen();
        sl.open();

        const sr = gui.addFolder('Right');
        sr.add(this.soundRight, 'mute').listen();
        sr.add(this.soundRight, 'volume', 0, 1).listen();
        sr.add(this.soundRight, 'rate', 0.5, 2).listen();
        sr.add(this.soundRight, 'detune', -1200, 1200).step(50).listen();
        sr.open();
    }
}

/**
 * @author    Pavle Goloskokovic <pgoloskokovic@gmail.com> (http://prunegames.com)
 *
 * Images by Walter Newton (http://walternewton.tumblr.com/post/58684376490/like-a-train-in-the-night)
 * Music by Classical 8 Bit (http://classical8bit.tumblr.com/) / CC BY
 */

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Example,
    pixelArt: true,
    audio: {
        disableWebAudio: true
    }
};

for (; this.i < 12; this.i++)
{
    this.horseFrames.push({
        key: `horse${(`0${this.i}`).slice(-2)}`,
        frame: '__BASE'
    });
}

const game = new Phaser.Game(config);