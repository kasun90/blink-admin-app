import { BFile } from '../../BFile';
import { Photo } from '../albums/photo';
import { Entity } from '../common/Entity';

export class Preset extends Entity {
    title: string;
    description: string;
    templateFile: BFile;
    beforeImage: Photo;
    afterImage: Photo;
}
