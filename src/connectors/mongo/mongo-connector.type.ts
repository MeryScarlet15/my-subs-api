export interface IMongoUpdateOne {
  matchedCount: number;
  modifiedCount: number;
  upsertedId: number;
  acknowledged?: boolean;
  n?: number;
  UpdateWriteOpResult: any;
}
