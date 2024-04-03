export const removePTags = (htmlString: string) =>
    htmlString.replace(/<p[^>]*>(.*?)<\/p>/g, "$1");