export interface IGraphglService {
  query(queryString: string): Promise<Record<string, unknown>>;
}
