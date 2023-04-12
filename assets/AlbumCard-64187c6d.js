import{r as o,c as N,z as S,u as l,j as n,b as t,k as I,i as v}from"./index-555376f6.js";import{S as B}from"./Swap-de83fdf3.js";import{A as F,R as P,V as j,W as E,D as T,a as $,k as q,l as H,X as R,L as u,Y as z,g as A,f as M,Q as c}from"./App-36a15c4e.js";const Q=({albumData:s})=>{var f,g;const{playState:a,setPlayState:h}=o.useContext(F),k=N(),[m,{isLoading:C}]=S();l(e=>{var r;return(r=e.auth)==null?void 0:r.authenticated});const i=l(e=>{var r;return(r=e.collections)==null?void 0:r.albums}),{currentPlaylist:p}=l(e=>e.queue),[d,y]=o.useState(!1),[x,w]=o.useState(!0);o.useEffect(()=>{let e=Array.isArray(i)&&(i==null?void 0:i.some(r=>r._id===s._id));y(e)},[]);const L=async()=>{if(s._id!==p){const{tracks:e}=await I.get(`/albums/${s._id}`);if(!Array.isArray(e)||e.length===0){c.info("Album is updating!",{toastId:s._id});return}k(v({listId:s._id,tracks:e,...s})),h(!0)}else h(!a)},_=async e=>{try{if(!await m(e))throw new Error("Failed to add to your library");y(!d),d?c.info("Removed from your library!"):c.success("Added to your library!")}catch(r){c.error(r.message)}};return n(P,{children:[n(j,{shape:"square",children:[x&&t(E,{tw:"min-w-full aspect-[1]"}),t("img",{src:s==null?void 0:s.image,onError:({currentTarget:e})=>{e.onerror=null,e.src=T},alt:"thumbnail",loading:"eager",className:x?"hidden":"aspect-square min-w-full object-cover",onLoad:()=>w(!1)}),t($,{shape:"circle",color:"success",className:"sm:text-md absolute bottom-2 right-2  translate-y-2 text-xl opacity-0 duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:btn-sm",onClick:L,children:a&&p===(s==null?void 0:s._id)?t(q,{}):t(H,{})})]}),n(R,{children:[n("label",{className:"label p-0",children:[t(u,{to:`/album/${s==null?void 0:s._id}`,className:"card-title flex-1 truncate hover:link sm:text-base",children:t(z,{children:s==null?void 0:s.title})}),C?t(A,{className:"animate-pulse text-xl text-success"}):t(B,{swapon:t(A,{className:"text-xl text-success"}),swapoff:t(M,{className:"text-xl"}),onChange:()=>_(s),checked:d})]}),t(u,{to:`/artist/${(f=s==null?void 0:s.artist)==null?void 0:f._id}`,className:"truncate text-base-content/50 hover:link sm:text-sm",children:(g=s==null?void 0:s.artist)==null?void 0:g.name})]})]})},X=o.memo(Q);export{X as default};
