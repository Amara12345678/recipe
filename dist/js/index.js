"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
const arr = [22, 23, 22];
let myF = a => {
  console.log("too : ".concat(a));
};
const arr2 = [...arr, 44, 232];
myF(arr2[1]);