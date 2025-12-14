export async function generatePDF(proposalContent: any): Promise<string> {
  const PDFCO_API_KEY = process.env.PDFCO_API_KEY;

  if (!PDFCO_API_KEY) {
    throw new Error('PDF.co API key not configured');
  }

  try {
    // Convert proposal content to HTML
    const html = generateProposalHTML(proposalContent);

    // Call PDF.co API
    const response = await fetch('https://api.pdf.co/v1/pdf/convert/from/html', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': PDFCO_API_KEY,
      },
      body: JSON.stringify({
        html: html,
        name: `proposal_${Date.now()}.pdf`,
        async: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`PDF.co API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.url) {
      throw new Error('No PDF URL returned from PDF.co');
    }

    return data.url;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
}

function generateProposalHTML(content: any): string {
  const {
    title,
    client_info,
    project_overview,
    scope_of_work,
    timeline,
    pricing,
    terms_and_conditions,
    valid_until,
    notes,
  } = content;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #1A1A1A;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
    }
    h1 {
      color: #FF6B6B;
      font-size: 32px;
      margin-bottom: 10px;
    }
    h2 {
      color: #1A1A1A;
      font-size: 20px;
      margin-top: 30px;
      margin-bottom: 15px;
      border-bottom: 2px solid #FF6B6B;
      padding-bottom: 5px;
    }
    .header {
      border-bottom: 3px solid #FF6B6B;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .client-info {
      background: #FDFCF6;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .scope-item {
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background: #1A1A1A;
      color: white;
      font-weight: bold;
    }
    .total-row {
      font-weight: bold;
      font-size: 18px;
      background: #FDFCF6;
    }
    .terms li {
      margin: 10px 0;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #eee;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${title || 'Proposal'}</h1>
    <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
    ${valid_until ? `<p><strong>Valid Until:</strong> ${new Date(valid_until).toLocaleDateString()}</p>` : ''}
  </div>

  <div class="client-info">
    <h2>Client Information</h2>
    <p><strong>Name:</strong> ${client_info?.name || 'N/A'}</p>
    <p><strong>Email:</strong> ${client_info?.email || 'N/A'}</p>
    ${client_info?.phone ? `<p><strong>Phone:</strong> ${client_info.phone}</p>` : ''}
  </div>

  <h2>Project Overview</h2>
  <p>${project_overview || 'No overview provided'}</p>

  <h2>Scope of Work</h2>
  ${scope_of_work?.map((item: string) => `
    <div class="scope-item">• ${item}</div>
  `).join('') || '<p>No scope defined</p>'}

  <h2>Timeline</h2>
  <p><strong>Estimated Duration:</strong> ${timeline?.estimated_duration || 'TBD'}</p>
  ${timeline?.start_date ? `<p><strong>Start Date:</strong> ${new Date(timeline.start_date).toLocaleDateString()}</p>` : ''}
  ${timeline?.completion_date ? `<p><strong>Completion Date:</strong> ${new Date(timeline.completion_date).toLocaleDateString()}</p>` : ''}

  <h2>Pricing</h2>
  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th>Qty</th>
        <th>Unit</th>
        <th>Unit Price</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      ${pricing?.line_items?.map((item: any) => `
        <tr>
          <td>${item.description}</td>
          <td>${item.quantity}</td>
          <td>${item.unit}</td>
          <td>${pricing.currency} ${item.unit_price.toFixed(2)}</td>
          <td>${pricing.currency} ${item.total.toFixed(2)}</td>
        </tr>
      `).join('') || ''}
      <tr>
        <td colspan="4" style="text-align: right;"><strong>Subtotal:</strong></td>
        <td><strong>${pricing?.currency || 'USD'} ${pricing?.subtotal?.toFixed(2) || '0.00'}</strong></td>
      </tr>
      ${pricing?.tax ? `
        <tr>
          <td colspan="4" style="text-align: right;">Tax:</td>
          <td>${pricing.currency} ${pricing.tax.toFixed(2)}</td>
        </tr>
      ` : ''}
      <tr class="total-row">
        <td colspan="4" style="text-align: right;">TOTAL:</td>
        <td>${pricing?.currency || 'USD'} ${pricing?.total?.toFixed(2) || '0.00'}</td>
      </tr>
    </tbody>
  </table>

  <h2>Terms & Conditions</h2>
  <ul class="terms">
    ${terms_and_conditions?.map((term: string) => `<li>${term}</li>`).join('') || '<li>Standard terms apply</li>'}
  </ul>

  ${notes ? `
    <h2>Additional Notes</h2>
    <p>${notes}</p>
  ` : ''}

  <div class="footer">
    <p>Thank you for considering our proposal. We look forward to working with you!</p>
    <p><em>Generated by Tendr - AI-Powered Proposal Automation</em></p>
  </div>
</body>
</html>
  `;
}
