import { initExport, exportJson } from "../main";

export function Playlist(){
    return (
        <div>
            <div id='kasane_cat_title'>𝘒𝘈𝘚𝘈𝘕𝘌𝘾𝘼𝙏</div>
            <button onClick={initExport}>获取当前播放列表</button>
            <button onClick={exportJson}>导出至json文件</button>
            <div id='export_container'></div>
        </div>
    )
}