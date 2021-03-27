export const subscriptionSwaggerSchema = {
  ISubscription: {
    type: "object",
    required: ["_id", "name", "cost", "paidPeriod", "isPaid"],
    properties: {
      _id: {
        type: "integer",
      },
      name: { type: "string" },
      cost: { type: "string" },
      paidPeriod: { type: "string", enum: ["WEEK", "MONTH", "YEAR"] },
      isPaid: { type: "boolean" },
      note: { type: "string" },
      renovationDate: { type: "date" },
      deletedAt: { type: "date" },
    },
  },
};
