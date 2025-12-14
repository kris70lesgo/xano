// Stores proposals generated in response to RFQs.
table proposal {
  auth = false

  schema {
    int id
    timestamp created_at?=now
  
    // Reference to the RFQ this proposal is for.
    int rfq_id? {
      table = "rfq"
    }
  
    // Reference to the user who created the proposal.
    int user_id? {
      table = "user"
    }
  
    // The current status of the proposal.
    enum status? {
      values = ["draft", "sent", "accepted", "rejected"]
    }
  
    // Title of the proposal.
    text title? filters=trim
  
    // The cover letter text for the proposal.
    text cover_letter? filters=trim
  
    // Array of objects representing individual line items in the proposal.
    json[] line_items?
  
    // The total amount of the proposal.
    decimal total_amount?
  
    // Date until which the proposal is valid.
    date valid_until?
  
    // Timestamp when the proposal was sent.
    timestamp sent_at?
  
    // Timestamp when the proposal was last viewed by the client.
    timestamp viewed_at?
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "gin", field: [{name: "xdo", op: "jsonb_path_op"}]}
    {type: "btree", field: [{name: "created_at", op: "desc"}]}
  ]
}