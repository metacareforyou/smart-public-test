const integrationsConfig = {
  environments: {
    Dev: {
      "cms": {
        orgName: "Medicare.gov",
        clientId: "v1L0tewf1yqyTQJvPPRDY16IAfQaVpZ76vC1oTOE",
        authUrl: "https://sandbox.bluebutton.cms.gov/v2/o/authorize/",
        tokenUrl: "https://dev.metacare.ai:8447/auth/callback",
        redirect_uri: "https://dev.metacare.ai:8443/auth/callback/cms",
        scopes: "",
        fhirUrl: "https://sandbox.bluebutton.cms.gov/v2/fhir",
        logo: "images/bb-logo.png",
        auth_method: "pkce",
        description: "Get your Medical Records from the Medicare.gov. 100% Private and Anonymous."
      },
      "va": {
        orgName: "Va.gov",
        clientId: "0oat7ngi16hXOFWZw2p7",
        authUrl: "https://sandbox-api.va.gov/oauth2/authorization",
        tokenUrl: "https://sandbox-api.va.gov/oauth2/token",
        redirect_uri: "https://dev.metacare.ai:8443/auth/callback/va",
        scopes: "profile openid launch/patient patient/AllergyIntolerance.read patient/Appointment.read patient/Binary.read patient/Condition.read patient/Device.read patient/DeviceRequest.read patient/DiagnosticReport.read patient/DocumentReference.read patient/Encounter.read patient/Immunization.read patient/Location.read patient/Medication.read patient/MedicationRequest.read patient/MedicationStatement.read patient/Observation.read patient/Organization.read patient/Patient.read patient/Practitioner.read patient/PractitionerRole.read patient/Procedure.read",
        fhirUrl: "https://sandbox-api.va.gov/services/fhir/v0/r4",
        logo: "images/va.png",
        useSyntax: "qryId",
        auth_method: "pkce",
        description: "The Veteran's Administration (VA) API will give you access to your record and enable you, the Veteran, will be able easily ask me patient education questions regarding your conditions..."
      },
      "cig": {
        orgName: "Cigna",
        clientId: "fa96c737-6585-4b57-a651-9ccb6c214e3a",
        authUrl: "https://r-hi2.cigna.com/mga/sps/oauth/oauth20/authorize",        
        tokenUrl: "https://r-hi2.cigna.com/mga/sps/oauth/oauth20/token",
        redirect_uri: "https://dev.metacare.ai:8443/auth/callback/cig",
        scopes: "openid fhirUser patient/*.read",
        fhirUrl: "https://fhir.cigna.com/PatientAccess/v1-devportal",
        logo: "images/cigna.png",
        auth_method: "pkce",
        useSyntax: "qryId",
        description: "The Cigna API will give you access to your record and enable you, the Policy Beneficiary, to easily ask me patient education questions regarding your conditions...",
        fhirResources: [
          "Patient", "CarePlan", "CareTeam", "Condition", "Coverage",
          "DocumentReference",
          "ExplanationOfBenefit", "Goal", "Immunization", "MedicationRequest", "Observation",
          "Procedure"
        ]
      },
      "aet": {
        orgName: "Aetna",
        clientId: "df4784e553ae9b3cc3d2b5a0978f9e3d",
        authUrl: "https://vteapif1.aetna.com/fhirdemo/v1/fhirserver_auth/oauth2/authorize",
        tokenUrl: "https://vteapif1.aetna.com/fhirdemo/v1/fhirserver_auth/oauth2/token",
        redirect_uri: "https://dev.metacare.ai:8443/auth/callback/aet",
        scopes: "launch/patient openid fhirUser patient/*.read",
        fhirUrl: "https://vteapif1.aetna.com/fhirdemo/v2/patientaccess",
        logo: "images/aetna.png",
        auth_method: "pkce",
        useSyntax: "qryId",
        aud: "https://vteapif1.aetna.com/fhirdemo",
        description: "The Aetna API will give you access to your record and enable you, the Policy Beneficiary, to easily ask me patient education questions regarding your conditions...",
        fhirResources: [
          "Patient", "CarePlan", "CareTeam", "Condition", "Coverage",
          "DocumentReference",
          "ExplanationOfBenefit", "Goal", "Immunization", "MedicationRequest", "Observation",
          "Procedure"
        ]
      },
      "hum": {
        orgName: "Humana",
        clientId: "6577b34d-b3cd-4b31-abe8-9c012e6f2994",
        redirect_uri: "https://dev.metacare.ai:8443/auth/callback/hum",
        authUrl: "https://fhir.humana.com/sandbox/auth/authorize",
        tokenUrl: "https://dev.metacare.ai:8447/auth/callback/hum",
        scopes: "fhirUser patient/*.read",
        fhirUrl: "https://fhir.humana.com/sandbox/api",
        logo: "images/humana.png",
        description: "The Humana API will give you access to your record and enable you, the Policy Beneficiary, to easily ask me patient education questions regarding your conditions...",
        fhirResources: [
          "Patient", "CarePlan", "CareTeam", "Condition", "Coverage",
          "DocumentReference",
          "ExplanationOfBenefit", "Goal", "Immunization", "MedicationRequest", "Observation",
          "Procedure"
        ]
      },
      "opt":{
        orgName: "United Healthcare",
        clientId: "7e66928f-dc06-4f18-837d-eb4f9774e1f2",
        redirect_uri: "https://dev.metacare.ai:8443/auth/callback/opt",
        authUrl: "https://sandbox.authz.flex.optum.com/oauth/authorize",
        tokenUrl: "https://dev.metacare.ai:8447/auth/callback/opt",
        scopes: "patient/Condition.read patient/Coverage.read patient/Encounter.read patient/ExplanationOfBenefit.read patient/Immunization.read patient/MedicationDispense.read patient/MedicationRequest.read patient/Observation.read patient/Patient.read patient/Procedure.read",
        fhirUrl: "https://sandbox.fhir.flex.optum.com/R4",
        logo: "images/united.png",
        description: "The United Healthcare API will give you access to your record and enable you, the Policy Beneficiary, to easily ask me patient education questions regarding your conditions...",
        fhirResources: [
          "Patient", "CarePlan", "CareTeam", "Condition", "Coverage",
          "ExplanationOfBenefit", "Goal", "Immunization", "MedicationRequest", "Observation",
          "Procedure"
        ]
      },
      "sen":{
        orgName: "Sentara",
        clientId: "7e66928f-dc06-4f18-837d-eb4f9774e1f2",
        redirect_uri: "https://dev.metacare.ai:8443/auth/callback/sen",
        authUrl: "        https://auth.interop.sentara.com/ohpp-auth/realms/OHPP/protocol/openid-connect/auth",
        tokenUrl: "https://dev.metacare.ai:8447/auth/callback/sen",
        scopes: "patient/Condition.read patient/Coverage.read patient/Encounter.read patient/ExplanationOfBenefit.read patient/Immunization.read patient/MedicationDispense.read patient/MedicationRequest.read patient/Observation.read patient/Patient.read patient/Procedure.read",
        fhirUrl: "https://sandbox.fhir.flex.optum.com/R4",
        logo: "images/sentara.svg",
        description: "The Sentara Healthcare API will give you access to your record and enable you, the Policy Beneficiary, to easily ask me patient education questions regarding your conditions...",
        fhirResources: [
          "Patient", "CarePlan", "CareTeam", "Condition", "Coverage",
          "ExplanationOfBenefit", "Goal", "Immunization", "MedicationRequest", "Observation",
          "Procedure"
        ]
      },
      "ant":{
        orgName: "Anthem",
        clientId: "17d12f89-83d8-40fe-af1f-ef3cccbe2b09",
        redirect_uri: "https://dev.metacare.ai:8443/auth/callback/ant",
        authUrl: "https://sbx.totalview.healthos.elevancehealth.com/oauth2.code/registered/api/v1/authorize",
        tokenUrl: "https://sbx.totalview.healthos.elevancehealth.com/client.oauth2/registered/api/v1/token",
        scopes: "patient/Condition.read patient/Coverage.read patient/Encounter.read patient/ExplanationOfBenefit.read patient/Immunization.read patient/MedicationDispense.read patient/MedicationRequest.read patient/Observation.read patient/Patient.read patient/Procedure.read",
        fhirUrl: "https://sbx.totalview.healthos.elevancehealth.com/resources/registered/Sandbox/api/v1/fhir",
        logo: "images/anthem.png",
        description: "The Anthem Healthcare API will give you access to your record and enable you, the Policy Beneficiary, to easily ask me patient education questions regarding your conditions...",
        fhirResources: [
          "Patient", "CarePlan", "CareTeam", "Condition", "Coverage",
          "ExplanationOfBenefit", "Goal", "Immunization", "MedicationRequest", "Observation",
          "Procedure"
        ]
      },
      "bcbsnc": {
        orgName: "Blue Cross and Blue Shield of North Carolina",
        clientId: "02cedf090738fd324b70d3d3701f174b",
        authUrl: "https://oauth.bcbsnc.com/fhirmember/sps/oauth/oauth20/authorize",
        tokenUrl: "https://oauth.bcbsnc.com/fhirmember/sps/oauth/oauth20/token",
        redirect_uri: "https://metacare.ai/auth/callback/bcbsnc",
        scopes: "launch/patient openid fhirUser patient/*.read",
        fhirUrl: "https://apiservices-ext.bcbsnc.com/fhir/prod/R4/patientaccess",
        logo: "images/bcbsnc.png",
        auth_method: "pkce",
        useSyntax: "qryId",
        aud: "https://apiservices-ext.bcbsnc.com/fhir/prod/R4/patientaccess",
        description: "The Blue Cross and Blue Shield API will give you access to your record and enable you, the Policy Beneficiary, to easily ask me patient education questions regarding your conditions...",
        fhirResources: [
          "Patient", "CarePlan", "CareTeam", "Condition", "Coverage",
          "DocumentReference",
          "ExplanationOfBenefit", "Goal", "Immunization", "MedicationRequest", "Observation",
          "Procedure"
        ]
      },
    }
  }
};

export default integrationsConfig;
