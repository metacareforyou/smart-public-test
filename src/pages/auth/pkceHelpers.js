// Helper to generate a random string (code_verifier)
const generateRandomString = (length) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let random = '';
    const values = new Uint32Array(length);
    window.crypto.getRandomValues(values);
    for (let i = 0; i < values.length; i++) {
      random += charset[values[i] % charset.length];
    }
    return random;
  };
  
  // Helper to Base64URL-encode the string
  const base64URLEncode = (str) => {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };
  
  // Helper to generate the SHA-256 hash of the code_verifier (to create the code_challenge)
  const sha256 = async (verifier) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return base64URLEncode(hashBuffer);
  };
  
  // Generate the code_challenge based on the code_verifier
  const generateCodeChallenge = async (verifier) => {
    return await sha256(verifier);
  };
  
  export const authorizeWithGoogle = async (clientId, redirectUri, scopes) => {
    console.log(clientId, redirectUri, scopes)
    const codeVerifier = generateRandomString(128); // Generate a code_verifier
    const codeChallenge = await generateCodeChallenge(codeVerifier); // Generate the code_challenge
  
    // Store the code_verifier in session storage for later use in the token exchange
    sessionStorage.setItem('code_verifier', codeVerifier);
  
    // Construct the authorization URL with PKCE parameters
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}` +
      `&response_type=code` + // Ensure no leading/trailing spaces
      `&redirect_uri=${encodeURIComponent(redirectUri)}` + // Use encodeURIComponent
      `&scope=${encodeURIComponent(scopes)}` + // Use encodeURIComponent
      `&code_challenge=${codeChallenge}` +
      `&code_challenge_method=S256`;
  console.log(authUrl)
    // Redirect the user to Google's authorization page
    window.location.href = authUrl;
  };
  
  
  export const authorizeWithHotmail = async (clientId, redirectUri, scopes) => {
    const codeVerifier = generateRandomString(128); // Generate a code_verifier
    const codeChallenge = await generateCodeChallenge(codeVerifier); // Generate the code_challenge
  
    // Store the code_verifier in session storage for later use in the token exchange
    sessionStorage.setItem('code_verifier', codeVerifier);
  
    // Construct the Microsoft authorization URL with PKCE parameters
    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&
      response_type=code&
      redirect_uri=${redirectUri}&
      scope=${encodeURIComponent(scopes)}&
      code_challenge=${codeChallenge}&
      code_challenge_method=S256`;
  
    // Redirect the user to Microsoft's authorization page
    window.location.href = authUrl;
  };
  
  export const getHotmailAccessToken = async (authCode, clientId, redirectUri) => {
    const codeVerifier = sessionStorage.getItem('code_verifier'); // Retrieve code_verifier from session storage
    const tokenUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/token';
  
    // Prepare the POST data for the token exchange
    const data = {
      code: authCode,
      client_id: clientId,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      code_verifier: codeVerifier,
    };
  
    // Convert the data to URL-encoded format
    const formBody = Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  
    // Make the request to Microsoft's token endpoint
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    });
  
    // Parse and return the token response
    const result = await response.json();
    if (!response.ok) {
      throw new Error(`Token exchange failed: ${result.error_description || result.error}`);
    }
  
    return result; // This will contain access_token, refresh_token, etc.
  };
  
  // Exchange the authorization code for an access token
  export const getGoogleAccessToken = async (authCode, clientId, redirectUri, clientSecret) => {
    const codeVerifier = sessionStorage.getItem('code_verifier'); // Retrieve code_verifier from session storage
    const tokenUrl = 'https://oauth2.googleapis.com/token';
  
    // Prepare the POST data for the token exchange
    const data = {
      code: authCode,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      code_verifier: codeVerifier,
    };
  
    // Convert the data to URL-encoded format
    const formBody = Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  
    // Make the request to Google's token endpoint
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    });
  
    // Parse and return the token response
    const result = await response.json();
    if (!response.ok) {
      throw new Error(`Token exchange failed: ${result.error_description || result.error}`);
    }
  
    return result; // This will contain access_token, refresh_token, etc.
  };
  