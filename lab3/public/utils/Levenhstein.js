export function getLevenshteinDist(first, second) {
    if (first.length == 0) return second.length;
    if (second.length == 0) return first.length;

    const lenFirst = first.length;
    const lenSecond = second.length;

    const n = Math.max(lenSecond, lenFirst) + 10
    const m = n;
    let d = [];
    for (let i = 0; i < m; i++){
    	d[i] = [];
    	for (let j = 0; j < n; j++) {
    		d[i][j] = 0;
    }}

    for (let i = 0; i <= lenFirst; ++i) {
        d[i][0] = i;
    }

    for (let i = 0; i <= lenSecond; ++i) {
        d[0][i] = i;
    }

    for (let i = 1; i <= lenFirst; ++i) {
        for (let j = 1; j <= lenSecond; ++j) {
            const match = (first[i - 1] == second[j - 1]) ? 0 : 1;
            d[i][j] = Math.min(Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1),
                               d[i - 1][j - 1] + match);
        }
    }
    return d[lenFirst][lenSecond];
}