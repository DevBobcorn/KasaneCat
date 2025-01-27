import { initExport, exportJson } from "../main";

export function Playlist(){
    return (
        <div>
            <div id='kasane_cat_header'>
                <div id='kasane_cat_title'>𝘒𝘈𝘚𝘈𝘕𝘌𝘾𝘼𝙏</div>
                <div id='kasane_cat_op_panel'>
                    <a className='u-ibtn5 false' onClick={initExport}>获取当前播放列表</a>
                    <a className='u-ibtn5 false' onClick={exportJson}>导出至json文件</a>
                </div>
            </div>
            <div id='export_message'></div>
            <div id='export_container'></div>
        </div>
    )
}