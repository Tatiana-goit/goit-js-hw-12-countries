import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Angeler.css';
import { alert, defaults } from '@pnotify/core';

defaults.styling = 'angeler';
defaults.icons = 'angeler';

export const msgTooManyCountries = () =>
  alert({
    type: 'notice',
    text: 'To many matches found. Please enter a more specific query!',
    delay: 3000,
    sticker: false,
    animateSpeed: 'slow',
  });

export const catchError = () =>
  alert({
    type: 'error',
    text: 'This country was not found!',
    delay: 3000,
    sticker: false,
    animateSpeed: 'slow',
  });