import { length, substr } from 'stringz';

export default class TwitterTextHelper {
    static textLinkify = (data) => {
        const replaceEntries = [];
        let str = data.full_text;
        data.entities.hashtags.forEach((item) => {
            replaceEntries.push(new ReplaceEntry(
                `<a href="https://twitter.com/hashtag/${item.text}?src=hash">#${item.text}</a>`,
                item.indices[0],
                item.indices[1],
            ));
        });
        data.entities.urls.forEach((item) => {
            replaceEntries.push(new ReplaceEntry(
                `<a href="${item.url}">${item.url}</a>`,
                item.indices[0],
                item.indices[1],
            ));
        });
        data.entities.user_mentions.forEach((item) => {
            replaceEntries.push(new ReplaceEntry(
                `<a href="https://twitter.com/${item.screen_name}">@${item.screen_name}</a>`,
                item.indices[0],
                item.indices[1],
            ));
        });

        replaceEntries.sort((a, b) => {
            if (a.beginIndex > b.beginIndex) {
                return 1;
            }
            if (a.beginIndex < b.beginIndex) {
                return -1;
            }
            return 0;
        });
        let indexInc = 0;
        replaceEntries.forEach((item) => {
            str = substr(str, 0, item.beginIndex + indexInc)
                + item.replacement
                + substr(str, item.endIndex + indexInc, length(str));
            indexInc += length(item.replacement) - (item.endIndex - item.beginIndex);
        });
        return str;
    }
}

class ReplaceEntry {
    constructor(replacement, beginIndex, endIndex) {
        this.replacement = replacement;
        this.beginIndex = beginIndex;
        this.endIndex = endIndex;
    }
}
