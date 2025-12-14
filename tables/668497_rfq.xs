// Stores information for Request for Quotes (RFQs).
table rfq {
  auth = false

  schema {
    int id
    timestamp created_at?=now
  
    // Reference to the user who created the RFQ.
    int user_id? {
      table = "user"
    }
  
    // The current status of the RFQ process.
    enum status? {
      values = [
        "received"
        "parsing"
        "parsed"
        "generating"
        "ready"
        "sent"
        "won"
        "lost"
        "declined"
      ]
    
    }
  
    // The subject line of the original RFQ email.
    text email_subject? filters=trim
  
    // The full body content of the original RFQ email.
    text email_body? filters=trim
  
    // Name of the client who sent the RFQ.
    text client_name? filters=trim
  
    // Email address of the client who sent the RFQ.
    email client_email? filters=trim|lower
  
    // Phone number of the client who sent the RFQ.
    text client_phone? filters=trim
  
    // Type of project requested in the RFQ.
    text project_type? filters=trim
  
    // Detailed description of the project from the RFQ.
    text project_description? filters=trim
  
    // JSON object containing the min, max, and currency for the project budget.
    json budget_range?
  
    // Project timeline details from the RFQ.
    text timeline? filters=trim
  
    // AI-generated summary, risks, and confidence score for the RFQ.
    json ai_analysis?
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "gin", field: [{name: "xdo", op: "jsonb_path_op"}]}
    {type: "btree", field: [{name: "created_at", op: "desc"}]}
  ]
}