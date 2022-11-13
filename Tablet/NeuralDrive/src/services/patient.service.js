// Constants
export const MIN_CHARACTERS_COUNT = 5;
export const MAX_CHARACTERS_COUNT = 20;

export const IdInvalidationReasons = {
  NOTHING: "The patient ID is valid.",
  TOO_LONG: `The patient ID must comprise a maximum of ${MAX_CHARACTERS_COUNT} characters.`,
  TOO_SHORT: `The patient ID must comprise a minimum of ${MIN_CHARACTERS_COUNT} characters.`,
  ILLEGAL_CHARACTER: "The patient ID should only contain letters or numbers. Special characters are not accepted.",
  INTERNAL_ERROR: "An internal error occured and the patient ID is unrecognizable by the application. It would be adviseable to restart the application.",
}

// Variables
export let patientId = "";

// Methods
export function hasPatientId() {
  return patientId.length > 0;
}

export function getPatientId() {
  return patientId;
}

export function setPatientId(id) {
  patientId = id;
}

export function validatePatientId(id) {
  if (typeof id !== 'string')
    return { isValid: false, reason: IdInvalidationReasons.INTERNAL_ERROR }

  if (id.length < MIN_CHARACTERS_COUNT)
    return { isValid: false, reason: IdInvalidationReasons.TOO_SHORT }

  if (id.length > MAX_CHARACTERS_COUNT)
    return { isValid: false, reason: IdInvalidationReasons.TOO_LONG }

  if (!/^[A-Za-z0-9]*$/.test(id))
    return { isValid: false, reason: IdInvalidationReasons.ILLEGAL_CHARACTER }

  return { isValid: true, reason: IdInvalidationReasons.NOTHING };
}