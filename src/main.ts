import { Playlist } from "./ui/playlist";

var exportDataArray = [];

export function initExport() {
    const containerElem = document.querySelector('#export_container');

    const findWithPrefix = (arr: string[], prefix: string) => arr.find(
                (item: string) => item.startsWith(prefix));

    if (containerElem === undefined) {
        console.log('Unable to find export container');
        return;
    }

    containerElem.innerHTML = '';
    containerElem.append(dom('p', { innerText: '喵喵喵！请打开播放列表' }));

    betterncm.utils.waitForElement('.m-playlist .listbd .f-cb').then(result => {
        containerElem.innerHTML = '';

        const tableElem = dom('table', { });
        containerElem.append(tableElem);

        const headRowElem = dom('tr', { },
            dom('th', { innerText: '𝙉𝘾𝙈 𝙄𝙙' }),
            dom('th', { innerText: '𝙏𝙄𝙏𝙇𝙀' }),
            dom('th', { innerText: '𝘼𝙍𝙏𝙄𝙎𝙏𝙎' }),
            dom('th', { innerText: '𝙇𝙀𝙉𝙂𝙏𝙃' })
        );

        tableElem.append(headRowElem);

        if (result !== undefined) {
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
            containerElem.innerHTML = '未能成功获取播放列表';
        }
    });
}

export async function exportJson() {
    const dataDir = await betterncm.app.getDataPath();
    const exportPath = `${dataDir}/playlist.json`;

    console.log(`Exporting data as json to ${exportPath}...`);

    betterncm.fs.writeFile(exportPath, JSON.stringify(exportDataArray))
        .catch((err) => {
            if (err) {
                console.log(`Failed to write json file: ${err}`);
            } else {
                console.log('Successfully exported!');
            }
        });
}

plugin.onConfig(()=>{
    const element = document.createElement("div");
    ReactDOM.render(Playlist(), element);
    return element;
});

plugin.onLoad(async () => {
    const cssText = `
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
        }`;
    
    const styleTag = document.createElement("style");
    styleTag.innerHTML = cssText;
    document.head.appendChild(styleTag);
});
