import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import yourImage from './../../images/metacare.svg';

import integrationsConfig from '../../config/integrations';
import { useTranslation } from 'react-i18next';
import { MdArrowBack } from 'react-icons/md';
import { MdArrowForward } from 'react-icons/md';


function base64UrlEncode(str) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function generateCodeVerifier() {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return base64UrlEncode(array);
}

async function generateCodeChallenge(verifier) {
    if (!window.crypto || !window.crypto.subtle || typeof window.crypto.subtle.digest !== 'function') {
        throw new Error('Crypto API not available or not supported.');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return base64UrlEncode(digest);
}

const generateNonce = () => {
    const array = new Uint32Array(10);
    window.crypto.getRandomValues(array);
    const nonce = array.join('');
    return nonce;
};

function generateOAuthState() {
    const length = 32;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let state = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        state += characters[randomIndex];
    }
    return state;
}

const SignInButton = ({ onClose }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const fhirUrl = localStorage.getItem('fhirUrl');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalSearchContent, setModalSearchContent] = useState("");
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const language = localStorage.getItem('language') || 'en';
    const handleClose = () => {
        setShowSearchModal(false);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleNextProvider = () => {
        setCurrentIndex((prevIndex) => (prevIndex === integrations.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrevProvider = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? integrations.length - 1 : prevIndex - 1));
    };

    const environment = process.env.REACT_APP_ENV || 'Dev';

    const handleProviderClick = async () => {
        const integration = integrationsConfig.environments[environment][integrations[currentIndex].name];
        const accessToken = sessionStorage.getItem(`accessToken${integration.name}`);

        if (!accessToken) {
            const state = generateOAuthState();
            const nonce = generateNonce();
            var authUrl = `${integration.authUrl}?nonce=${nonce}&state=${state}&client_id=${integration.clientId}&redirect_uri=${integration.redirect_uri}&response_type=${integration.response_type ? `${integration.response_type}` : 'code'}${integration.scopes ? `&scope=${integration.scopes}` : ''}`;

            if (integration.auth_method === 'pkce') {
                const codeVerifier = generateCodeVerifier();
                sessionStorage.setItem('codeVerifier', codeVerifier);
                const codeChallenge = await generateCodeChallenge(codeVerifier);
                authUrl = authUrl + `&code_challenge=${codeChallenge}&code_challenge_method=S256&code_verifier=${codeVerifier}`

            }
            if (integration.aud !== undefined) {
                authUrl = authUrl + `&aud=${integration.aud}`
            }
            if (language === 'es') {
                authUrl = authUrl + '&lang=es'

            }
            window.location.href = authUrl;
        } else {
            navigate(`/${integration.name.toLowerCase().replace(/ /g, '-')}-fhir-data`);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const appParam = urlParams.get('app');

        if (appParam) {
            const environmentIntegrations = integrationsConfig.environments[environment]; // Get current environment integrations
            const integrationIndex = Object.keys(environmentIntegrations).findIndex(key =>
                key.toLowerCase() === appParam.toLowerCase()  // Match the `appParam` to the key in the current environment
            );

            if (integrationIndex !== -1) {
                setCurrentIndex(integrationIndex);  // Set the index of the matched integration
            } else {
                console.error(`No integration found for app: ${appParam} in environment: ${environment}`);
            }
        }
    }, [environment, integrationsConfig]);  // Make sure to trigger on environment change or integrationsConfig updates


    const integrations = Object.keys(integrationsConfig.environments[environment]).map(key => ({
        name: key,
        ...integrationsConfig.environments[environment][key]
    }));
    // Get all keys of the integrations object (e.g., ["va", ...])

    console.log(integrations)
    return (
        <div>
            <div><h1><img src={yourImage} alt="Meta Care" /></h1></div>
           
            {showSearchModal && (
                <div className="modal">
                    {modalSearchContent}
                </div>
            )}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <ReactMarkdown>{modalContent}</ReactMarkdown>
                        <button onClick={() => setShowModal(false)}>OK</button>
                    </div>
                </div>
            )}
            <div className='login-form'>
                <h2>{t('findYourMedicalRecord')}</h2>
                <h3>{t('browseHealthcareDataProvider')}</h3>
                <div>
                    <div className='browse'>
                        <button className="prev-button" onClick={handlePrevProvider}><MdArrowBack /></button>
                        <button onClick={handleProviderClick}>
                            <img src={require(`./../../${integrations[currentIndex].logo}`)} alt={integrations[currentIndex].description} />
                        </button>
                        <button className="next-button" onClick={handleNextProvider}><MdArrowForward /></button>
                        <br />
                        <div className='form-group'>
                        </div>
                    </div>
                </div>
                 <div className="copyright">{t('copyright')}</div>
                    {t('useOfMetaCareAgreement')}&nbsp;
                              </div>
                <div className="disclaimer">{t('disclaimer')}</div>
        </div>
    );
};
export default SignInButton;
