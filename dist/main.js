(()=>{function f(){return h("div",null,h("div",{id:"kasane_cat_header"},h("div",{id:"kasane_cat_title"},"\u{1D612}\u{1D608}\u{1D61A}\u{1D608}\u{1D615}\u{1D60C}\u{1D63E}\u{1D63C}\u{1D64F}"),h("div",{id:"kasane_cat_op_panel"},h("a",{className:"u-ibtn5 false",onClick:g},"\u83B7\u53D6\u5F53\u524D\u64AD\u653E\u5217\u8868"),h("a",{className:"u-ibtn5 false",onClick:T},"\u5BFC\u51FA\u81F3json\u6587\u4EF6"))),h("div",{id:"export_message"}),h("div",{id:"export_container"}))}var l=[];function g(){let e=document.querySelector("#export_container"),t=document.querySelector("#export_message"),o=(n,i)=>n.find(s=>s.startsWith(i));if(e===void 0){console.log("Unable to find export container");return}e.innerHTML="",t.innerHTML="\u55B5\u55B5\u55B5\uFF01\u8BF7\u6253\u5F00\u64AD\u653E\u5217\u8868",betterncm.utils.waitForElement(".m-playlist .listbd .f-cb").then(n=>{e.innerHTML="";let i=dom("table",{});e.append(i);let s=dom("tr",{},dom("th",{innerText:"\u6B4C\u66F2Id"}),dom("th",{innerText:"\u6807\u9898"}),dom("th",{innerText:"\u521B\u4F5C\u8005"}),dom("th",{innerText:"\u65F6\u957F"}));if(i.append(s),n!==void 0){t.innerHTML="\u5F53\u524D\u64AD\u653E\u5217\u8868\uFF1A";let y=n.querySelector(".lst");l.length=0,y.querySelectorAll(".j-item").forEach(a=>{let _=[...a.classList],c=o(_,"tid-").substring(4),d=a.querySelector(".title .tit").innerText,v=a.querySelectorAll(".f-thide .s-fc1"),p=a.querySelector(".col-5").innerText,r=dom("tr",{});r.append(dom("td",{class:["export-cell"]},dom("p",{innerText:c}))),r.append(dom("td",{class:["export-cell"]},dom("p",{innerText:d})));let m=[],x=dom("td",{class:["export-cell"]});v.forEach(u=>{m.push(u.innerText),x.append(dom("span",{innerText:u.innerText}))}),r.append(x),r.append(dom("td",{class:["export-cell"]},dom("p",{innerText:p}))),l.push({ncm_id:c,title:d,artists:m,length:p}),i.append(r)})}else t.innerHTML="\u672A\u80FD\u6210\u529F\u83B7\u53D6\u64AD\u653E\u5217\u8868"})}function E(e){return e.indexOf("\\")>=0?"\\":"/"}async function T(){let e=document.querySelector("#export_message"),t=await betterncm.app.getDataPath(),o=`${t}${E(t)}playlist.json`;betterncm.fs.writeFile(o,JSON.stringify(l)).catch(n=>{e.innerHTML=`\u672A\u80FD\u6210\u529F\u5199\u5165json\u6587\u4EF6\uFF1A${n}`}),e.innerHTML=`\u64AD\u653E\u5217\u8868\u5DF2\u5BFC\u51FA\u81F3${o}`}plugin.onConfig(()=>{let e=document.createElement("div");return ReactDOM.render(f(),e),e});plugin.onLoad(async()=>{let e=`
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
        }`,t=document.createElement("style");t.innerHTML=e,document.head.appendChild(t)});})();
