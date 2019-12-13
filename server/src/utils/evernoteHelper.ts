import config, { IEvernoteConfig } from '../config';
import { Evernote } from 'evernote';
import * as moment from 'moment-timezone';

export default class EvernoteHelper {
  protected client: Evernote.Client;
  public noteStore: Evernote.NoteStoreClient;
  public notebookName: string;
  public notesNum: number;
  public spec: Evernote.NotesMetadataResultSpec;

  constructor(token: string) {
    const { sandbox, notebookName, notesNum, specOption } = config.get<IEvernoteConfig>('evernote');
    
    this.client = new Evernote.Client({
      token,
      sandbox,
    });

    this.noteStore = this.client.getNoteStore();

    this.notebookName = notebookName;
    this.notesNum = notesNum;

    this.spec = new Evernote.NotesMetadataResultSpec(specOption);
  }

  public async getNotebookGuid() {
    const notebooks: Evernote.Notebook[] = await this.noteStore.listNotebooks();
      const studyNotebook = notebooks.filter((notebook) => notebook.name === this.notebookName)[0];
      return studyNotebook.guid;
  }
}