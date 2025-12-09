export interface IDeleteNewsService {
  perform(codigo: string): Promise<void>;
}
