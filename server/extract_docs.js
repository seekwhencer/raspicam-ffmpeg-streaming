import fs from 'fs';

function extractCommentsAndKeys(yamlText) {
    const lines = yamlText.split('\n');
    const result = {};
    let pendingComments = [];

    for (const rawLine of lines) {
        const line = rawLine.trim();

        const IGNORE_COMMENT_PATTERNS = [
            /^[\W_]+$/,
            /^Global settings$/,
            /^Default path settings$/,
            /^Settings in this section are applied anywhere\.$/,
            /^Settings under pathDefaults are applied anywhere,$/,
            /^Global settings -> General$/,
            /^Global settings -> Authentication$/,
            /^Global settings -> Control API$/,
            /^Global settings -> Metrics$/,
            /^Global settings -> PPROF$/,
            /^Global settings -> Playback server$/,
            /^Global settings -> RTSP server$/,
            /^Global settings -> RTMP server$/,
            /^Global settings -> HLS server$/,
            /^Global settings -> WebRTC server$/,
            /^Global settings -> SRT server$/,
            /^Default path settings -> General$/,
            /^Default path settings -> Record$/,
            /^Default path settings -> RTSP$/,
            /^Default path settings -> RTP$/,
            /^Default path settings -> Redirect$/,
            /^Default path settings -> Raspberry Pi Camera$/,
            /^Default path settings -> Hooks$/,
            /^Default path settings ->$/
        ];

        if (line.trim().startsWith('#')) {
            let text = line.trim().replace(/^#\s?/, '').trim();

            const isIgnorable = IGNORE_COMMENT_PATTERNS.some(pattern => pattern.test(text));

            if (!isIgnorable && text.length > 0) {
                pendingComments.push(text);
            }
            continue;
        }

        const keyMatch = line.match(/^([A-Za-z0-9_\-]+):/);
        if (keyMatch) {
            const key = keyMatch[1];

            const inline = rawLine.includes('#')
                ? rawLine.split('#').slice(1).join('#').trim()
                : null;

            const comments = [];
            if (pendingComments.length) comments.push(...pendingComments);
            if (inline && inline !== '' && !/^[\W_]+$/.test(inline)) {
                comments.push(inline);
            }

            result[key] = comments.join(' ');
            pendingComments = [];
            continue;
        }
    }

    return result;
}

const yamlText = fs.readFileSync('../default.yaml', 'utf8');
const json = extractCommentsAndKeys(yamlText);
const outputFile = 'public/help/en.json';

fs.writeFileSync('public/help/en.json', JSON.stringify(json, null, 2));
console.log(outputFile, 'wurde erzeugt.');
