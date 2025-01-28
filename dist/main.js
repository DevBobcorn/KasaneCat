(()=>{function _(){return h("div",null,h("div",{id:"kasane_cat_header"},h("div",{id:"kasane_cat_title"},"\u{1D612}\u{1D608}\u{1D61A}\u{1D608}\u{1D615}\u{1D60C}\u{1D63E}\u{1D63C}\u{1D64F}"),h("div",{id:"kasane_cat_op_panel"},h("a",{className:"u-ibtn5 false",onClick:E},"\u83B7\u53D6\u5F53\u524D\u64AD\u653E\u5217\u8868"),h("a",{className:"u-ibtn5 false",onClick:L},"\u5BFC\u51FA\u81F3json\u6587\u4EF6"),h("a",{className:"u-ibtn5 false",onClick:M},"\u5BFC\u51FA\u81F3csv\u6587\u4EF6"))),h("div",{id:"export_message"}),h("div",{id:"export_container"}))}var c=[];function S(e){let t="",n=e.firstChild;for(;n;)n.nodeType===Node.TEXT_NODE&&(t+=n.textContent),n=n.nextSibling;return t.trim()}function E(){let e=document.querySelector("#export_container"),t=document.querySelector("#export_message"),n=(r,o)=>r.find(i=>i.startsWith(o));if(e===void 0){console.log("Unable to find export container");return}e.innerHTML="",t.innerHTML="\u55B5\u55B5\u55B5\uFF01\u8BF7\u6253\u5F00\u64AD\u653E\u5217\u8868",betterncm.utils.waitForElement(".m-playlist .listbd .f-cb").then(r=>{e.innerHTML="";let o=dom("table",{});e.append(o);let i=dom("tr",{},dom("th",{innerText:"\u6B4C\u66F2Id"}),dom("th",{innerText:"\u6807\u9898"}),dom("th",{innerText:"\u9644\u52A0\u4FE1\u606F"}),dom("th",{innerText:"\u521B\u4F5C\u8005"}),dom("th",{innerText:"\u65F6\u957F"}));if(o.append(i),r!==void 0){t.innerHTML="\u5F53\u524D\u64AD\u653E\u5217\u8868\uFF1A";let v=r.querySelector(".lst");c.length=0,v.querySelectorAll(".j-item").forEach(l=>{let H=[...l.classList],p=n(H,"tid-").substring(4),m=l.querySelector(".title .tit"),x=S(m),$=l.querySelectorAll(".f-thide .s-fc1"),C=m.querySelectorAll(".s-fc5"),f=l.querySelector(".col-5").innerText,s=dom("tr",{});s.append(dom("td",{class:["export-cell"]},dom("p",{innerText:p}))),s.append(dom("td",{class:["export-cell"]},dom("p",{innerText:x})));let u=[],T=dom("td",{class:["export-cell"]});C.forEach(a=>{u.push(a.innerText),T.append(dom("span",{innerText:a.innerText}))}),s.append(T);let g=[],y=dom("td",{class:["export-cell"]});$.forEach(a=>{g.push(a.innerText),y.append(dom("span",{innerText:a.innerText}))}),s.append(y),s.append(dom("td",{class:["export-cell"]},dom("p",{innerText:f}))),c.push({ncm_id:p,title:x,extra_info:u,artists:g,length:f}),o.append(s)})}else t.innerHTML="\u672A\u80FD\u6210\u529F\u83B7\u53D6\u64AD\u653E\u5217\u8868"})}function b(e){return e.indexOf("\\")>=0?"\\":"/"}async function L(){let e=document.querySelector("#export_message"),t=await betterncm.app.getDataPath(),n=`${t}${b(t)}playlist.json`;betterncm.fs.writeFile(n,JSON.stringify(c,null,4)).catch(r=>{e.innerHTML=`\u672A\u80FD\u6210\u529F\u5199\u5165json\u6587\u4EF6\uFF1A${r}`}),e.innerHTML=`\u64AD\u653E\u5217\u8868\u5DF2\u5BFC\u51FA\u81F3${n}`}function d(e){return e.indexOf(",")>=0?(e=e.split('"').join('""'),`"${e}"`):e}async function M(){let e=document.querySelector("#export_message"),t=await betterncm.app.getDataPath(),n=`${t}${b(t)}playlist.csv`,o=`NCM Id,Title,Artists,Length
${c.map(i=>`${i.ncm_id},${d(i.title)},${d(i.extra_info.join("&&"))},${d(i.artists.join("&&"))},${i.length}`).join(`
`)}`;betterncm.fs.writeFile(n,o).catch(i=>{e.innerHTML=`\u672A\u80FD\u6210\u529F\u5199\u5165csv\u6587\u4EF6\uFF1A${i}`}),e.innerHTML=`\u64AD\u653E\u5217\u8868\u5DF2\u5BFC\u51FA\u81F3${n}`}plugin.onConfig(()=>{let e=document.createElement("div");return ReactDOM.render(_(),e),e});plugin.onLoad(async()=>{let e=`
        #kasane_cat_title {
            display: inline-flex;
            font-size: 3em;
            line-height: 0.9em;
        }

        #kasane_cat_op_panel {
            display: inline-flex;
            float: right;
            gap: 10px;
        }

        #export_message {
            font-size: 1.5em;
            line-height: 3em;
        }

        .export-cell:hover, .export-cell.selected {
            background-color: #8888881e;
        }
        
        .export-cell {
            border-radius: 4px;
            padding: 4px;
            margin-bottom: 8px;
        }
        
        .export-cell span {
            margin-right: 5px;
        }
        `,t=document.createElement("style");t.innerHTML=e,document.head.appendChild(t)});})();
