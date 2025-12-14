// Logs activities and events related to RFQs and proposals.
table timeline_event {
  auth = false

  schema {
    int id
    timestamp created_at?=now
  
    // The ID of the related record (e.g., RFQ ID, Proposal ID).
    int related_id?
  
    // The type of the related record (e.g., "rfq", "proposal").
    text related_type? filters=trim
  
    // Description of the event or activity.
    text description? filters=trim
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "gin", field: [{name: "xdo", op: "jsonb_path_op"}]}
    {type: "btree", field: [{name: "created_at", op: "desc"}]}
  ]
}