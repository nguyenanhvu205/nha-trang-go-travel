// Chụp screenshot thật từ ../index.html rồi xuất PDF. Chạy: node case-study/build.js
// Biến môi trường (tùy chọn): LIVE_DEMO_URL, GITHUB_URL, YOUR_NAME, DRAFT=1
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),E=process.env;
const root=path.resolve(__dirname,'..'),S=path.join(__dirname,'screenshots'),U='file://'+path.join(root,'index.html');
const ready=async p=>{await p.evaluate(()=>document.fonts.ready);await p.waitForLoadState('networkidle').catch(()=>{});await p.waitForTimeout(1500)};
(async()=>{fs.mkdirSync(S,{recursive:true});const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1440,height:900}});await p.goto(U);
await p.addStyleTag({content:'html{scroll-behavior:auto!important}.reveal{opacity:1!important;transform:none!important}'});
await p.evaluate(()=>document.querySelectorAll('img').forEach(i=>i.loading='eager'));await ready(p);
await p.screenshot({path:S+'/hero.png',clip:{x:0,y:0,width:1440,height:1000},fullPage:true});
for(const [f,s] of [['featured','#featured'],['experience','#experience'],['explore','#discover'],['why','section.why'],['reviews','section:has(.rv)']])await p.locator(s).first().screenshot({path:`${S}/${f}.png`});
const m=await b.newPage({viewport:{width:375,height:812},deviceScaleFactor:2});await m.goto(U);await ready(m);await m.screenshot({path:S+'/mobile-hero.png'});
let h=fs.readFileSync(path.join(__dirname,'case-study.html'),'utf8');
for(const [k,v] of [['[LIVE_DEMO_URL]',E.LIVE_DEMO_URL],['[GITHUB_URL]',E.GITHUB_URL],['[YOUR_NAME]',E.YOUR_NAME]])if(v)h=h.split(k).join(v);
if(E.LIVE_DEMO_URL)h=h.replace(/<div class="qr">[\s\S]*?<\/div>/,`<div class="qr"><img src="https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=0&data=${encodeURIComponent(E.LIVE_DEMO_URL)}"></div>`);
if(E.DRAFT!=='1')h=h.replace('<body class="draft">','<body>');
const t=path.join(__dirname,'.build.html');fs.writeFileSync(t,h);
const q=await b.newPage();await q.goto('file://'+t);await ready(q);
await q.pdf({path:path.join(__dirname,'nha-trang-go-travel-case-study.pdf'),preferCSSPageSize:true,printBackground:true});
fs.unlinkSync(t);await b.close();console.log('OK -> case-study/nha-trang-go-travel-case-study.pdf')})();
