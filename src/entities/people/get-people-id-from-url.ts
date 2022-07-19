export function getPeopleIdFromUrl(url: string): string | null {
    const parts = url.split("/");

    while (parts.length) {
        const part = parts.pop();

        if (!part) continue;

        const asInt = parseInt(part, 10);

        if (!isNaN(asInt)) return part;
    }

    return null;
}