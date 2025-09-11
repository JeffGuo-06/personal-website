export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID) {
    console.error('Missing Mailchimp environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Extract server prefix from API key (e.g., us1, us2, etc.)
  const serverPrefix = MAILCHIMP_API_KEY.split('-')[1];
  const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        tags: ['SHOUT-waitlist']
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Success - user subscribed
      return res.status(200).json({ 
        success: true, 
        message: 'Successfully subscribed to waitlist!',
        member_id: data.id
      });
    } else if (data.title === 'Member Exists') {
      // User already subscribed
      return res.status(200).json({ 
        success: true, 
        message: 'You are already on the waitlist!',
        already_subscribed: true
      });
    } else {
      // Other Mailchimp error
      console.error('Mailchimp API Error:', data);
      return res.status(400).json({ 
        error: data.detail || 'Failed to subscribe to waitlist' 
      });
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ 
      error: 'Internal server error. Please try again.' 
    });
  }
}