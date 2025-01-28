(()=>{function E(){return h("div",null,h("div",{id:"kasane_cat_header"},h("div",{id:"kasane_cat_title"},"\u{1D612}\u{1D608}\u{1D61A}\u{1D608}\u{1D615}\u{1D60C}\u{1D63E}\u{1D63C}\u{1D64F}"),h("div",{id:"kasane_cat_op_panel"},h("a",{className:"u-ibtn5 false",onClick:_},"\u83B7\u53D6\u5F53\u524D\u64AD\u653E\u5217\u8868"),h("a",{className:"u-ibtn5 false",onClick:b},"\u5BFC\u51FA\u81F3json\u6587\u4EF6"),h("a",{className:"u-ibtn5 false",onClick:v},"\u5BFC\u51FA\u81F3csv\u6587\u4EF6"))),h("div",{id:"export_message"}),h("div",{id:"export_container"}))}var l=[];function S(e){let t="",n=e.firstChild;for(;n;)n.nodeType===Node.TEXT_NODE&&(t+=n.textContent),n=n.nextSibling;return t.trim()}function q(e){return e.startsWith("(")&&e.endsWith(")")?e.substring(1,e.length-1):e}function _(){let e=document.querySelector("#export_container"),t=document.querySelector("#export_message"),n=(i,s)=>i.find(r=>r.startsWith(s));if(e===void 0){console.log("Unable to find export container");return}e.innerHTML="",t.innerHTML="\u55B5\u55B5\u55B5\uFF01\u8BF7\u6253\u5F00\u64AD\u653E\u5217\u8868",betterncm.utils.waitForElement(".m-playlist .listbd .f-cb").then(i=>{e.innerHTML="";let s=dom("table",{});e.append(s);let r=dom("tr",{},dom("th",{innerText:"\u6B4C\u66F2Id"}),dom("th",{innerText:"\u6807\u9898"}),dom("th",{innerText:"\u9644\u52A0\u4FE1\u606F"}),dom("th",{innerText:"\u521B\u4F5C\u8005"}),dom("th",{innerText:"\u65F6\u957F"}));if(s.append(r),i!==void 0){t.innerHTML="\u5F53\u524D\u64AD\u653E\u5217\u8868\uFF1A";let M=i.querySelector(".lst");l.length=0,M.querySelectorAll(".j-item").forEach(a=>{let H=[...a.classList],x=n(H,"tid-").substring(4),u=a.querySelector(".title .tit"),f=S(u),$=a.querySelectorAll(".f-thide .s-fc1"),C=u.querySelectorAll(".s-fc5"),g=a.querySelector(".col-5").innerText,o=dom("tr",{});o.append(dom("td",{class:["export-cell"]},dom("p",{innerText:x}))),o.append(dom("td",{class:["export-cell"]},dom("p",{innerText:f})));let c=[],T=dom("td",{class:["export-cell"]});C.forEach(p=>{c.push(q(p.innerText)),T.append(dom("span",{innerText:c.slice(-1)[0]}))}),o.append(T);let d=[],y=dom("td",{class:["export-cell"]});$.forEach(p=>{d.push(p.innerText),y.append(dom("span",{innerText:d.slice(-1)[0]}))}),o.append(y),o.append(dom("td",{class:["export-cell"]},dom("p",{innerText:g}))),l.push({ncm_id:x,title:f,extra_info:c,artists:d,length:g}),s.append(o)})}else t.innerHTML="\u672A\u80FD\u6210\u529F\u83B7\u53D6\u64AD\u653E\u5217\u8868"})}function L(e){return e.indexOf("\\")>=0?"\\":"/"}async function b(){let e=document.querySelector("#export_message"),t=await betterncm.app.getDataPath(),n=`${t}${L(t)}playlist.json`;betterncm.fs.writeFile(n,JSON.stringify(l,null,4)).catch(i=>{e.innerHTML=`\u672A\u80FD\u6210\u529F\u5199\u5165json\u6587\u4EF6\uFF1A${i}`}),e.innerHTML=`\u64AD\u653E\u5217\u8868\u5DF2\u5BFC\u51FA\u81F3${n}`}function m(e){return e.indexOf(",")>=0?(e=e.split('"').join('""'),`"${e}"`):e}async function v(){let e=document.querySelector("#export_message"),t=await betterncm.app.getDataPath(),n=`${t}${L(t)}playlist.csv`,s=`NCM Id,Title,Extra Info,Artists,Length
${l.map(r=>`${r.ncm_id},${m(r.title)},${m(r.extra_info.join("&&"))},${m(r.artists.join("&&"))},${r.length}`).join(`
`)}`;betterncm.fs.writeFile(n,s).catch(r=>{e.innerHTML=`\u672A\u80FD\u6210\u529F\u5199\u5165csv\u6587\u4EF6\uFF1A${r}`}),e.innerHTML=`\u64AD\u653E\u5217\u8868\u5DF2\u5BFC\u51FA\u81F3${n}`}plugin.onConfig(()=>{let e=document.createElement("div");return ReactDOM.render(E(),e),e});plugin.onLoad(async()=>{let e=`
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
