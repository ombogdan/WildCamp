export const getFocusedRouteName = (route: any): string | undefined => {
  if (!route || !route.state) return route.name;

  const nestedRoute = route.state.routes[route.state.index];
  return getFocusedRouteName(nestedRoute);
};
