import{F as e}from"./index-bcb46a99.js";const i=e.div`grid 

${r=>`gap-${r["space-x"]}`}
${r=>`gap-${r["space-y"]}`}

${r=>{switch(r.direction){case"row":return"grid-flow-row";case"col":return"grid-flow-col";default:return"grid-flow-row"}}}

${r=>r.breakpoints?Object.keys(r.breakpoints).map(o=>`${o}:grid-cols-${r.breakpoints[o]}`).join(" "):"grid-flow-col auto-cols-max"}
`;export{i as G};
