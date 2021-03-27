'use strict';

import openMenu from './modules/openMenu';
import sendForm from './modules/sendForm';
import controlData from './modules/controlData';
import showGift from './modules/showGift';
import mainPageSlider from './modules/mainPageSlider';
import carouselSliderFunc from './modules/carouselSliderFunc';
import photoSlider from './modules/photoSlider';
import calculator from './modules/calculator';
import showBurgerMenu from './modules/showBurgerMenu';
import fixBurgerMenu from './modules/fixBurgerMenu';
import showBurgerMenuOptions from './modules/showBurgerMenuOptions';
import showScrollButton from './modules/showScrollButton';
import smoothScrolling from './modules/smoothScrolling';

// This script opens menu and modal windows at the page
openMenu();

// This script send form at server by fetch
sendForm();

// This script control typed data by regular expressions
controlData();

// This script show gift
showGift();

// Main page slider
mainPageSlider();

// Carousel slider
carouselSliderFunc();

// Photo slider
photoSlider();

// Calculator
calculator();

// Show burger menu script
showBurgerMenu();

// Make burger menu fixed on scroll
fixBurgerMenu();

// Show burger menu options
showBurgerMenuOptions();

// Show scroll button
showScrollButton();

// Smooth scrolling script
smoothScrolling();