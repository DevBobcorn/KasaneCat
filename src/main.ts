import { Playlist } from "./ui/playlist";
import { saveAs } from 'file-saver';

var exportDataArray = [];

export function initExport() {
    const containerElem = document.querySelector('#export_container');
    const messageElem = document.querySelector('#export_message');

    const findWithPrefix = (arr: string[], prefix: string) => arr.find(
                (item: string) => item.startsWith(prefix));

    if (containerElem === undefined) {
        console.log('Unable to find export container');
        return;
    }

    containerElem.innerHTML = '';
    messageElem.innerHTML = '喵喵喵！请打开播放列表';

    betterncm.utils.waitForElement('.m-playlist .listbd .f-cb').then(result => {
        containerElem.innerHTML = '';

        const tableElem = dom('table', { });
        containerElem.append(tableElem);

        const headRowElem = dom('tr', { },
            dom('th', { innerText: '歌曲Id' }),
            dom('th', { innerText: '标题' }),
            dom('th', { innerText: '创作者' }),
            dom('th', { innerText: '时长' })
        );

        tableElem.append(headRowElem);

        if (result !== undefined) {
            messageElem.innerHTML = '当前播放列表：';
            const listElem = result.querySelector('.lst');
            exportDataArray.length = 0; // Clear this array

            listElem.querySelectorAll('.j-item').forEach(songElem => {
                const classArray = [...songElem.classList];
                const ncmId = findWithPrefix(classArray, 'tid-').substring(4);

                const title = (songElem.querySelector('.title .tit') as HTMLElement).innerText;
                const artistElems = songElem.querySelectorAll('.f-thide .s-fc1');
                const length = (songElem.querySelector('.col-5') as HTMLElement).innerText;

                const rowElem = dom('tr', { });

                // Add id cell
                rowElem.append(dom('td', { class: [ 'export-cell' ] },
                    dom('p', { innerText: ncmId })
                ));

                // Add title cell
                rowElem.append(dom('td', { class: [ 'export-cell' ] },
                    dom('p', { innerText: title })
                ));

                // Add artists cell
                let artists = [ ]
                const artistsCell = dom('td', { class: [ 'export-cell' ] });
                artistElems.forEach(artistElem => {
                    artists.push((artistElem as HTMLElement).innerText);
                    artistsCell.append(dom('span', { innerText: (artistElem as HTMLElement).innerText }));
                });
                rowElem.append(artistsCell);

                // Add length cell
                rowElem.append(dom('td', { class: [ 'export-cell' ] },
                    dom('p', { innerText: length })
                ));

                exportDataArray.push({
                    ncm_id: ncmId,
                    title: title,
                    artists: artists,
                    length: length
                });
                
                // Append elements to the table
                tableElem.append(rowElem);
            });

        } else {
            messageElem.innerHTML = '未能成功获取播放列表';
        }
    });
}

function getPathSep(dir: string) {
    if (dir.indexOf('\\') >= 0) {
        return '\\';
    }
    return '/';
}

export async function exportJson() {
    const messageElem = document.querySelector('#export_message');

    const dataDir = await betterncm.app.getDataPath();
    const exportPath = `${dataDir}${getPathSep(dataDir)}playlist.json`;

    betterncm.fs.writeFile(exportPath, JSON.stringify(exportDataArray))
        .catch((err) => {
            messageElem.innerHTML = `未能成功写入json文件：${err}`;
        });
    
    messageElem.innerHTML = `播放列表已导出至${exportPath}`;
}

plugin.onConfig(()=>{
    const element = document.createElement("div");
    ReactDOM.render(Playlist(), element);
    return element;
});

plugin.onLoad(async () => {
    const cssText = `
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
        }`;
    
    const styleTag = document.createElement("style");
    styleTag.innerHTML = cssText;
    document.head.appendChild(styleTag);
});
