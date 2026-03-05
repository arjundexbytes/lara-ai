export function permissionSetFromProps(props) {
  const fromAuth = props?.auth?.permissions;
  const fromUser = props?.auth?.user?.permissions;
  const items = Array.isArray(fromAuth) ? fromAuth : Array.isArray(fromUser) ? fromUser : [];

  return new Set(items.map((item) => (typeof item === 'string' ? item : item?.name)).filter(Boolean));
}

export function can(props, permission) {
  const set = permissionSetFromProps(props);

  if (!set.size) {
    return true;
  }

  return set.has(permission);
}
