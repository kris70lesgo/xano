// Defines pricing rules for different service types.
table pricing_rule {
  auth = false

  schema {
    int id
    timestamp created_at?=now
  
    // Reference to the user who owns this pricing rule.
    int user_id? {
      table = "user"
    }
  
    // Type of service (e.g., "Plumbing", "Electrical").
    text service_type? filters=trim
  
    // The base price for the service.
    decimal base_price?
  
    // Unit of pricing (e.g., "per hour", "sq ft").
    text unit? filters=trim
  
    // Minimum price for the service, if applicable.
    decimal min_price?
  }

  index = [
    {type: "primary", field: [{name: "id"}]}
    {type: "gin", field: [{name: "xdo", op: "jsonb_path_op"}]}
    {type: "btree", field: [{name: "created_at", op: "desc"}]}
  ]
}