import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import integrationsConfig from '../../config/integrations';
import yourImage from './../../images/metacare.svg'; // replace with your image file path
import { FaBars } from 'react-icons/fa';


const AuthCallback = ({ setIsVerified }) => {
    const navigate = useNavigate();
    const { t } = useTranslation(); // Use the t function for internationalization
    const environment = process.env.REACT_APP_ENV || 'Dev';
    const { app, setApp } = useParams();
    const [error, setError] = useState(null);
    const fhirUrl = localStorage.getItem('fhirUrl');
    const [showModal, setShowModal] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalSearchContent, setModalSearchContent] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
      setIsDropdownOpen(prevState => !prevState);      
    };
    const exchangeCodeForToken = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const errorParam = urlParams.get('error');
        const errorDescription = urlParams.get('error_description');
        const bError = false
        if (errorParam) {
            // If there is an error in the query params, display the error message
            console.error(errorParam, errorDescription);
            setError({ errorParam, errorDescription });
            bError = true;
        }

        if (!code) {
            console.error('Authorization code not found.');
            setError({ errorParam: 'missing_code', errorDescription: 'Authorization code not found.' });
            bError = true;
        }
        console.log(app);
        if (app===undefined || app===null || app==='') {setApp('va');}
        const integration = integrationsConfig.environments[environment][app];
        if (!integration) {
            console.error('Integration not found for app:', app);
            setError({ errorParam: 'missing_integration', errorDescription: `Integration not found for ${app}` });
            bError = true;
        }

        if (!bError) {

        const codeVerifier = sessionStorage.getItem('codeVerifier');
        const tokenUrl = integration.tokenUrl;
        const clientId = integration.clientId;
        const redirectUri = integration.redirect_uri;

        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            client_id: clientId,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
            app: app
        }).toString();

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        };

        if (tokenUrl.includes(process.env.REACT_APP_BACKEND_HOST)) {
            headers['Authorization'] = 'Basic YWRtaW4tZ3B0LTQ6dmJjNDV2YmxraigqKCkqZA==';
        }

        try {
            const response = await fetch(tokenUrl, {
                method: 'POST',
                headers: headers,
                body: body,
            });
            const data = await response.json();            
            const access_token = data.access_token;
            console.log(access_token);
            if (access_token) {
                sessionStorage.setItem(`accessToken${app}`, access_token);
                sessionStorage.setItem(`patientId${app}`, data.patient); // Adjust if needed
                setIsVerified(true);
                console.log(app)
                if (app==='cms'){navigate(`/cms-fhir-data-fetch`);}
                if (app==='va'){navigate(`/va-fhir-data-fetch`);}
                if (app!=='va' && app!=='cms'){navigate(`/${app.toLowerCase().replace(/ /g, '-')}-fhir-data`)};
            } else {
                setError({ errorParam: 'token_error', errorDescription: 'Failed to obtain access token.' });
                setIsVerified(false);
            }
        } catch (error) {
            console.error('Error fetching token:', error);
            setError({ errorParam: 'fetch_error', errorDescription: 'Error fetching token.' });
            setIsVerified(false);
        }
    }
    };

    useEffect(() => {
        exchangeCodeForToken();
    }, [setIsVerified, navigate]);

    // If there's an error, display an error message
    if (error) {
        return (
            <div>
            <h1><img src={yourImage} alt="Meta Care"/></h1>
           

                <h2>{t('errorTitle')}</h2>
                <p>{t('errorMessage', { error: error.errorParam, description: error.errorDescription })}</p>
                <button
                    className="button-link"
                    onClick={() => navigate(`/bb-login?app=${app}`)}
                >
                    {t('goToLogin')}
                </button>
            </div>
        );
    }

    return <div>{t('authenticating')}</div>;
};

export default AuthCallback;
