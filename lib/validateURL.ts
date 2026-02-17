export const validateURL = (url: string) => {
    try {
        const urlParse = new URL(url);
        return ["http:", "https:"].includes(urlParse.protocol);
    }
    catch (error) {
        console.error("Invalid URL:", error);
        return false;
    }
};
