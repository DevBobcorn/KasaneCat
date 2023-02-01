function meow() {
    console.log('喵喵喵！');
}

plugin.onConfig(tools => {
    return dom("div", {},
        dom("span", { innerText: '喵喵喵！' }),
        tools.makeBtn('喵喵喵！', meow, true)
    );
});

