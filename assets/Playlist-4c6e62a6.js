import{I as B,r as p,u as x,J as v,c as S,j as l,b as s,i as _}from"./index-555376f6.js";import{a1 as I,A as T,u as F,a2 as M,D as A,S as j,_ as b,L,a as g,k as U,l as q,G as w,a4 as E,J,C as O,M as a,a5 as G,a6 as H,a7 as Q,U as z}from"./App-36a15c4e.js";const V=()=>{var h,m,u,d;const{id:i}=I(),{data:e,isFetching:n}=B(i,{refetchOnMountOrArgChange:!0}),{playState:r,setPlayState:y}=p.useContext(T),{currentPlaylist:c}=x(t=>t.queue),{credential:o}=x(t=>t.auth),[f]=v(),P=S(),N=F(),k=()=>{e!=null&&e._id&&(e==null?void 0:e._id)!==c&&P(_({playlistId:e._id,tracks:e})),y(!r)},C=t=>{f(t).then(()=>N("/")).catch(D=>console.log(D.message))};return l("div",{className:"flex h-screen flex-col gap-10",children:[s("section",{className:"group relative",children:s(M,{heroImageUrl:(e==null?void 0:e.thumbnail)!==""?e==null?void 0:e.thumbnail:A,children:n?l("div",{className:"flex flex-col gap-3",children:[s(j,{}),s(b,{}),s(b,{})]}):l(p.Fragment,{children:[s("small",{className:"first-letter:uppercase",children:e!=null&&e.public?"public playlist":"private playlist"}),s("h1",{className:"text-6xl font-bold sm:text-4xl md:text-4xl ",children:e==null?void 0:e.title}),l("p",{className:"sm:text-sm",children:[((h=e==null?void 0:e.tracks)==null?void 0:h.length)||0," tracks"]}),l("p",{children:[s("span",{children:"Created by "}),s(L,{className:"font-bold text-base-content hover:link",children:(m=e==null?void 0:e.creator)==null?void 0:m.username})]})]})})}),l("section",{className:"flex items-center gap-3",children:[s(g,{shape:"circle",color:"success",className:"text-xl sm:text-base",onClick:k,children:r&&c===(e==null?void 0:e._id)?s(U,{}):s(q,{})}),l(w,{position:"bottom-right",children:[s(g,{color:"transparent",className:"text-xl",tabIndex:0,children:s(E,{})}),s(J,{tabIndex:0,children:l(O,{className:"bg-base-300",children:[s(a,{children:l("label",{role:"menuitem",children:[s(G,{})," Add to queue"]})}),o===((u=e==null?void 0:e.creator)==null?void 0:u._id)&&s(a,{children:l("label",{role:"menuitem",children:[s(H,{})," Edit playlist"]})}),o===((d=e==null?void 0:e.creator)==null?void 0:d._id)&&s(a,{onClick:()=>C(i),children:l("label",{role:"menuitem",className:"font-medium text-error",children:[s(Q,{className:"text-xl"})," Delete this playlist"]})})]})})]})]}),s("section",{children:s(z,{data:e==null?void 0:e.tracks,status:{isFetching:n}})})]})};export{V as default};
