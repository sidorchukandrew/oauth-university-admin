export function hasPermission(user, permission) {
    return user?.role?.permissions?.includes(permission);
}

export function roleHasPermission(role, permission) {
    let rolePermission = role?.permissions?.find(
        rolePermission => rolePermission.name === permission);

    return Boolean(rolePermission);
}

export function getCorrespondingId(permissions, permissionName) {
    let permission = permissions?.find(permission => permission.name === permissionName);

    if (permission) {
        return permission.id;
    } else {
        return -1;
    }
}

export const PERMISSIONS = {
    GUIDES_LIST: "guides.list",
    GUIDES_UPDATE: "guides.update",
    GUIDES_DELETE: "guides.delete",
    GUIDES_CREATE: "guides.create",
    SERIES_LIST: "series.list",
    SERIES_CREATE: "series.create",
    SERIES_UPDATE: "series.update",
    SERIES_DELETE: "series.delete",
    ROLES_CREATE: "roles.create",
    ROLES_UPDATE: "roles.update",
    ROLES_DELETE: "roles.delete",
    ROLES_LIST: "roles.list",
    ANALYTICS_LIST: "analytics.list"
}