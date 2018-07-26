import { Photo } from './photo';
export class Album {
    title: string;
    key: string;
    description: string;
    photos: Photo[];
    cover: Photo;
    timestamp: number;

    constructor(title: string, key: string, description: string, photos: Photo[], cover: Photo, timestamp: number) {
        this.title = title;
        this.key = key;
        this.description = description;
        this.photos = photos;
        this.cover = cover;
        this.timestamp = timestamp;
    }
}
