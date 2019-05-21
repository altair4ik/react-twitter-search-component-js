export default class TwitterTextHelper {
    static textLinkify = (data) => {
        let str = data.full_text;
        data.entities.hashtags.forEach((item) => {
            str = str.replace(`#${item.text}`, `<a href="https://twitter.com/hashtag/${item.text}?src=hash">#${item.text}</a>`);
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
