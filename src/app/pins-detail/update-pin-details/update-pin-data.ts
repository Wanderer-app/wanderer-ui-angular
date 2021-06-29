import { FileData } from "../../common/data/file-data";

export interface UpdatePinData {
   pinId: number,
   newTitle: string,
   newText: string,
   newFile?: FileData,
   updaterId?: string
}