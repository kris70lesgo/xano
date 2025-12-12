import { NextRequest, NextResponse } from 'next/server';
import { openRouterClient } from '@/lib/openrouter';
import { xanoClient } from '@/lib/xano';
import { generatePDF } from '@/lib/pdf';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { rfq_id, pricing_suggestion, user_info } = body;

    if (!rfq_id) {
      return NextResponse.json(
        { success: false, error: 'RFQ ID is required' },
        { status: 400 }
      );
    }

    // Get RFQ details
    const rfqResponse = await xanoClient.getRFQById(rfq_id);
    
    if (!rfqResponse.success || !rfqResponse.data) {
      return NextResponse.json(
        { success: false, error: 'RFQ not found' },
        { status: 404 }
      );
    }

    const rfq = rfqResponse.data;

    if (!rfq.parsed_data) {
      return NextResponse.json(
        { success: false, error: 'RFQ not yet parsed' },
        { status: 400 }
      );
    }

    // Update RFQ status
    await xanoClient.updateRFQStatus(rfq_id, 'generating');

    // Generate proposal using AI
    const proposalContent = await openRouterClient.generateProposal({
      parsed_rfq: rfq.parsed_data,
      pricing_suggestion: pricing_suggestion || {
        recommended_price: 5000,
        price_range: { min: 4000, max: 6000 },
        confidence: 75,
        reasoning: 'Based on project scope',
      },
      user_info: user_info || {
        company_name: 'Your Company',
        contact_info: 'contact@company.com',
      },
    });

    // Create proposal in Xano
    const proposalResponse = await xanoClient.createProposal({
      rfq_id,
      draft_content: proposalContent,
      status: 'draft',
    });

    if (!proposalResponse.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to save proposal' },
        { status: 500 }
      );
    }

    // Update RFQ status to ready
    await xanoClient.updateRFQStatus(rfq_id, 'ready');

    return NextResponse.json({
      success: true,
      data: {
        proposal: proposalResponse.data,
      },
    });
  } catch (error) {
    console.error('Generate proposal error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const proposal_id = searchParams.get('id');

    if (!proposal_id) {
      return NextResponse.json(
        { success: false, error: 'Proposal ID is required' },
        { status: 400 }
      );
    }

    const proposalResponse = await xanoClient.getProposalById(proposal_id);

    if (!proposalResponse.success) {
      return NextResponse.json(
        { success: false, error: 'Proposal not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: proposalResponse.data,
    });
  } catch (error) {
    console.error('Get proposal error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
