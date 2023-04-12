import{F as n,r as i,j as b,b as a}from"./index-555376f6.js";const d=n.a`tab ${e=>{switch(e.type){case"bordered":return"tab-bordered";case"lifted":return"tab-lifted";default:return""}}}

    ${e=>e.active?"tab-active":""}

`,o=n.div`w-full h-full flex flex-col gap-10 ${e=>e.active?"":"hidden"}`,u=({data:e,tabType:l})=>{const[s,c]=i.useState(0);return b("div",{className:"flex flex-col gap-10",children:[a("div",{className:`bg-transparent ${l==="boxed"?"tabs tabs-boxed":"tabs"}`,children:Array.isArray(e)&&e.map((r,t)=>a(d,{type:r.type,active:s===t,onClick:()=>c(t),children:r.title}))}),Array.isArray(e)&&e.map((r,t)=>a(o,{active:s===t,children:r.pannelElement}))]})};export{u as T};
