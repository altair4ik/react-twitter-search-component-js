export default class TwitterTextHelper {
    static textLinkify = (data) => {
        let str = data.full_text;
        data.entities.hashtags.forEach((item) => {
            const regex = new RegExp(`#${item.text}`, 'g');
            str = str.replace(regex, (mystr, offset, s) => {
                if (s[offset + mystr.length] || s[offset + mystr.length] === ' ') {
                    return `<a href="https://twitter.com/hashtag/${item.text}?src=hash">#${item.text}</a>`;
                }
                return mystr;
            });
        });
        data.entities.urls.forEach((item) => {
            str = str.replace(`${item.url}`, `<a href="${item.url}">${item.url}</a>`);
        });
        data.entities.user_mentions.forEach((item) => {
            str = str.replace(`@${item.screen_name}`, `<a href="https://twitter.com/${item.screen_name}">@${item.screen_name}</a>`);
        });
        return str;
    }
}
