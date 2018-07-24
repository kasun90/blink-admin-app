export class Album {
    title: string;
    key: string;
    photos: string[];
    cover: string;
    timestamp: number;

    constructor(title: string, key: string, photos: string[], cover: string, timestamp: number) {
        this.title = title;
        this.key = key;
        this.photos = photos;
        this.cover = cover;
        this.timestamp = timestamp;
    }
}
