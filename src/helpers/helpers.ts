const unit = { s: 1, m: 60, h: 60*60, d: 86400 };

export const convertToSeconds = (s: string) : number => {
    // @ts-ignore
    let secs = s.toLowerCase().match(/\d+./g)
            // @ts-ignore
            .reduce((acc, p) => acc + parseInt(p) * unit[p.at(-1)], 0);
    return secs;
}
    