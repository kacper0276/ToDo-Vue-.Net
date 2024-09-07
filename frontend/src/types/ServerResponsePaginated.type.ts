export interface IServerResponsePaginated<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}
