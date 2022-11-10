// Variables
export let isInLocalHostMode = true;

// Methods
export const activateLocalBackendMode = () => {
  isInLocalhostMode = true;
}

export const activateExternalBackendMode = () => {
  isInLocalhostMode = false;
}

export const getIsInLocalHostMode = () => {
  return isInLocalHostMode;
}
