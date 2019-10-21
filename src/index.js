import { isEmpty } from "./helper";

import './style.css';
import './main.css';

console.log(isEmpty(""), isEmpty("asd"), isEmpty([1, 2]));

document.body.append(document.createTextNode('Hello'));