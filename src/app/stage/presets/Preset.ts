import { BFile } from '../../BFile';
import { Photo } from '../albums/photo';

export class Preset {
    title: string;
    key: string;
    description: string;
    templateFile: BFile;
    beforeImage: Photo;
    afterImage: Photo;
    timestamp: number;
}
