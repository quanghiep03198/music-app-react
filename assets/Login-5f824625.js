import{r as i,M as f,b as e,j as s,L as p}from"./index-bcb46a99.js";import{x as w,u as b,E as N,L as c,a as v,Q as m}from"./App-aacd66e8.js";import"./firebase.config-23e38e02.js";const j=()=>{var n;const{register:l,formState:{errors:t},handleSubmit:d}=w(),o=i.useRef(null),u=b();i.useEffect(()=>{o.current.focus(),o.current.scrollIntoView({behavior:"smooth"})},[]);const[h,{isLoading:x}]=f(),{ref:g}=l("email");return e("div",{className:"hero min-h-screen bg-base-200",children:s("div",{className:"hero-content flex-col xl:flex-row-reverse xxl:flex-row-reverse",children:[s("div",{className:"flex flex-col items-center justify-center text-center lg:text-left",children:[e("h1",{className:"text-5xl font-bold",children:"Login now!"}),e("p",{className:"py-6 text-xl sm:text-base xxl:truncate",children:"Millions of songs are waiting for you. Login to experience more and more interesting features"})]}),e("div",{className:"card glass w-full max-w-sm flex-shrink-0 shadow-2xl",children:s("div",{className:"card-body",children:[e("img",{src:p,className:" max-w-full object-cover text-center"}),e(N,{children:s("form",{onSubmit:d(async r=>{try{const a=await h(r).unwrap();if(a.status===400||a.status===404)throw new Error(a.message);m.success("Logged in successfully!"),u("/")}catch(a){m.error(a.message)}}),children:[s("div",{className:"form-control",children:[e("label",{className:"label",children:e("span",{className:"label-text",children:"Email"})}),e("input",{type:"text",placeholder:"email",className:"input-bordered input",...l("email",{required:"Provide an email!",pattern:{value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,message:"Email is invalid"}}),ref:r=>{g(r),o.current=r}}),t.email&&e("small",{className:"error-message",children:(n=t.email)==null?void 0:n.message})]}),s("div",{className:"form-control",children:[e("label",{className:"label",children:e("span",{className:"label-text",children:"Password"})}),e("input",{type:"password",placeholder:"password",className:"input-bordered input",...l("password",{required:!0})}),t.password&&e("small",{className:"error-message",children:"Provide a password!"}),s("label",{className:"label",children:[e(c,{to:"/forgot-password",className:"link-hover label-text-alt link",children:"Forgot password?"}),e(c,{to:"/register",className:"link-hover label-text-alt link",children:"Create new account"})]})]}),e("div",{className:"form-control mt-6",children:e(v,{color:"success",className:`text-lg ${x&&"loading"}`,children:"Login"})})]})})]})})]})})};export{j as default};