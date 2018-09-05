import { Photo } from './photo';
import { Entity } from '../common/Entity';

export class Album extends Entity {
    title: string;
    description: string;
    photos: Photo[];
    cover: Photo;
}
