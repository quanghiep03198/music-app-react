import{r as e,_ as n,u as p,E as _,H as g,I as m,t as b,b as t,n as r,j as A,z as y}from"./index-bcb46a99.js";import{a3 as i,T as E}from"./App-aacd66e8.js";import{T as F}from"./Tabs-5b3cdebc.js";const f=e.lazy(()=>n(()=>import("./PlaylistList-7f326e7a.js"),["assets/PlaylistList-7f326e7a.js","assets/index-bcb46a99.js","assets/index-b2c7207b.css","assets/PlaylistCard-f453752b.js","assets/App-aacd66e8.js","assets/App-36ed0e11.css","assets/SkeletonCard-5a60dbd4.js"])),L=e.lazy(()=>n(()=>import("./AlbumList-0d664220.js"),["assets/AlbumList-0d664220.js","assets/index-bcb46a99.js","assets/index-b2c7207b.css","assets/Grid-c991ead0.js","assets/AlbumCard-66532781.js","assets/Swap-ba08f6de.js","assets/App-aacd66e8.js","assets/App-36ed0e11.css"])),O=e.lazy(()=>n(()=>import("./ArtistList-265ab381.js"),["assets/ArtistList-265ab381.js","assets/index-bcb46a99.js","assets/index-b2c7207b.css","assets/Grid-c991ead0.js","assets/App-aacd66e8.js","assets/App-36ed0e11.css","assets/ArtistCard-487ff8da.js","assets/Tooltip-b86a98be.js","assets/Swap-ba08f6de.js","assets/SkeletonCard-5a60dbd4.js"])),T=e.lazy(()=>n(()=>import("./App-aacd66e8.js").then(l=>l.ab),["assets/App-aacd66e8.js","assets/index-bcb46a99.js","assets/index-b2c7207b.css","assets/App-36ed0e11.css"])),P=()=>{const{credential:l,authenticated:s}=p(h=>h.auth),c=_(void 0,{skip:!s,refetchOnMountOrArgChange:!0}),o=g(void 0,{skip:!s,refetchOnMountOrArgChange:!0}),u=m(void 0,{skip:!s,refetchOnMountOrArgChange:!0}),a=b({id:l},{skip:!s,refetchOnMountOrArgChange:!0}),d=[{title:"Albums",pannelElement:t(e.Suspense,{fallback:t(i,{children:t(r,{})}),children:t(L,{data:o.data,status:{isFetching:o.isFetching}})})},{title:"Artists",pannelElement:t(e.Suspense,{fallback:t(i,{children:t(r,{})}),children:t(O,{data:c.data,status:{isFetching:c.isFetching}})})},{title:"Playlists",pannelElement:t(e.Suspense,{fallback:t(i,{children:t(r,{})}),children:t(f,{data:a==null?void 0:a.data,status:{isFetching:a.isFetching}})})},{title:"Uploaded",pannelElement:t(e.Suspense,{fallback:t(i,{children:t(r,{})}),children:t(T,{data:u.data,status:{isFetching:u.isFetching}})})}];return A(y,{children:[t(E,{size:"4xl",children:"Your Library"}),t(F,{data:d,tabType:"boxed"})]})};export{P as default};