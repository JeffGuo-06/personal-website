export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID) {
    console.error('Missing Mailchimp environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Extract server prefix from API key (e.g., us1, us2, etc.)
  const serverPrefix = MAILCHIMP_API_KEY.split('-')[1];
  const listUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}`;
  const segmentUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/segments`;

  try {
    // Get total list member count
    const listResponse = await fetch(listUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!listResponse.ok) {
      const errorData = await listResponse.json();
      console.error('Mailchimp List API Error:', errorData);
      return res.status(400).json({ 
        error: 'Failed to fetch subscriber count' 
      });
    }

    const listData = await listResponse.json();
    
    // Try to get SHOUT-waitlist specific count
    let shoutWaitlistCount = 0;
    
    try {
      const segmentResponse = await fetch(segmentUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (segmentResponse.ok) {
        const segmentData = await segmentResponse.json();
        
        // Look for SHOUT-waitlist segment/tag
        const shoutSegment = segmentData.segments?.find(segment => 
          segment.name?.toLowerCase().includes('shout') || 
          segment.name?.toLowerCase().includes('waitlist')
        );
        
        if (shoutSegment) {
          shoutWaitlistCount = shoutSegment.member_count || 0;
        }
      }
    } catch (segmentError) {
      console.log('Could not fetch segment data, using total list count');
    }

    // Return the count - use SHOUT-specific count if available, otherwise total subscribed members
    const finalCount = shoutWaitlistCount > 0 ? shoutWaitlistCount : listData.stats.member_count;
    
    return res.status(200).json({ 
      success: true,
      count: finalCount,
      totalMembers: listData.stats.member_count,
      shoutWaitlistMembers: shoutWaitlistCount
    });

  } catch (error) {
    console.error('Mailchimp count fetch error:', error);
    return res.status(500).json({ 
      error: 'Internal server error. Please try again.' 
    });
  }
}