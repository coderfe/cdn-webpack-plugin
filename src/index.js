import { isEmpty } from "./helper";

import "./style.css";
import "./main.css";

import imgSrc from "./test.jpg";

const img = new Image();
img.src = imgSrc;
document.body.append(img);
