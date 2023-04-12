import{F as o,b as t}from"./index-555376f6.js";import i from"./AlbumCard-64187c6d.js";const a=o.div`grid 

${r=>`gap-${r["space-x"]}`}
${r=>`gap-${r["space-y"]}`}

${r=>{switch(r.direction){case"row":return"grid-flow-row";case"col":return"grid-flow-col";default:return"grid-flow-row"}}}

${r=>r.breakpoints?Object.keys(r.breakpoints).map(e=>`${e}:grid-cols-${r.breakpoints[e]}`).join(" "):"grid-flow-col auto-cols-max"}
`,s=({data:r})=>t(a,{"space-x":10,breakpoints:{sm:2,md:3,lg:4,xl:5,xxl:6},children:Array.isArray(r)&&r.map(e=>t(i,{albumData:e},e==null?void 0:e._id))}),l=Object.freeze(Object.defineProperty({__proto__:null,default:s},Symbol.toStringTag,{value:"Module"}));export{s as A,a as G,l as a};
