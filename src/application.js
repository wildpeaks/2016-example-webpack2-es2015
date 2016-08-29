/* @flow */
/* eslint-env browser */
/* eslint-disable no-console */
import css from './application.css'; // eslint-disable-line no-unused-vars
import {myconst, myfunction} from 'examples/module1';
import {createParagraph, createImage} from 'examples/module2';

const value1: number = myconst + 1;
const value2: number = myfunction() + 1;
console.log('value1:', value1);
console.log('value2:', value2);

const element1: HTMLElement = createParagraph();
const element2: HTMLElement = createImage();
document.body.appendChild(element1);
document.body.appendChild(element2);
