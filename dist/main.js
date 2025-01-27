(()=>{function u(){return h("div",null,h("div",{id:"kasane_cat_title"},"\u{1D612}\u{1D608}\u{1D61A}\u{1D608}\u{1D615}\u{1D60C}\u{1D63E}\u{1D63C}\u{1D64F}"),h("button",{onClick:f},"\u83B7\u53D6\u5F53\u524D\u64AD\u653E\u5217\u8868"),h("button",{onClick:T},"\u5BFC\u51FA\u81F3json\u6587\u4EF6"),h("div",{id:"export_container"}))}var s=[];function f(){let t=document.querySelector("#export_container"),e=(n,o)=>n.find(l=>l.startsWith(o));if(t===void 0){console.log("Unable to find export container");return}t.innerHTML="",t.append(dom("p",{innerText:"\u55B5\u55B5\u55B5\uFF01\u8BF7\u6253\u5F00\u64AD\u653E\u5217\u8868"})),betterncm.utils.waitForElement(".m-playlist .listbd .f-cb").then(n=>{t.innerHTML="";let o=dom("table",{});t.append(o);let l=dom("tr",{},dom("th",{innerText:"\u{1D649}\u{1D63E}\u{1D648} \u{1D644}\u{1D659}"}),dom("th",{innerText:"\u{1D64F}\u{1D644}\u{1D64F}\u{1D647}\u{1D640}"}),dom("th",{innerText:"\u{1D63C}\u{1D64D}\u{1D64F}\u{1D644}\u{1D64E}\u{1D64F}\u{1D64E}"}),dom("th",{innerText:"\u{1D647}\u{1D640}\u{1D649}\u{1D642}\u{1D64F}\u{1D643}"}));if(o.append(l),n!==void 0){let g=n.querySelector(".lst");s.length=0,g.querySelectorAll(".j-item").forEach(i=>{let y=[...i.classList],a=e(y,"tid-").substring(4),c=i.querySelector(".title .tit").innerText,b=i.querySelectorAll(".f-thide .s-fc1"),d=i.querySelector(".col-5").innerText,r=dom("tr",{});r.append(dom("td",{class:["export-cell"]},dom("p",{innerText:a}))),r.append(dom("td",{class:["export-cell"]},dom("p",{innerText:c})));let p=[],m=dom("td",{class:["export-cell"]});b.forEach(x=>{p.push(x.innerText),m.append(dom("span",{innerText:x.innerText}))}),r.append(m),r.append(dom("td",{class:["export-cell"]},dom("p",{innerText:d}))),s.push({ncm_id:a,title:c,artists:p,length:d}),o.append(r)})}else t.innerHTML="\u672A\u80FD\u6210\u529F\u83B7\u53D6\u64AD\u653E\u5217\u8868"})}async function T(){let e=`${await betterncm.app.getDataPath()}/playlist.json`;console.log(`Exporting data as json to ${e}...`),betterncm.fs.writeFile(e,JSON.stringify(s)).catch(n=>{console.log(n?`Failed to write json file: ${n}`:"Successfully exported!")})}plugin.onConfig(()=>{let t=document.createElement("div");return ReactDOM.render(u(),t),t});plugin.onLoad(async()=>{let t=`
        #kasane_cat_title {
            font-size: 32px;
        }

        .export-cell:hover, .export-cell.selected {
            background-color: #8888881e;
        }
        
        .export-cell {
            border-radius: 4px;
            padding: 4px;
            margin-bottom: 8px;
        }`,e=document.createElement("style");e.innerHTML=t,document.head.appendChild(e)});})();
