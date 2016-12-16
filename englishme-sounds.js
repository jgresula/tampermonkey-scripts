// ==UserScript==
// @name         EnglishMe sounds
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://app.englishme.cz/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    var ctrlDown = false;
    var keySpace = 32;
    var keyLeftArrow = 37;
    var keyRightArrow = 39;
    var sounds = [];
    var soundIndex = 0;

    window.onkeydown = function(event) {
        if (event.keyCode === 17) {
            ctrlDown = true;
        } else {
            if (ctrlDown)
                if (event.keyCode === keyLeftArrow)
                {
                    reloadSounds();
                    soundIndex -= 1;
                    if (soundIndex < 0) soundIndex = Math.max(0, sounds.length - 1);
                    drawBackgrounds();
                }
                else if (event.keyCode === keyRightArrow)
                {
                    reloadSounds();
                    soundIndex += 1;
                    if (soundIndex >= sounds.length) soundIndex = 0;
                    drawBackgrounds();
                }
                else if (event.keyCode === keySpace)
                {
                    reloadSounds();
                    drawBackgrounds();
                    $(sounds[soundIndex]).click();
                }
        }
    };

    window.onkeyup = function(event) {
        if (event.keyCode === 17) {
            ctrlDown = false;
        }
    };

    var drawBackgrounds = function() {
        var sound = $(sounds[soundIndex]);
        sounds.css('background-color', '');
        sound.css('background-color', 'yellow');
    };

    var reloadSounds = function() {
        var newSounds = $('a[hfe-sound]:visible');
        if (newSounds.not(sounds).length !== 0 || sounds.not(newSounds).length !== 0)
        {
            sounds = newSounds;
            soundIndex = 0;
        }
    };

})();