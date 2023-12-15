class YoutubeToPipedConverter {
    handle(message) {
        if (this.containsValidUrl(message.content) && this.containsYoutubeWatchUrl(message.content)) {
            this.replyPipedAlternative(message);
        }
    }

    containsYoutubeWatchUrl(messageContent) {
        return messageContent.match(/youtube\.com\/watch/) != null;
    }

    containsValidUrl(messageContent) {
        return messageContent.match(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/) != null;
    }

    replyPipedAlternative(message) {
        let pipedLinks = this.convertToPipedLinks(this.getYoutubeLinksFromMessage(message.content));
        let replyMessage = this.prepareReplyMessage(pipedLinks);

        message.reply(replyMessage);
    }

    getYoutubeLinksFromMessage(messageContent) {
        let urls = this.getUrlsFromMessage(messageContent);
        let youtubeUrls = urls.filter((url) => {
            return url.startsWith("https://www.youtube.com/watch");
        });

        return youtubeUrls;
    }

    getUrlsFromMessage(messageContent) {
        return messageContent.match(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/g);
    }

    convertToPipedLinks(youtubeLinks) {
        return youtubeLinks.map(ytUrl => {
            return ytUrl.replace("www.youtube.com", "piped.video");
        });
    }

    prepareReplyMessage(pipedLinks) {
        return "It seems you have linked one or more YouTube videos! Try watching them on Piped instead:\n\n" + pipedLinks.join("\n"); 
    }
}

module.exports = YoutubeToPipedConverter;