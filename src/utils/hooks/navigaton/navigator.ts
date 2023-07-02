import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function stackName() {
  if (navigationRef.isReady()) {
    const nav = navigationRef.getState();
    return nav.routes[nav.index].name;
  }
}

export function stackOptions() {
  if (navigationRef.isReady()) {
    const nav = navigationRef.getState();
    return nav.routes[nav.index].params;
  }
}
