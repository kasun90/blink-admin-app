import { File } from '../../File';
import { Photo } from '../albums/photo';

export class Preset {
    title: string;
    key: string;
    description: string;
    templateFile: File;
    beforeImage: Photo;
    afterImage: Photo;
    timestamp: number;
}
